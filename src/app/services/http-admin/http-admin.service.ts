import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import * as uuid from 'uuid/v4';
import 'rxjs/add/observable/throw';
import { map } from 'rxjs/operators';
import { ApiReponseModel } from '../../models/api-reponse-model';
import { CheckoutInstanceModel } from '../../models/checkout-instance-model';
import { ItemCheckoutModel } from '../../models/item-checkout-model';
import { PreRegistrationModel } from '../../models/pre-registration-model';
import { RegistrationModel } from '../../models/registration-model';
import { CheckInModel } from '../../models/check-in-model'
import { LocationModel } from '../../models/location-model';
import { ClassesModel } from '../../models/classes-model';
import { ICountModel } from '../../models/count-model';
import { StatisticsModel } from '../../models/statistics-model';
import { AttendanceModel } from '../../models/attendance-model';
import { IResponseModel } from '../../models/response-model';
import { ApiRoute } from '../../models/ApiRoute';
import { CustomErrorHandlerService } from '../custom-error-handler/custom-error-handler.service';
import { BaseHttpService } from '../base-http/base-http.service';
import { AuthService } from '../AuthService/auth.service';
import { EventModel } from '../../models/event-model';
import * as _ from 'lodash';

@Injectable()
export class HttpAdminService extends BaseHttpService {

  constructor(http: HttpClient, authService: AuthService, errorHandler: CustomErrorHandlerService) {
    super(http, authService, errorHandler);
  }

  /**
   * Gets the admin and privilege status of the current user denoted by the idtoken (found in local memory)
   * 
   * @returns IResponseModel containing admin, privilege properties
   */
  getAdminStatus(): Observable<IResponseModel<{admin: boolean, privilege: number}>> {
    const apiRoute = new ApiRoute('admin/', true);
    return super.genericGet<IResponseModel<{admin: boolean, privilege: number}>>(apiRoute);
  }

  /**
   * Gets the current list of hackers who have preregistered for the hackathon
   * 
   * @param limit Maximun integer number of PreRegistraion entries to fetch
   * @return Array of hackers who preregistered in PreRegistraitonModel format 
   */
  getPreRegistrations(limit?: number): Observable<PreRegistrationModel[]> {
    const apiRoute = new ApiRoute(
      'admin/preregistered',
      true,
      limit ? new Map<string, any>().set('limit', limit).set('byHackathon', true) : null,
    );
    return super.genericGet<PreRegistrationModel[]>(apiRoute);
  }

  /**
   * Gets the current list of hackers who have registered for the hackathon
   * 
   * @param limit Maximun integer number of Registration entries to fetch
   * @return Array of hackers who registered in RegistrationModel format 
   */
  getRegistrations(limit?: number): Observable<RegistrationModel[]> {
    const apiRoute = new ApiRoute(
      'admin/register',
      true,
      limit ? new Map<string, any>().set('limit', limit) : null,
    );
    return super.genericGet<RegistrationModel[]>(apiRoute);
  }

  /**
   * Gets the current list of available events for the hackathon
   * 
   * @param limit Maximun integer number of Event entries to fetch
   * @returns Array of events for the hackathon in the EventModel format
   */
  getEvents(limit?: number): Observable<EventModel[]> {
    const apiRoute = new ApiRoute(
      'live/events',
      true,
      limit ? new Map<string, any>().set('limit', limit) : null,
    );
    return super.genericGet<{}[]>(apiRoute)
      .pipe(
        map(events => events.map(event => EventModel.parseJSON(event))),
      )
  }

  /**
   * Adds a new event to the list of available events for the hackathon
   * 
   * @param event New EvenModel format event to add
   * @returns Response containing success message
   */
  addEvent(event: EventModel): Observable<{}> {
    const apiRoute = new ApiRoute(
    'live/event',
    true,
    );
    return super.genericPut<{}>(apiRoute, event.restRepr());
  }

