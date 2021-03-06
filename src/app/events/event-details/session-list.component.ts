import { VoterService } from './voter.service';
import { AuthService } from './../../user/auth.service';
import { ISession } from './../shared/index';
import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit {

  @Input() sessions: ISession[];
  @Input() filterBy: string;
  @Input() sortBy: string;
  @Input() eventId: number;
  visibleSessions: ISession[] = []; // to avoid modifying the original list of sessions sent in, we modify this one, so we can always get the original back when filter 'All' is selected

  constructor(public auth : AuthService, private voterService: VoterService) { }

  ngOnInit(): void {
  }

  // react everything our filterBy input property changes, as that is coming from the parent into here
  ngOnChanges() {
    // this might be called before sessions have been passed in, so confirm there are sessions
    if (this.sessions) {
      this.filterSessions(this.filterBy);
      this.sortBy === 'name' ? this.visibleSessions.sort(this.sortByNameAsc) : this.visibleSessions.sort(this.sortVotesDesc); // sort takes a comparision function
    }
  }

  filterSessions(filter) {
    if (filter === 'all') {
     // this.visibleSessions = this.sessions;  --> we want a unqiue list so don't do this, do below
      this.visibleSessions = this.sessions.slice(0);  // this will make a duplicate of the entire array
    } else {
      this.visibleSessions = this.sessions.filter(s => {
        return s.level.toLocaleLowerCase() === filter;
      });
    }
  }

  toggleVote(session: ISession) {
    if (this.userHasVoted(session)) {
      this.voterService.deleteVoter(this.eventId, session, this.auth.currentUser.userName);
    }
    else {
      this.voterService.addVoter(this.eventId, session, this.auth.currentUser.userName);
    }

    // if it was sorted by votes redo sort as we just add/deleted votes
    if (this.sortBy === 'votes') {
      this.visibleSessions.sort(this.sortVotesDesc);
    }
  }

  userHasVoted(session : ISession) {
    return this.voterService.userHasVoted(session, this.auth.currentUser.userName);
  }

  sortByNameAsc(s1: ISession, s2: ISession) {
    if (s1.name > s2.name) {
      return 1;
    } else if (s1.name === s2.name) {
      return 0;
    } else {
      return -1;
    }
  }

  sortVotesDesc(s1: ISession, s2: ISession) {
    return s2.voters.length - s1.voters.length;
  }

}
