import{oa as c}from"./chunk-PDFQNW6T.js";import{ac as d,ed as l,ma as h,pa as u,u as s,va as g,w as o,xa as a}from"./chunk-YZ3QSA6U.js";var D=class extends c{constructor(e){super(),this._delegate=e}getValidDateOrNull(e){return this.isDateInstance(e)&&this.isValid(e)?e:null}compareDatetime(e,t,r=!0){return this.compareDate(e,t)||this.getHour(e)-this.getHour(t)||r&&this.getMinute(e)-this.getMinute(t)}sameDatetime(e,t){if(e&&t){let r=this.isValid(e),n=this.isValid(t);return r&&n?!this.compareDatetime(e,t):r===n}return e===t}sameYear(e,t){return e&&t&&this.getYear(e)===this.getYear(t)}sameDay(e,t){return e&&t&&this.getDate(e)===this.getDate(t)&&this.sameMonthAndYear(e,t)}sameHour(e,t){return e&&t&&this.getHour(e)===this.getHour(t)&&this.sameDay(e,t)}sameMinute(e,t){return e&&t&&this.getMinute(e)===this.getMinute(t)&&this.sameHour(e,t)}sameMonthAndYear(e,t){if(e&&t){let r=this.isValid(e),n=this.isValid(t);return r&&n?!(this.getYear(e)-this.getYear(t)||this.getMonth(e)-this.getMonth(t)):r===n}return e===t}clone(e){return this._delegate.clone(e)}addCalendarYears(e,t){return this._delegate.addCalendarYears(e,t)}addCalendarMonths(e,t){return this._delegate.addCalendarMonths(e,t)}addCalendarDays(e,t){return this._delegate.addCalendarDays(e,t)}getYear(e){return this._delegate.getYear(e)}getMonth(e){return this._delegate.getMonth(e)}getDate(e){return this._delegate.getDate(e)}getDayOfWeek(e){return this._delegate.getDayOfWeek(e)}getMonthNames(e){return this._delegate.getMonthNames(e)}getDateNames(){return this._delegate.getDateNames()}getDayOfWeekNames(e){return this._delegate.getDayOfWeekNames(e)}getYearName(e){return this._delegate.getYearName(e)}getFirstDayOfWeek(){return this._delegate.getFirstDayOfWeek()}getNumDaysInMonth(e){return this._delegate.getNumDaysInMonth(e)}createDate(e,t,r){return this._delegate.createDate(e,t,r)}today(){return this._delegate.today()}parse(e,t){return this._delegate.parse(e,t)}format(e,t){return this._delegate.format(e,t)}toIso8601(e){return this._delegate.toIso8601(e)}isDateInstance(e){return this._delegate.isDateInstance(e)}isValid(e){return this._delegate.isValid(e)}invalid(){return this._delegate.invalid()}clampDate(e,t,r){return t&&this.compareDatetime(e,t)<0?t:r&&this.compareDatetime(e,r)>0?r:e}},E=new u("mtx-datetime-formats"),F=m(24,i=>String(i)),V=m(60,i=>String(i));function m(i,e){let t=Array(i);for(let r=0;r<i;r++)t[r]=e(r);return t}var b=(()=>{let e=class e{transform(r){return o(r)?r:s(r)}};e.\u0275fac=function(n){return new(n||e)},e.\u0275pipe=a({name:"toObservable",type:e,pure:!0,standalone:!0});let i=e;return i})(),W=(()=>{let e=class e{transform(r){return r instanceof d}};e.\u0275fac=function(n){return new(n||e)},e.\u0275pipe=a({name:"isTemplateRef",type:e,pure:!0,standalone:!0});let i=e;return i})(),j=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=g({type:e}),e.\u0275inj=h({imports:[l]});let i=e;return i})();export{D as a,E as b,b as c,W as d,j as e};
