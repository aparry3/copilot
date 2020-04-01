import {CustomSelect} from './custom_select'
import {InputTextArea} from './input_text_area'
import {InputTitle} from './input_title'
import {Logo, Wordmark} from './branding'
import {MuscleGroups} from './muscle_groups'
import {PageHeader} from './page_header'
import {ResizeableInputTextArea} from './resizeable_input_text_area'

export function titleCase(str) {
    console.log(str)
  return str.replace(/\b[a-zA-Z]/g, function(t) { return t.toUpperCase() });
}


export function normalize(str) {
  return str.replace(/-|_|\./g, ' ');
}


export {
    CustomSelect,
    InputTextArea,
    InputTitle,
    Logo,
    MuscleGroups,
    PageHeader,
    ResizeableInputTextArea,
    Wordmark
}