  /**
   * Updates a current event in the list of available events for the hackathon
   * 
   * @param event Current EvenModel format event to update
   * @returns Response containing success message
   */
  updateEvent(event: EventModel): Observable<{}> {
    const apiRoute = new ApiRoute(
    'live/event',
    true,
    );
    return super.genericPut<{}>(apiRoute, { event: event.restRepr() });
  }

  /**
   * Gets the firebase unique identifier (UID) for the user associated with the email
   * 
   * @param email Firebase user email address
   * @returns 
   */
  getUserUID(email: string) {
    const apiRoute = new ApiRoute(
      'admin/userid',
      true,
      new Map().set('email', email),
    );
    return super.genericGet<{ uid, displayName }>(apiRoute);
  }

  /**
   * Elevates the privilege of a user denoted by the unique identifier (UID)
   * 
   * @param uid Firebase unique identifier
   * @param privilege Integer number corresponding to firebase privilege level
   */
  elevateUser(uid: string, privilege: string) {
    const apiRoute = new ApiRoute(
      'admin/makeadmin',
      true,
    );
    return super.genericPost<{}>(apiRoute, { uid, privilege });
  }

  /**
   * Sends an email containing a custom subject and body
   * 
   * @param emailBody 
   * @param emailSubject 
   * @param emailObjects 
   */
  sendEmail(emailBody: string, emailSubject: string, emailObjects: any[]): Observable<any> {
    const chunkedEmails = _.chunk(emailObjects, 100);
    const apiRoute = new ApiRoute(
      'admin/email',
      true,
    );
    // CHECK THAT REPLACEMENTS ARE VALID
    const replacements = emailBody.match(/\$\w+\$/g);
    try {
      replacements.forEach((replacement) => {
        emailObjects.forEach((object) => {
          const key = replacement.replace(/\$/g, '');
          if (!object.substitutions
              || object.substitutions[key] === null
              || typeof object.substitutions[key] === 'undefined') {
            throw new Error('Replacements are invalid: ' + key);
          }
        });
      });
    } catch (error) {
      return Observable.throwError(error);
    }
    return forkJoin(...chunkedEmails.map(batchedEmails => super.genericPost<{}>(
      apiRoute,
      { subject: emailSubject, html: emailBody, emails: batchedEmails },
    )));
  }

  /**
   * Gets the current list of hackers who have RSVP'd for the hackathon
   * 
   * @param limit Maximun integer number of RSVP entries to fetch
   * @return Array of hackers who RSVP'd in RegistrationModel format 
   */
  getRSVP(limit?: number): Observable<RegistrationModel[]> {
    const apiRoute = new ApiRoute(
      'admin/rsvp_list',
      true,
      limit ? new Map<string, any>().set('limit', limit) : null,
    );
    return super.genericGet<RegistrationModel[]>(apiRoute);
  }

  /**
   * Gets the current list of available events for the hackathon
   * 
   * @param limit Maximun integer number of Event entries to fetch
   * @returns Array of events for the hackathon in the EventModel format
   */
  getLocations(limit?: number): Observable<LocationModel[]> {
    const apiRoute = new ApiRoute(
      'admin/location_list',
      true,
      limit ? new Map<string, any>().set('limit', limit) : null,
    );
    return super.genericGet<LocationModel[]>(apiRoute);
  }

  addNewLocation(locationName: string) {
    const apiRoute = new ApiRoute(
      'admin/create_location',
      true,
    );
    return super.genericPost<{}>(apiRoute, { locationName });
  }

  removeLocation(uid: string) {
    const apiRoute = new ApiRoute(
      'admin/remove_location',
      true,
    );
    return super.genericPost<{}>(apiRoute, { uid });
  }

  updateLocation(uid: string, location_name: string) {
    const apiRoute = new ApiRoute(
      'admin/location/update',
      true,
    );
    return super.genericPost<{}>(apiRoute, { uid, location_name });
  }

  getExtraCreditClasses(limit?: number): Observable<ClassesModel[]> {
    const apiRoute = new ApiRoute(
      'admin/extra_credit_list',
      true,
      limit ? new Map<string, any>().set('limit', limit) : null,
    );
    return super.genericGet<ClassesModel[]>(apiRoute);
  }

