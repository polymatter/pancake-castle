(function(e){function t(t){for(var r,i,o=t[0],s=t[1],c=t[2],p=0,d=[];p<o.length;p++)i=o[p],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&d.push(a[i][0]),a[i]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);l&&l(t);while(d.length)d.shift()();return u.push.apply(u,c||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],r=!0,o=1;o<n.length;o++){var s=n[o];0!==a[s]&&(r=!1)}r&&(u.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={app:0},u=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/pancake-castle/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],s=o.push.bind(o);o.push=t,o=o.slice();for(var c=0;c<o.length;c++)t(o[c]);var l=s;u.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("64a9"),a=n.n(r);a.a},"233c":function(e,t,n){"use strict";var r=n("c03b"),a=n.n(r);a.a},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("Argument",{attrs:{argument:e.selectedPhrase.subject,isSubject:!0,allNouns:e.allNouns},on:{argumentUpdate:e.subjectUpdated}}),n("Predicate",{attrs:{predicate:e.selectedPhrase.predicate,allVerbs:e.allVerbs},on:{predicateUpdate:e.predicateUpdated}}),e._v("\n  "+e._s(e.selectedPhrase)+"\n  "),n("hr"),e._v("\n  "+e._s(e.formPhrase)+"\n")],1)},u=[],i=(n("a481"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"argument"},[e.isSubject?n("h1",[e._v("Subject")]):e._e(),e.isSubject?e._e():n("h1",[e._v("Argument")]),n("select",{directives:[{name:"model",rawName:"v-model",value:e.nouns,expression:"nouns"}],attrs:{multiple:""},on:{change:[function(t){var n=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){var t="_value"in e?e._value:e.value;return t});e.nouns=t.target.multiple?n:n[0]},e.argumentUpdate]}},e._l(e.allNouns,function(t){return n("option",{key:t.key,domProps:{value:t}},[e._v(e._s(t.value))])}),0)])}),o=[],s={name:"Argument",props:{allNouns:Array,isSubject:Boolean},data:function(){return{nouns:[]}},methods:{argumentUpdate:function(){this.$emit("argumentUpdate",this.nouns)}}},c=s,l=n("2877"),p=Object(l["a"])(c,i,o,!1,null,"621aa7ed",null),d=p.exports,f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"predicate"},[n("h1",[e._v("Predicate")]),n("h2",[e._v("Verb")]),n("select",{directives:[{name:"model",rawName:"v-model",value:e.verb,expression:"verb"}],on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){var t="_value"in e?e._value:e.value;return t});e.verb=t.target.multiple?n:n[0]}}},e._l(e.allVerbs,function(t){return n("option",{key:t.key,domProps:{value:t}},[e._v(e._s(t.infinitive))])}),0),n("hr")])},v=[],h={name:"Predicate",props:{allVerbs:Array},data:function(){return{subjects:[],verb:void 0}},watch:{verb:function(e){this.$emit("predicateUpdate",e)}}},b=h,m=(n("233c"),Object(l["a"])(b,f,v,!1,null,"8fad7696",null)),g=m.exports,y={name:"app",data:function(){return{allNouns:[{key:"I",value:"I",firstperson:!0,pluralSubjectForm:"Me"},{key:"You",value:"You",secondperson:!0},{key:"Jeffrey",value:"Jeffrey"},{key:"Trish",value:"Trish"}],allVerbs:[{key:"eat1",infinitive:"to eat",regular:!0},{key:"sing1",infinitive:"to sing",regular:!0},{key:"wash1",infinitive:"to wash",regular:!0,endsWithSibilant:!0},{key:"dance1",infinitive:"to dance",regular:!0}],phraseIndex:0,phrases:[{subject:[],predicate:{}}]}},methods:{formVerb:function(e,t){var n;if(e.regular){var r=e.infinitive.replace("to ",""),a=t.firstperson||t.secondperson||t.plural?"":e.endsWithSibilant?"es":"s";n=r+a}else n="---";return n},formSubject:function(e,t){return this.andConcatinate(t.plural?e.map(function(e){return e.pluralSubjectForm||e.value}):e.map(function(e){return e.value}))},andConcatinate:function(e){var t=e.pop();return e.length>0?e.join(", ")+" and "+t:t},predicateUpdated:function(e){this.selectedPhrase.predicate=e},subjectUpdated:function(e){this.selectedPhrase.subject=e}},computed:{formPhrase:function(){var e="---",t=this.selectedPhrase;if(t.subject&&t.predicate&&t.subject.length>0){var n=!!t.subject[0].firstperson&&1===t.subject.length,r=!!t.subject[0].secondperson&&1===t.subject.length,a=t.subject.length>1,u={plural:a,firstperson:n,secondperson:r},i=this.formSubject(t.subject,u),o=this.formVerb(t.predicate,u);e=i+" "+o}return e},selectedPhrase:function(){return this.phrases[this.phraseIndex]}},components:{Argument:d,Predicate:g}},j=y,_=(n("034f"),Object(l["a"])(j,a,u,!1,null,null,null)),P=_.exports;r["a"].config.productionTip=!1,new r["a"]({render:function(e){return e(P)}}).$mount("#app")},"64a9":function(e,t,n){},c03b:function(e,t,n){}});
//# sourceMappingURL=app.5c68510c.js.map