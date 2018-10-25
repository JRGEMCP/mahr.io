export class UserModel {
  private _access = [];
  private _confirmed = false;
  private _courses = [];
  private _email = null;
  private _id = null;
  private _stripeId = false;
  private _token = null;
  constructor( user ) {
    for ( const k in user ) {
      if ( user.hasOwnProperty(k) ) {
        this['_' + k] = user[k] || this['_' + k];
      }
    }
  }
  get access() { return this._access; }
  addAccess( role ) { this._access.push(role); }
  popAccess( role ) { this._access.splice( this._access.indexOf(role), 1); }

  get courses() { return this._courses; }
  addCourse( course ) { this._courses.push( course ); }

  get confirmed() { return this._confirmed; }
  set confirmed( val ) { this._confirmed = val; }

  get email() { return this._email; }

  get id() { return this._id; }

  get stripeId () { return this._stripeId; }
  set stripeId( val ) { this._stripeId = val; }

  get token() { return this._token; }

  public checkEnrolled( course ) {
    return this._courses.indexOf( course.id ) !== -1;
  }
  public courseOwner( course ) {
    return this.id === course.creator._id;
  }
}
