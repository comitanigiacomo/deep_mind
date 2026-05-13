export const blogPosts = {
  'homelab-debian': {
    id: 'homelab-debian',
    category: 'homelab',
    title: 'How I self-host everything on a single Debian box',
    date: 'May 2026',
    readingTime: '2 min',
    content: `
      <p>Studying Computer Science at a master's level means dealing with a lot of theory on distributed systems and networks. But eventually, I wanted to move past the theory and actually have complete control over my own data and services. So, I decided to build my homelab by transforming my PC into my server.</p>
      
      <h3>The Setup and the "Clean" Philosophy</h3>
      <p>Instead of a complex hypervisor setup or a cluster of Raspberry Pis, I went with a completely minimal approach: <strong>a single Debian machine where absolutely everything is containerized</strong>.</p>
      
      <p>I had one strict rule for this project: I have a clean PC and I really don't want to get it dirty with a mess of broken dependencies, leftover packages, or conflicting environments. Because of this, no services run directly on the host OS. I use <strong>Docker</strong> and <strong>Docker Compose</strong> to manage my entire stack. The traffic routing is handled beautifully by <em>Nginx Proxy Manager</em>, which also automatically provisions and renews my SSL certificates.</p>

      <h3>My Stack</h3>
      <p>If you check out my <a href="https://github.com/comitanigiacomo/homelab" target="_blank">homelab repository</a>, you'll see the exact <code>docker-compose</code> files I use. Here are the core services that keep things running:</p>
      <ul>
        <li><strong>Vaultwarden:</strong> A lightweight Bitwarden server written in Rust. Managing my own passwords natively gives me total peace of mind.</li>
        <li><strong>Pi-hole:</strong> Network-wide ad blocking. It intercepts DNS requests and drops the ones reaching out to ad networks. It's also incredibly interesting to see exactly what your devices are trying to ping in the background.</li>
        <li><strong>Portainer:</strong> A nice GUI to manage my Docker containers for those days when I just don't feel like typing out CLI commands.</li>
        <li><strong>Nextcloud:</strong> My personal, self-hosted alternative to Google Drive. Perfect for keeping all my university notes and personal files synced.</li>
      </ul>

      <h3>The best part: Disaster Recovery</h3>
      <p>The real beauty of this containerized approach? If my server hardware dies tomorrow, I don't panic. I just grab a fresh Debian box, install Docker, <code>git clone</code> my repo, spin up the containers, and I'm back online in minutes. It's simple, minimal, and most importantly, it just works.</p>
    `
  },
  'sliding-window': {
    id: 'sliding-window',
    category: 'leetcode',
    title: 'Sliding Window: the pattern that unlocked 40+ problems for me',
    date: 'May 2026',
    readingTime: '2 min',
    content: `
      <p>If you take a look at my <a href="https://github.com/comitanigiacomo/leetcode" target="_blank">LeetCode repository</a>, you'll see I've solved quite a few problems lately. Balancing Master's classes, exams, and interview prep is no joke, but consistency pays off. However, for the longest time, "subarray" and "substring" problems were my absolute kryptonite. My brain always defaulted to brute force with nested loops, inevitably getting hit with that dreaded <em>Time Limit Exceeded (TLE)</em> on O(N²) solutions.</p>

      <p>Then, the Sliding Window pattern finally clicked for me, and honestly, it felt like unlocking a cheat code.</p>

      <h3>The Mental Model</h3>
      <p>Here is the core idea: instead of recalculating everything from scratch for every possible subarray, you just maintain a "window" of elements. Picture a literal physical frame placed over an array. As you move the window one step to the right, you only do two things: you <em>add</em> the effect of the new element entering the frame, and you <em>remove</em> the effect of the element that just fell out of it.</p>

      <p>No second loop needed. You just update your current state.</p>

      <h3>Seeing it in Action</h3>
      <p>Take a look at problem <em>2379: Minimum Recolors to Get K Consecutive Black Blocks</em>. This is a classic <strong>fixed window</strong>. You know exactly how wide the window needs to be (K). You just maintain that window of size K, count the 'W's, and slide it across the string. You update the count in O(1) time at each step. Boom, your O(N²) nightmare turns into a clean, fast O(N) solution.</p>

      <p>Another great example is <em>1052: Grumpy Bookstore Owner</em>. Here, I used a fixed sliding window to find the maximum number of satisfied customers you can recover when the owner uses his secret "not grumpy" technique for a specific number of minutes. You calculate the base satisfied customers, then slide a window of the "grumpy" minutes to find the best time to use the technique. (You can check out my exact code for these in the repo!).</p>

      <h3>Why it matters</h3>
      <p>As a CS student, you study a lot of complex algorithms, but recognizing patterns is the real key to surviving LeetCode. Once you stop trying to memorize specific solutions and start recognizing the core invariants (like "I need a contiguous sequence that satisfies condition X"), these problems become formulaic and actually fun to solve.</p>

      <p>Next time you see the word "subarray", don't immediately write that second <code>for</code> loop. Think of the window.</p>
    `
  },
  'typst-vs-latex': {
    id: 'typst-vs-latex',
    category: 'tools',
    title: 'Why I switched from LaTeX to Typst for my university notes',
    date: 'May 2026',
    readingTime: '3 min',
    content: `
      <p>If there is one universal truth in a Computer Science master's degree, it's that eventually, you have to write long, complex academic reports. For my latest project on <em>Double Descent Analysis</em>, the default, unquestioned choice was obviously LaTeX. But honestly, I have a bone to pick with the current academic standard.</p>

      <p>I genuinely don't understand why people insist on torturing themselves with LaTeX's convoluted syntax. We are engineers and computer scientists, yet we accept dealing with unreadable backslash soup just to center a table. You can get the exact same professional, publication-ready result with <strong>Typst</strong>, but with a syntax that actually belongs in the 21st century.</p>

      <p>To prove this to myself, I didn't just switch blindly. I did a direct A/B test. I wrote and submitted my project report in <a href="https://github.com/comitanigiacomo/double-descent-analysis" target="_blank">both LaTeX and Typst formats</a> just to compare the two workflows side-by-side. You can check the repository to see the source code for both.</p>

      <h3>The Elephant in the Room: Academic Inertia</h3>
      <p>Before getting into the technical pros and cons, let's address the real problem: fear. I am convinced that the only reason LaTeX is still the absolute standard is academic inertia. No one wants to be the first to change, professors expect ".tex" files, and students are terrified of breaking formatting guidelines. But once you step out of that bubble, you realize how much time you are wasting fighting the tool instead of writing the content.</p>

      <h3>The Good: Why Typst wins</h3>
      <ul>
        <li><strong>Instant Compile Times:</strong> Typst is written in Rust, and it shows. It compiles virtually instantly. LaTeX can take several seconds, especially with heavy documents. When you are desperately tweaking a plot's position or fixing a typo, that instant visual feedback is a massive game-changer.</li>
        <li><strong>Sane, Readable Syntax:</strong> Typst feels like Markdown on steroids. No more <code>\\begin{itemize}</code> and <code>\\end{itemize}</code> just to make a simple bulleted list. The code is clean, lightweight, and you can actually read the raw file without getting a headache.</li>
        <li><strong>Native, Modern Scripting:</strong> Trying to write loops, conditionals, or custom macros in LaTeX requires learning a bizarre, decades-old macro language. Typst, on the other hand, has a real, modern scripting language built right into it. If you know any standard programming language, you already know how to script in Typst.</li>
      </ul>

      <h3>The Bad: The Ecosystem</h3>
      <p>I want to be objective, so I have to mention the downside: the ecosystem is still young. LaTeX has a package for literally everything—from drawing complex electrical circuits to typesetting ancient Greek poetry. Typst is catching up incredibly fast, but occasionally you will hit a wall and find a niche formatting requirement that you just have to build yourself.</p>

      <h3>The Verdict</h3>
      <p>For me, the speed, the zero-friction syntax, and the modern architecture of Typst easily outweigh the temporary lack of obscure packages. I get the exact same PDF quality, but I finish writing in half the time. I've migrated all my university notes and reports to it, and I'm honestly not looking back.</p>
    `
  },
  'double-descent': {
    id: 'double-descent',
    category: 'cs',
    title: 'Double Descent: when more data makes your model worse (then better)',
    date: 'May 2026',
    readingTime: '3 min',
    content: `
      <p>During my <em>Statistical Methods for Machine Learning</em> course at Università degli Studi di Milano, I spent some time analyzing a phenomenon that challenges the standard bias-variance tradeoff: the <strong>Double Descent</strong> curve.</p>

      <p>I documented the entire empirical analysis, including the plots and the custom implementation of the estimators, in my <a href="https://github.com/comitanigiacomo/double-descent-analysis" target="_blank">Double Descent Analysis repository</a>. Here is a breakdown of what the project actually demonstrates and why this concept is highly relevant today.</p>

      <h3>The Limits of the Classical View</h3>
      <p>In standard Machine Learning theory, we are taught that increasing model complexity eventually leads to overfitting. The training error drops as the model learns, but the test error eventually goes up, forming a well-known U-shaped curve.</p>

      <p>However, this classical view struggles to explain modern Deep Learning. Today's neural networks are heavily overparameterized—they have billions of parameters, which is vastly more than the number of data points they are trained on. According to the classical U-shape, these models should overfit severely. Yet, they generalize quite well. The Double Descent phenomenon explains exactly why this happens.</p>

      <h3>The Experiment and The Three Regimes</h3>
      <p>To study this, I avoided high-level frameworks and implemented Ordinary Least Squares (OLS), Ridge regression, and Minimum Norm Interpolators from scratch using standard linear algebra. By fitting models with an increasing number of parameters (let's call it <em>d</em>) on a dataset of <em>N</em> samples, you can observe the test error moving through three distinct regimes.</p>

      <h4>1. The Under-parameterized Regime (d < N)</h4>
      <p>This is the classical statistics domain. When we have fewer parameters than data points, the model behaves exactly as expected. As we increase <em>d</em>, the model's capacity grows, the test error drops to a minimum, and then starts to slowly rise as it begins to overfit the training noise. It perfectly describes the first half of the Double Descent curve.</p>

      <h4>2. The Interpolation Threshold (d = N)</h4>
      <p>Things get problematic when the number of parameters exactly matches the number of data points. At this threshold, the model has exactly enough capacity to pass through every single training point perfectly, achieving zero training error.</p>

      <p>From a linear algebra perspective, the covariance matrix becomes extremely ill-conditioned. To force the mathematical function to hit every noisy data point exactly, the model's weights explode to massive values. As a direct consequence, the test error spikes to its absolute maximum. If you check the test error plots in my repository, you will notice a very sharp, massive peak exactly at this interpolation threshold.</p>

      <h4>3. The Over-parameterized Regime (d > N)</h4>
      <p>This is where the standard theory is expanded. Once we cross the threshold and have strictly more parameters than data points, the test error does not stay high. Instead, it starts dropping again—the second descent.</p>
      
      <p>Often, it reaches a value even lower than the minimum found in the under-parameterized regime. This explains why massive, overparameterized models can perform so well.</p>

      <h3>The Role of the Minimum Norm Interpolator</h3>
      <p>Why does the error drop when we add more parameters? When <em>d > N</em>, the system of equations is underdetermined. We no longer have a single unique solution that fits the training data perfectly; we have an infinite number of them.</p>

      <p>When computing the solution (in my case, using the Moore-Penrose pseudo-inverse), we are implicitly selecting the <strong>Minimum Norm Interpolator</strong>. Out of all the infinite ways to fit the training data with zero error, this specific interpolator chooses the solution with the smallest possible weights.</p>

      <p>By keeping the weights small, the resulting function becomes "smoother". It doesn't overreact to the noise in the training data. This inherent smoothness acts as a form of implicit regularization. The model doesn't need an explicit penalty to generalize well; the sheer size of the parameter space allows it to find a simpler, smoother exact fit.</p>

      <h3>Explicit Regularization: Ridge Regression</h3>
      <p>As a final step in the project, I also analyzed the effect of Ridge regression. Ridge adds an explicit penalty for large weights. What is interesting to observe in the resulting plots is that adding even a small amount of Ridge regularization completely flattens the massive error spike at the interpolation threshold. It smoothly bridges the under-parameterized and over-parameterized regimes.</p>

      <p>Understanding Double Descent bridges the gap between classical statistical learning and modern deep learning. It shows that over-parameterization is not necessarily a problem to be fixed, but a characteristic that, under the right conditions, actively helps models generalize.</p>
    `
  },
  'kanso-sync': {
    id: 'kanso-sync',
    category: 'dev',
    title: 'Building an offline-first sync engine in Go',
    date: 'May 2026',
    readingTime: '4 min',
    content: `
      <p>I recently started building <strong>Kanso</strong>, a personal habit tracker. I needed something that worked flawlessly offline, without constant loading spinners every time my connection dropped. But honestly, building Kanso was more than just scratching my own itch; it was the perfect excuse to force myself into a strict, professional software engineering workflow.</p>

      <p>You can find the complete backend implementation in my <a href="https://github.com/comitanigiacomo/kanso-sync-engine" target="_blank">Kanso Sync Engine repository</a>, written entirely in Go (1.22+).</p>

      <h3>The Real Goal: Workflow over Syntax</h3>
      <p>As computer science students, we often develop terrible habits with version control for our solo projects. We push directly to the main branch, write meaningless commit messages, and ignore code reviews. With Kanso, my primary objective was to work impeccably with Git. I wanted to treat this solo repository exactly as if I were collaborating in a rigorous corporate environment.</p>

      <p>This meant enforcing strict branching strategies, writing atomic commits, and requiring proper Pull Requests before merging any feature. However, doing this takes time. To make this workflow sustainable, I changed my approach to writing code: I heavily leveraged AI.</p>

      <p>Instead of manually typing out every standard CRUD operation or spending hours reading documentation to set up the initial project structure, I used AI as a pair-programmer. I used it to quickly grasp architectural patterns and generate the necessary boilerplate. This shifted my daily focus away from tedious typing and allowed me to concentrate entirely on system design, code reviews, and maintaining a pristine Git history.</p>

      <h3>Structuring the Backend: Hexagonal Architecture</h3>
      <p>Thanks to the time saved, I was able to properly design the backend using <strong>Hexagonal Architecture</strong> (also known as Ports and Adapters). The core idea is simple but powerful: the business logic sits at the center of the application and has absolutely no knowledge of the outside world.</p>

      <p>The domain logic doesn't know if the API is using the Gin framework, or if the data is being stored in PostgreSQL. It only interacts with interfaces (Ports). The actual implementations (Adapters) are injected from the outside. This strict separation of concerns made the entire sync engine incredibly modular and, most importantly, highly testable without needing to spin up an actual database for unit tests.</p>

      <h3>The Sync Mechanism: Handling Unreliable Networks</h3>
      <p>Building an offline-first application means the client is the source of truth for the user's immediate actions, but the server remains the ultimate source of truth for the entire state. Synchronizing these two reliably is complex. I implemented two core patterns to handle this.</p>

      <h4>1. Delta-Sync and Soft Deletes</h4>
      <p>When a user opens the app, fetching the entire database is incredibly inefficient and slow. Instead, Kanso uses a Delta-Sync approach. The client keeps track of a timestamp cursor (the exact time of its last successful sync). When it reconnects, it sends this timestamp to the Go server.</p>

      <p>The server then queries PostgreSQL and returns only the records that have been modified <em>since</em> that specific timestamp. But what happens if a user deletes a habit offline? If the server actually drops the row from the database, it cannot inform the client about the deletion during the next delta-sync (because the record is gone). To solve this, the engine relies entirely on "soft deletes". A deleted habit simply gets a <code>deleted_at</code> timestamp. The server sends this updated record to the client, and the client knows to remove it from the local UI.</p>

      <h4>2. Conflict Resolution via Optimistic Locking</h4>
      <p>The biggest challenge in distributed systems is conflict resolution. Imagine checking off a habit on your phone while on an airplane (offline). Meanwhile, your laptop at home is also offline, and you edit the name of that same habit. When both devices reconnect, how does the server decide which state is correct?</p>

      <p>I handled this using Optimistic Locking through versioning. Every record in the database has a version number. When the phone eventually syncs, it sends its local version of the record. The server compares the phone's version with its own. If they match, the server applies the update and increments the version. If the laptop later tries to sync its changes using the old version number, the server detects the mismatch and immediately rejects the request with an HTTP <code>409 Conflict</code> status.</p>

      <p>The laptop client is then forced to fetch the latest state from the server, reconcile the differences locally, and attempt the sync again. This guarantees that data is never silently overwritten.</p>

      <h3>The Midnight Bug: Timezones and Aggregations</h3>
      <p>If you have ever built an application that tracks daily streaks, you know that handling time is a nightmare. A habit completed at 1:00 AM in Tokyo is happening on a completely different calendar day than a habit completed at 1:00 AM in Rome.</p>

      <p>The strict rule for the backend is to store absolutely everything in UTC. However, calculating a user's current streak requires knowing their local midnight. I solved this by requiring the client to explicitly send its current IANA Timezone (e.g., <code>Europe/Rome</code>) in the HTTP headers of every request. When the Go backend processes the data, it dynamically calculates the local day boundaries based on that specific header before performing any statistical aggregation.</p>

      <h3>Leveraging Go's Concurrency</h3>
      <p>Finally, Go proved to be the perfect tool for this job. Calculating complex habit statistics or rebuilding streaks for an entire year can be computationally heavy. Go's concurrency model allowed me to offload these heavy calculations to background workers via Goroutines. By implementing standard Go WaitGroups, I ensured that these background tasks could finish their work safely, allowing the server to shut down gracefully without data corruption.</p>

      <p>Building this engine was a massive learning experience. It proved that adopting rigorous engineering practices—like atomic PRs and clean architecture—pays off exponentially when the complexity of the system starts to grow.</p>
    `
  },
  'nyt-stream': {
    id: 'nyt-stream',
    category: 'cs',
    title: 'Processing 13M records in O(1) space: my dive into Data Streaming algorithms',
    date: 'Mar 2026',
    readingTime: '2 min',
    content: `
      <p>During a recent university project, I was tasked with analyzing over 13 million New York Times comments to count unique active users and filter discussions by topic. The catch? I couldn't just load the dataset into RAM. Standard batch-processing tools like pandas would immediately trigger a memory error. This was the perfect opportunity to implement data streaming algorithms from scratch.</p>

      <h3>Simulating the Stream</h3>
      <p>Before touching the math, I needed a way to simulate a continuous data stream. Instead of reading the massive CSV in chunks and filling up the memory, I used Python's <code>yield</code> keyword to create a lazy generator. This allowed me to process the file row by row, keeping the memory footprint completely independent of the dataset size.</p>

      <h3>Flajolet-Martin & The Bitwise Hack</h3>
      <p>To estimate the number of unique users in O(1) space, I implemented the Flajolet-Martin algorithm. The core idea relies on hashing user IDs and finding the maximum number of trailing zeros in their binary representation. I used the MurmurHash3 library because it allows passing different seeds, easily generating the hundreds of independent hash functions required to avoid variance.</p>

      <p>Initially, I converted the hashes to binary strings and linearly scanned them to count the zeros. It was painfully slow, taking almost 50 minutes to process the dataset. Then, I implemented a bitwise trick: performing a bitwise AND between a hash and its two's complement (<code>h & -h</code>) instantly isolates the lowest set bit. This single change brought the execution time down to just a few minutes. By upgrading the logic to the LogLog approach and applying the standard 0.77351 correction factor, I achieved an estimation error of just 5%.</p>

      <h3>Bloom Filters for Topic Filtering</h3>
      <p>The second part of the project involved isolating comments made exclusively on "Science" articles. A standard search tree or hash table wouldn't scale well in a massive real-world scenario, so I built a Bloom Filter.</p>

      <p>I extracted a trusted list of 354 science article IDs. Following the mathematical theory, I allocated 10 bits per element (an array of 3540 bits) and used 7 independent hash functions to achieve the optimal setup. The math predicted a False Positive Rate of 0.8%. However, after running the entire stream of millions of comments through the filter, the actual empirical FPR was an impressive 0.3%.</p>

      <p>This project was a great reminder that understanding the theoretical time and space complexity is just the first step. Optimizing low-level operations, like bitwise arithmetic, is what actually makes these algorithms viable in a realistic environment.</p>
    `
  },
  'firmware-crypto-analysis': {
    id: 'firmware-crypto-analysis',
    category: 'security',
    title: 'Why algorithmic security isn\'t enough: Reverse engineering a mobile firmware',
    date: 'November 2025',
    readingTime: '10 min',
    content: `
      <p>For my Bachelor's thesis in Computer Science at Università degli Studi di Milano, I decided to look into a topic that connects high-level cryptography and low-level embedded systems: how cryptographic functions are actually implemented inside mobile firmware.</p>
      
      <p>We use smartphones every day to handle banking, private chats, and sensitive data. But the firmware running the underlying modem and hardware is often a complete black box closed source, undocumented, and rarely checked by anyone on the outside. I wanted to answer a basic question: are device manufacturers implementing crypto securely, or are they taking shortcuts for performance and legacy compatibility?</p>

      <p>To find out, I didn't just read documentation. I acquired a raw binary firmware dump and started a static analysis process that led me to look into weird CPU architectures, old cryptography, and a long process of elimination to figure out exactly which outdated open-source library was used.</p>

      <h3>1. The First Contact: Triaging the Binary</h3>
      <p>My target was a raw binary file. Before using advanced decompilers, standard Linux tools are your best friends. Running the <code>file</code> command immediately showed that I was dealing with an <code>ELF 32-bit LSB executable</code>. It was Little Endian, and crucially, the output stated: <code>not stripped</code>. This was super lucky. It meant the firmware still retained its debug symbols, including function and variable names, which makes reverse engineering much easier.</p>
      
      <p>Next, I ran the <code>strings</code> command, piping it through <code>grep</code> to look for firmware names. I quickly found this string: <code>HUAQIN_ROMP3_K6833V1_64_MDBIN_PCB01_MT6833_S00.MOLY_NR15_R3_MP_V4_3_P61.bin</code>. Breaking this down, <strong>MT6833</strong> identifies the chipset as a MediaTek processor (often marketed as Dimensity 700), and <strong>MOLY</strong> is MediaTek's standard label for their baseband modems. Now I knew exactly what I was looking at: the brain of a 5G mobile modem.</p>

      <h3>2. The nanoMIPS Problem</h3>
      <p>With this information, I loaded the binary into Ghidra, the open-source reverse engineering framework. Based on the 32-bit architecture and MediaTek's history, I initially set the Language ID to standard MIPS.</p>
      
      <p>I was wrong. The decompilation didn't work at all. The code flow was a mess, and Ghidra flagged numerous invalid instructions. The binary wasn't standard MIPS. After looking into MediaTek's modem architectures, I discovered that they use the MIPS 17200 core, which implements the <strong>nanoMIPS</strong> Instruction Set Architecture (ISA).</p>

      <p>nanoMIPS is an interesting architecture. Unlike standard MIPS, which uses fixed 32-bit instructions, nanoMIPS uses instructions of different lengths (16, 32, or 48 bits). This makes the code very compact, which is perfect for embedded systems with low memory like baseband modems. The problem? Ghidra didn't support nanoMIPS out of the box.</p>

      <p>I had to find a workaround. Luckily, I found an experimental custom extension made by the NCC Group during their own baseband research. After compiling and adding this module to Ghidra, the assembly finally turned into readable C pseudocode. The real work could begin.</p>

      <h3>3. Mapping the Cryptographic Primitives</h3>
      <p>With readable code, I began mapping out the cryptographic functions using string searches and cross-references (XREF). I identified the main algorithms: Diffie-Hellman, DES, SHA-1, RSA, and AES. On paper, the math looked correct and aligned with FIPS standards. However, looking closer at how they were implemented showed some worrying choices.</p>

      <h4>Diffie-Hellman: The 1024-bit Legacy</h4>
      <p>While analyzing the Diffie-Hellman key exchange, I found functions loading hardcoded parameters. I checked the memory addresses and found setups for 2048/224 and 2048/256 bits, which are secure. But I also found a <code>DH_get_1024_160</code> function. Using 1024-bit primes for key exchange today is a big risk, falling well below the NIST minimum security strength recommendations.</p>

      <h4>DES: The Electronic Codebook Issue</h4>
      <p>Next was the Data Encryption Standard (DES). I confirmed the 64-bit key (with 56 effective bits) and the standard 16 rounds. But the real issue was the mode of operation. The firmware called <code>DES_ecb_encrypt</code>. </p>
      <p>ECB (Electronic Codebook) is one of the weakest modes because it doesn't use an Initialization Vector (IV). In ECB, identical plaintext blocks always produce identical ciphertext blocks. If you encrypt an image with ECB, you can still visually see the shape of the original image in the encrypted version. Finding ECB in a modern device is concerning, even if it's just kept for legacy compatibility.</p>

      <h4>AES: Trading Security for Speed</h4>
      <p>The Advanced Encryption Standard (AES) implementation initially looked fine. It supported 128, 192, and 256-bit keys, executing the correct number of rounds (10, 12, and 14). However, looking at the memory accesses during the encryption round, I didn't see the standard 256-byte S-BOX.</p>
      
      <p>Instead, I found four large 1024-byte arrays. These are called <strong>T-tables</strong>. In embedded systems, calculating the <em>ShiftRows</em> and <em>MixColumns</em> steps of AES on the fly takes a lot of CPU power. To speed things up, developers calculate these steps in advance and put them into four large lookup tables. While this makes AES really fast, it introduces a serious hardware vulnerability, which I will discuss later.</p>

      <h3>4. Identifying OpenSSL</h3>
      <p>Throughout my analysis, I kept seeing function names, <code>BIGNUM</code> structures, and constants that looked exactly like OpenSSL. As Bruce Schneier said, cryptographic algorithms themselves rarely fail; it's the implementations that break. If I could figure out the exact version of OpenSSL used in this binary, I could check it against public CVE databases and find known vulnerabilities.</p>

      <p>OpenSSL basically has three main eras: the very old 0.9.x, the 1.x.x series, and the new 3.x series. I used a step-by-step process of elimination:</p>

      <ul>
        <li><strong>Ruling out OpenSSL 3.0:</strong> Version 3.0 changed the architecture a lot, adding "Providers" and deprecating "Engines". A quick search in Ghidra showed dozens of references to <code>ENGINE_load_private_key</code> and zero references to <code>OSSL_PROVIDER</code>. So, it was definitely older than 3.0.</li>
        <li><strong>Ruling out OpenSSL 1.1.x:</strong> Starting from version 1.1.0, OpenSSL added automatic initialization. You didn't need to manually call setup functions anymore. But the firmware explicitly called <code>SSL_library_init</code> and <code>OPENSSL_add_all_algorithms</code>. This proved the code belonged to the older 1.0.x family.</li>
        <li><strong>1.0.1 vs 1.0.2:</strong> To tell these apart, I looked for DTLS 1.2 support, which was only added in 1.0.2. I found <code>DTLSv1_2_client_method</code> in the binary, which strongly suggested it was version 1.0.2. But I wanted absolute proof.</li>
      </ul>

      <h4>The Final Proof</h4>
      <p>The definitive proof came from understanding a big change in how the code was written in OpenSSL 1.1.0: they hid the internal data structures. In older versions, structures like <code>RSA</code> were public. You could access the modulus <code>n</code> directly using a pointer, like <code>rsa->n</code>. In 1.1.0, these structures were made "opaque." Trying to access memory directly would cause a compilation error; developers had to use getter functions like <code>RSA_get0_key()</code>.</p>

      <p>I looked at the <code>RSA_size()</code> API function in the decompiled firmware. In the source code of OpenSSL 1.0.2, <code>RSA_size</code> is just a C macro that directly accesses the <code>n</code> member. In OpenSSL 1.1.1, it's a full function that calls the getter.</p>

      <p>Looking at Ghidra's pseudocode, it was pretty clear. The firmware performed a direct memory offset access to retrieve the BIGNUM size: <code>BN_num_bits(*(BIGNUM **) rsa->[offset])</code>. There was no call to <code>RSA_get0_key()</code>. The compilation would literally fail if this was 1.1.x.</p>
      
      <p>The conclusion was certain: <strong>the 5G modem was running OpenSSL 1.0.2.</strong></p>

      <h3>5. CVEs and Side-Channel Attacks</h3>
      <p>This discovery is really bad for the device's security. Official support for the OpenSSL 1.0.2 series ended on December 31, 2019. This means the crypto engine of this mobile modem is outdated and hasn't received a security patch in years.</p>

      <p>By checking this version against the NIST National Vulnerability Database, I found that the firmware is open to several known attacks:</p>
      <ul>
        <li><strong>CVE-2016-2183 (SWEET32):</strong> Targets 64-bit block ciphers like the DES implementation I found, allowing attackers to recover plaintext from long encrypted sessions.</li>
        <li><strong>CVE-2016-0800 (DROWN):</strong> A cross-protocol attack that can decrypt TLS sessions by exploiting old SSLv2 implementations.</li>
        <li><strong>CVE-2019-1559:</strong> A Padding Oracle attack that allows an attacker to decrypt data without knowing the private key by measuring server response errors.</li>
      </ul>

      <h4>AES Cache-Timing Attacks</h4>
      <p>But the most interesting vulnerability ties directly back to my earlier discovery of the AES <strong>T-tables</strong>.</p>
      
      <p>Because T-tables are large (4KB in total), they don't fit entirely inside the CPU's fastest L1 cache. During AES encryption, the algorithm accesses different parts of these tables depending on the bits of the secret key and the plaintext. If a required table entry is already in the CPU cache (a cache hit), it's fast. If it has to fetch it from main memory (a cache miss), it takes longer.</p>

      <p>In 2005, cryptographer Daniel J. Bernstein demonstrated the <strong>AES Cache-Timing Attack</strong>. By simply sending network packets to the device and measuring the microseconds it takes to reply, an attacker can figure out if cache hits or misses happened. Using statistics on these timing differences, the attacker can basically reconstruct the entire 128-bit or 256-bit AES secret key.</p>
      
      <p>Because this firmware uses an outdated OpenSSL version compiled with T-table optimizations, it is vulnerable to this side-channel attack.</p>

      <h3>Conclusion</h3>
      <p>This thesis project was a great learning experience about real-world embedded security. It proved that theoretical algorithmic security means nothing if the software lifecycle is ignored. You can use AES-256 and RSA-2048, but if you wrap them in an old, unsupported library just to save a few kilobytes of memory or to avoid rewriting legacy code, the device is already compromised.</p>

      <p>For a computer science student and developer, reverse engineering isn't just a cool trick; it's the best lesson in how not to build systems.</p>
    `
  },
};
