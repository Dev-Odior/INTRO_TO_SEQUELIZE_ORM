class SystemError extends Error {
    public _message: string;
    private _code: number;
    private _errors?: unknown[];
  
    constructor(message: string, _code: number) {
      super(message);
  
      this.message = message || 'An error occurred';
      this._code = _code || 500;
      this._errors = this._errors || [];
  
      Object.setPrototypeOf(this, SystemError.prototype);
    }
  
    get code(): number {
      return this._code;
    }
  
    get errors(): unknown[] | undefined {
      return this._errors;
    }
  }
  
  export default SystemError;
  