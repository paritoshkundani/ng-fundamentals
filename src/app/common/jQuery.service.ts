import { InjectionToken } from '@angular/core';

// param is just a description, any string will do.  We passed in Object as jQuery API is too large to make our own Interface against
// like how we did the toastr one
export let JQ_TOKEN = new InjectionToken<Object>('jQuery');
