import { CanActivateFn,CanActivateChildFn, Router } from '@angular/router';
import { StoreService } from '../store/store.service';
import { inject } from '@angular/core';
import { Observable, concatMap, map, mergeMap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(StoreService);
  if(state.url.indexOf('/auth') >= 0){
    if(state.url.indexOf('/auth/login') >= 0){
      return store.tokenSelector$.pipe(
        mergeMap((token => {
          // console.log("guard1 token:",state.url, token)
          return store.systemExpSelector$.pipe(
            map(systemExp => {
              // console.log("guard1  token && systemExp:",state.url, token,systemExp)
              if(token && systemExp){
                // console.log("guard1  new Date(systemExp) > new Date():",state.url, new Date(systemExp) , new Date(),new Date(systemExp) > new Date())
                if(new Date(systemExp) > new Date()){
                  router.navigate([''])
                  return false
                }else{
                  return true
                }
              }else{
                return true
              }
            })
          )
        }))
      );
    }else{
      return true
    }
  }else{
    return store.tokenSelector$.pipe(
      mergeMap((token => {
        // console.log("guard2 token:",state.url, token)
        return store.systemExpSelector$.pipe(
          map(systemExp => {
            // console.log("guard2  token && systemExp:",state.url, token,systemExp)
            if(token && systemExp){
              // console.log("guard2  new Date(systemExp) > new Date():",state.url, new Date(systemExp) , new Date(),new Date(systemExp) > new Date())
              if(new Date(systemExp) > new Date()){
                return true
              }else{
                router.navigate(['auth/login'])
                return false
              }
            }else{
              router.navigate(['auth/login'])
              return false
            }
          })
        )
      }))
    );
  }
};
