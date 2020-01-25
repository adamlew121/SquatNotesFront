import {Injectable} from '@angular/core';
import {Training} from '../models/training';
import {User} from '../models/user';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private title = 'Squat Notes';

  fakeUser: User;

  fakeTrainingList: Training[];

  private selectedTraining: Training;

  constructor(private router: Router) {
    this.fakeUser = {
      id: 1,
      name: 'faker',
      email: 'fake@fake.fake',
      surname: 'faker',
      login: 'faker',
      password: 'fake123',
      dateOfBirthday: new Date(),
      sex: 'male'
    };
    this.fakeTrainingList = [
      {
        id: 1,
        user: 1,
        name: 'Fake day',
        date: new Date(),
        difficulty: 6,
        superSetList: [
          {
            id: 1,
            sets: [
              {
                id: 1,
                exercise:
                  {
                    id: 1,
                    name: 'Bench press',
                    targetMuscles: [],
                    author: this.fakeUser
                  },
                weight: 50,
                reps: 10,
                RPE: 8
              },
              {
                id: 2,
                exercise:
                  {
                    id: 2,
                    name: 'Deadlift',
                    targetMuscles: [],
                    author: this.fakeUser
                  },
                weight: 150,
                reps: 12,
                RPE: 8.5
              }
            ],
          },
          {
            id: 1,
            sets: [
              {
                id: 1,
                exercise:
                  {
                    id: 1,
                    name: 'Bench press',
                    targetMuscles: [],
                    author: this.fakeUser
                  },
                weight: 90,
                reps: 8,
                RPE: 8
              }
            ],
          }
        ]
      }
    ];
  }

  getTitle(): string {
    return this.title;
  }

  selectTraining(selectedTraining: Training): void {
    this.selectedTraining = selectedTraining;
    this.router.navigate(['/training-detail']);
  }

  getSelectedTraining(): Training {
    return this.selectedTraining;
  }
}
