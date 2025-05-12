
import React from 'react';
import { Timeline } from 'primereact/timeline';
import { Card } from 'primereact/card';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './Experience.css';

const ExperiencePage = () => {
  const experiences = [
    {
      date: '15/10/2020 10:30',
      title: 'Ordered',
      company: 'ABC Corp',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Inventore sed consequuntur error repudiandae numquam.',
      image: 'https://via.placeholder.com/150',
      icon: 'pi pi-shopping-cart',
    },
    {
      date: '15/10/2020 14:00',
      title: 'Processing',
      company: 'XYZ Ltd',
      description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
      image: 'https://via.placeholder.com/150',
      icon: 'pi pi-cog',
    },
    {
      date: '16/10/2020 09:00',
      title: 'Shipped',
      company: 'FastShip',
      description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.',
      image: 'https://via.placeholder.com/150',
      icon: 'pi pi-truck',
    },
  ];

  return (
    <div className="p-m-4">
      <h1>Experience</h1>
      <Timeline
        value={experiences}
        align="alternate"
        className="customized-timeline"
        marker={(item) => (
          <i className={`${item.icon} timeline-icon`}></i>
        )}
        content={(item) => (
          <Card title={item.title} className="timeline-card">
            <div className="timeline-card-content">
              <img src={item.image} alt={item.title} />
              <h5>{item.company}</h5>
              <p>{item.description}</p>
              <small>{item.date}</small>
            </div>
          </Card>
        )}
      />
    </div>
  );
};

export default ExperiencePage;

