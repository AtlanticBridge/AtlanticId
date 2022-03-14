import { AfterViewInit, Injectable, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  private sideNav: MatSidenav | any
  private dashboardSource = new BehaviorSubject<boolean>(false)
  isDashboard = this.dashboardSource.asObservable()

  constructor() { }

  /**
   * setSideNav - Set the sidenav component.
   * 
   * @param sideNav 
   */
   public setSideNav(sidenav: MatSidenav): void {
    this.sideNav = sidenav;
  }

  /**
   * toggle - Sets the sidenav toggle (On/Off)
   */
  public toggle(): void {
    this.sideNav.toggle()
  }

  /**
   * closeSidenav
   */
  public closeSidenav() {
    this.sideNav.toggle(false);
  }

  /**
   * openSidenav
   */
  public openSidenav() {
    this.sideNav.toggle(true);
  }

  /**
   * setIsDashboard
      @param
        dashboard: boolean   */
  public setIsDashboard(dashboard: boolean) {
    this.dashboardSource.next(dashboard);
  }
}
