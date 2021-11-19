import { FormControl } from "@angular/forms";

// custom validator -> validators should return null if valid else an error object key/value pair (string,any)
export function restrictedWords1(control: FormControl) : {[key: string] : any} {
return control.value.includes('foo') ? {'restrictedWords':'foo'} : null;  // returns a key/value, key typically matches the function name.  key is 'restrictedWords' value is 'foo'
}

// custom validator -> validators should return null if valid else an error object key/value pair (string,any)
// to take additional params we need to make it a function which takes the additional params, but returns the validator function
export function restrictedWords(words) {
  return (control: FormControl) : {[key: string] : any} => {

    if (!words) {
      return null;
    }

    var invalidWords = words
    .map(w => control.value.includes(w) ? w : null) // map will loop through all the words in array, return word or null
    .filter(w => w != null);  // we don't want null so filter it out

    return control.value.includes('foo') ? {'restrictedWords': invalidWords.join(', ')} : null;  // returns a key/value, key typically matches the function name.  key is 'restrictedWords' value is 'foo'
  }
}
