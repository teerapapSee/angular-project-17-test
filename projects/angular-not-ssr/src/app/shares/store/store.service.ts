import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription, distinctUntilChanged, map, shareReplay, switchMap } from 'rxjs';

export interface AppState {
  token:string,
  system_exp:Date | null
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {


  private state = new BehaviorSubject<AppState>({
    token:"",
    system_exp:null
  })

  tokenSelector$ = this.createSelector<string>(state=>state.token)
  private tokenAction = new Subject<any>()

  systemExpSelector$ = this.createSelector<Date | null>(state=>state.system_exp)
  private systemExpAction = new Subject<any>()
  constructor() {
    this.createReducerList()
  }

  stateActionFn(actionName:string,value:any){
    if(actionName=='tokenAction'){
      this.tokenAction.next(value)
    }else if(actionName=='systemExpAction'){
      this.systemExpAction.next(value)
    }
  }

  private createReducerList(){
    this.createReducer(this.tokenAction,(state,someValue)=>{
      state.token = someValue
      return state
    })
    this.createReducer(this.systemExpAction,(state,someValue)=>{
      state.system_exp = someValue
      return state
    })
  }

  private createSelector<T>(selector:(state:AppState)=>T) : Observable<T>{
    return this.state.pipe(
      map(selector),
      distinctUntilChanged(),
      shareReplay(1)
    )
  }

  private createReducer<T>(
    action$: Observable<T>,
    accumulator:(state:AppState,action: T) => AppState
  ){
    action$.subscribe((action)=>{
      const state = {...this.state.value}
      const newState = accumulator(state,action)
      this.state.next(newState)
    })
  }

  private createEffect<T>(effect$: Observable<T>) : Subscription{
    return effect$.subscribe()
  }
}
