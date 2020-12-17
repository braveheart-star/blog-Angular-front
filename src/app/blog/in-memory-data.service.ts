import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb(): object {
    const blogs = [
      { id: '1', title: 'Mr. Nice', description: 'good' },
      { id: '2', title: 'Narco', description: 'good' },
      { id: '3', title: 'Bombasto', description: 'good' },
      { id: '4', title: 'Celeritas', description: 'good' },
      { id: '5', title: 'Magneta', description: 'good' },
      { id: '6', title: 'RubberMan', description: 'good' },
      { id: '7', title: 'Dynama', description: 'good' },
      { id: '8', title: 'Dr IQ', description: 'good' },
      { id: '9', title: 'Magma', description: 'good' },
      { id: '10', title: 'Tornado', description: 'good' },
    ];
    return { blogs };
  }
}
