# scripts/fetch_repo_stats.py
import json
import requests
import time
from urllib.parse import parse_qs, urlparse

PROJECTS = [
    {
        "title": "QuickLaunch",
        "owner": "comitanigiacomo",
        "repo": "quicklaunch",
        "image": "/quicklaunch.png",
    },
    {
        "title": "Universal",
        "owner": "comitanigiacomo",
        "repo": "Universal",
        "image": "/universal.png",
    },
    {
        "title": "Leetcode",
        "owner": "comitanigiacomo",
        "repo": "leetcode",
        "image": "/leetcode.png",
    },
    {
        "title": "CyberSecurity",
        "owner": "comitanigiacomo",
        "repo": "cyberSecurity",
        "image": "/cybersecurity.png",
    },
    {
        "title": "Reti_di_calcolatori",
        "owner": "comitanigiacomo",
        "repo": "Reti_di_calcolatori",
        "image": "/reti.png",
    }
]

HEADERS = {"Accept": "application/vnd.github.v3+json"}

def get_commit_count(owner, repo):
    try:
        url = f"https://api.github.com/repos/{owner}/{repo}/commits?per_page=1"
        response = requests.get(url, headers=HEADERS)
        
        if response.status_code == 403:
            print("Rate limit reached! Waiting 60 seconds...")
            time.sleep(60)
            return get_commit_count(owner, repo)
            
        response.raise_for_status()
        
        link_header = response.headers.get("Link", "")
        if "rel=\"last\"" in link_header:
            last_page = [link for link in link_header.split(", ") if "rel=\"last\"" in link][0]
            query = urlparse(last_page.split(";")[0].strip("<>")).query
            return int(parse_qs(query).get("page", [1])[0])
        return len(response.json())
    except Exception as e:
        print(f"Commit count error for {owner}/{repo}: {str(e)}")
        return 0

def fetch_repo_data(project):
    owner = project["owner"]
    repo = project["repo"]
    
    try:
        # Base repo data
        repo_url = f"https://api.github.com/repos/{owner}/{repo}"
        repo_response = requests.get(repo_url, headers=HEADERS)
        
        if repo_response.status_code == 403:
            print("Rate limit reached! Waiting 60 seconds...")
            time.sleep(60)
            return fetch_repo_data(project)
            
        repo_response.raise_for_status()
        repo_data = repo_response.json()

        # Languages data
        langs_response = requests.get(repo_data["languages_url"], headers=HEADERS)
        if langs_response.status_code == 403:
            print("Rate limit reached! Waiting 60 seconds...")
            time.sleep(60)
            langs_response = requests.get(repo_data["languages_url"], headers=HEADERS)
            
        langs_data = langs_response.json() if langs_response.status_code == 200 else {}

        # Calculate languages percentages
        total_bytes = sum(langs_data.values()) or 1
        languages = [
            {"name": lang, "percent": round((bytes / total_bytes) * 100, 1)}
            for lang, bytes in langs_data.items()
        ]

        return {
            "title": project["title"],
            "image": project["image"],
            "description": repo_data.get("description", "N/A"),
            "stars": repo_data.get("stargazers_count", 0),
            "forks": repo_data.get("forks_count", 0),
            "commits": get_commit_count(owner, repo),
            "languages": languages,
            "updated_at": repo_data.get("updated_at", ""),
            "license": repo_data.get("license", {}).get("name", "No license"),
            "topics": repo_data.get("topics", []),
            "size": round(repo_data.get("size", 0) / 1024, 2)  # Convert to MB
        }

    except requests.exceptions.RequestException as e:
        print(f"API Error for {owner}/{repo}: {str(e)}")
        return {
            "title": project["title"],
            "image": project["image"],
            "description": "N/A",
            "stars": 0,
            "forks": 0,
            "commits": 0,
            "languages": [],
            "updated_at": "",
            "license": "No license",
            "topics": [],
            "size": 0
        }

def main():
    all_stats = {}
    
    for idx, project in enumerate(PROJECTS):
        print(f"Processing {idx+1}/{len(PROJECTS)}: {project['owner']}/{project['repo']}")
        
        stats = fetch_repo_data(project)
        key = f"{project['owner']}/{project['repo']}"
        all_stats[key] = stats
        
        time.sleep(1.5)  # Reduced sleep time
    
    with open("../../public/repo_stats.json", "w") as f:
        json.dump(all_stats, f, indent=2, default=str)
    
    print(f"✅ Successfully saved data for {len(all_stats)} repositories")

if __name__ == "__main__":
    main()