  addUserToExtraClass(uid: string, cid: string) {
    const apiRoute = new ApiRoute(
      'admin/assign_extra_credit',
      true,
    );
    return super.genericPost<{}>(apiRoute, { uid, cid });
  }

  setUserCheckedIn(uid: string) {
    const rfid = `NO_BAND_${uuid()}`;
    const time: number = new Date().getTime();

    const apiRoute = new ApiRoute(
      'admin/assignment',
      true,

    );
    return super.genericPost<{}>(apiRoute, { assignments: [{ uid, rfid, time }] });
  }

  getAllUsers(limit?: number): Observable<CheckInModel[]> {
    const apiRoute = new ApiRoute(
      'admin/data/?type=registration_stats',
      true,
      limit ? new Map<string, any>().set('limit', limit) : null,
    );
    return super.genericGet<CheckInModel[]>(apiRoute)
  }

  getPreRegCount(limit?: number): Observable<ICountModel[]> {
    const apiRoute = new ApiRoute(
      'admin/prereg_count',
      true,
      limit ? new Map<string, any>().set('limit', limit) : null,
    );
    return super.genericGet<ICountModel[]>(apiRoute);
  }

  getRegCount(limit?: number): Observable<ICountModel[]> {
    const apiRoute = new ApiRoute(
      'admin/reg_count',
      true,
      limit ? new Map<string, any>().set('limit', limit) : null,
    );
    return super.genericGet<ICountModel[]>(apiRoute);
  }

  getAllUserCount(): Observable<ICountModel> {
    const apiRoute = new ApiRoute(
      'admin/data/?type=stats_count',
      true,
      new Map<string, any>().set('byHackathon', true),
    );
    return super.genericGet<ApiReponseModel<ICountModel>>(apiRoute)
      .pipe(
        map(response => response.body.data[0]),
      );
  }

  getStatistics(limit?: number): Observable<StatisticsModel[]> {
    const apiRoute = new ApiRoute(
      'admin/data/?type=registration_stats',
      true,
      limit ? new Map<string, any>().set('limit', limit) : null,
    );
    return super.genericGet<StatisticsModel[]>(apiRoute);
  }

  getAvailableCheckoutItems(): Observable<ItemCheckoutModel[]> {
    const apiRoute = new ApiRoute(
      'admin/checkout/items/availability',
      true,
      null,
    );
    return super.genericGet<{}[]>(apiRoute)
      .pipe(
        map(jsonArray => jsonArray.map(json => ItemCheckoutModel.parseFromJson(json))),
      );
  }

  addCheckoutRequest(itemId: string, userId: string) {
    const apiRoute = new ApiRoute(
      'admin/checkout',
      true,
    );
    return super.genericPost<{}>(apiRoute, { itemId, userId });
  }

  getCurrentCheckedOutItems(): Observable<CheckoutInstanceModel[]> {
    const apiRoute = new ApiRoute(
      'admin/checkout',
      true,
    );
    return super.genericGet<{}[]>(apiRoute)
      .pipe(
        map(jsonArray => jsonArray.map(json => CheckoutInstanceModel.parseFromJson(json))),
      );
  }

  getEventAttendance(limit?: number): Observable<AttendanceModel[]> {
    const apiRoute = new ApiRoute(
      'admin/attendance',
      true,
      limit ? new Map<string, any>().set('limit', limit) : null,
    );
    return super.genericGet<AttendanceModel[]>(apiRoute);
  }

  returnCheckoutItem(data: CheckoutInstanceModel) {
    const apiRoute = new ApiRoute(
      'admin/checkout/return',
      true,
    );
    return super.genericPost<{}>(apiRoute, { checkoutId: data.uid });
  }

  sendLiveUpdate(message: string, title: string, pushNotification: boolean) {
    const apiRoute = new ApiRoute(
      'live/updates',
      true,
    );
    return super.genericPost<{}>(apiRoute, { pushNotification, updateTitle: title, updateText: message });
  }
}
