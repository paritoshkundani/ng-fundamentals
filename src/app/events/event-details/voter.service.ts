import { ISession } from './../shared/event.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoterService {

  constructor() { }

  deleteVoter(session: ISession, voterName: string) {
    // filter out the one we want to remove
    session.voters = session.voters.filter(voter => voter !== voterName);
  }

  addVoter(session: ISession, voterName: string) {
    session.voters.push(voterName);
  }

  userHasVoted(session: ISession, voterName: string) {
    return session.voters.some(voter => voter === voterName);
  }
}
