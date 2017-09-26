;(function(){
var Internal = {};
self.libsignal = {};
var Module;if(!Module)Module=(typeof Module!=="undefined"?Module:null)||{};var moduleOverrides={};for(var key in Module){if(Module.hasOwnProperty(key)){moduleOverrides[key]=Module[key]}}var ENVIRONMENT_IS_WEB=false;var ENVIRONMENT_IS_WORKER=false;var ENVIRONMENT_IS_NODE=false;var ENVIRONMENT_IS_SHELL=false;if(Module["ENVIRONMENT"]){if(Module["ENVIRONMENT"]==="WEB"){ENVIRONMENT_IS_WEB=true}else if(Module["ENVIRONMENT"]==="WORKER"){ENVIRONMENT_IS_WORKER=true}else if(Module["ENVIRONMENT"]==="NODE"){ENVIRONMENT_IS_NODE=true}else if(Module["ENVIRONMENT"]==="SHELL"){ENVIRONMENT_IS_SHELL=true}else{throw new Error("The provided Module['ENVIRONMENT'] value is not valid. It must be one of: WEB|WORKER|NODE|SHELL.")}}else{ENVIRONMENT_IS_WEB=typeof window==="object";ENVIRONMENT_IS_WORKER=typeof importScripts==="function";ENVIRONMENT_IS_NODE=typeof process==="object"&&typeof require==="function"&&!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_WORKER;ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER}if(ENVIRONMENT_IS_NODE){if(!Module["print"])Module["print"]=console.log;if(!Module["printErr"])Module["printErr"]=console.warn;var nodeFS;var nodePath;Module["read"]=function shell_read(filename,binary){if(!nodeFS)nodeFS=require("fs");if(!nodePath)nodePath=require("path");filename=nodePath["normalize"](filename);var ret=nodeFS["readFileSync"](filename);return binary?ret:ret.toString()};Module["readBinary"]=function readBinary(filename){var ret=Module["read"](filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}assert(ret.buffer);return ret};Module["load"]=function load(f){globalEval(read(f))};if(!Module["thisProgram"]){if(process["argv"].length>1){Module["thisProgram"]=process["argv"][1].replace(/\\/g,"/")}else{Module["thisProgram"]="unknown-program"}}Module["arguments"]=process["argv"].slice(2);if(typeof module!=="undefined"){module["exports"]=Module}process["on"]("uncaughtException",(function(ex){if(!(ex instanceof ExitStatus)){throw ex}}));Module["inspect"]=(function(){return"[Emscripten Module object]"})}else if(ENVIRONMENT_IS_SHELL){if(!Module["print"])Module["print"]=print;if(typeof printErr!="undefined")Module["printErr"]=printErr;if(typeof read!="undefined"){Module["read"]=read}else{Module["read"]=function shell_read(){throw"no read() available"}}Module["readBinary"]=function readBinary(f){if(typeof readbuffer==="function"){return new Uint8Array(readbuffer(f))}var data=read(f,"binary");assert(typeof data==="object");return data};if(typeof scriptArgs!="undefined"){Module["arguments"]=scriptArgs}else if(typeof arguments!="undefined"){Module["arguments"]=arguments}if(typeof quit==="function"){Module["quit"]=(function(status,toThrow){quit(status)})}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){Module["read"]=function shell_read(url){var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};if(ENVIRONMENT_IS_WORKER){Module["readBinary"]=function readBinary(url){var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}Module["readAsync"]=function readAsync(url,onload,onerror){var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=function xhr_onload(){if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response)}else{onerror()}};xhr.onerror=onerror;xhr.send(null)};if(typeof arguments!="undefined"){Module["arguments"]=arguments}if(typeof console!=="undefined"){if(!Module["print"])Module["print"]=function shell_print(x){console.log(x)};if(!Module["printErr"])Module["printErr"]=function shell_printErr(x){console.warn(x)}}else{var TRY_USE_DUMP=false;if(!Module["print"])Module["print"]=TRY_USE_DUMP&&typeof dump!=="undefined"?(function(x){dump(x)}):(function(x){})}if(ENVIRONMENT_IS_WORKER){Module["load"]=importScripts}if(typeof Module["setWindowTitle"]==="undefined"){Module["setWindowTitle"]=(function(title){document.title=title})}}else{throw"Unknown runtime environment. Where are we?"}function globalEval(x){eval.call(null,x)}if(!Module["load"]&&Module["read"]){Module["load"]=function load(f){globalEval(Module["read"](f))}}if(!Module["print"]){Module["print"]=(function(){})}if(!Module["printErr"]){Module["printErr"]=Module["print"]}if(!Module["arguments"]){Module["arguments"]=[]}if(!Module["thisProgram"]){Module["thisProgram"]="./this.program"}if(!Module["quit"]){Module["quit"]=(function(status,toThrow){throw toThrow})}Module.print=Module["print"];Module.printErr=Module["printErr"];Module["preRun"]=[];Module["postRun"]=[];for(var key in moduleOverrides){if(moduleOverrides.hasOwnProperty(key)){Module[key]=moduleOverrides[key]}}moduleOverrides=undefined;var Runtime={setTempRet0:(function(value){tempRet0=value;return value}),getTempRet0:(function(){return tempRet0}),stackSave:(function(){return STACKTOP}),stackRestore:(function(stackTop){STACKTOP=stackTop}),getNativeTypeSize:(function(type){switch(type){case"i1":case"i8":return 1;case"i16":return 2;case"i32":return 4;case"i64":return 8;case"float":return 4;case"double":return 8;default:{if(type[type.length-1]==="*"){return Runtime.QUANTUM_SIZE}else if(type[0]==="i"){var bits=parseInt(type.substr(1));assert(bits%8===0);return bits/8}else{return 0}}}}),getNativeFieldSize:(function(type){return Math.max(Runtime.getNativeTypeSize(type),Runtime.QUANTUM_SIZE)}),STACK_ALIGN:16,prepVararg:(function(ptr,type){if(type==="double"||type==="i64"){if(ptr&7){assert((ptr&7)===4);ptr+=4}}else{assert((ptr&3)===0)}return ptr}),getAlignSize:(function(type,size,vararg){if(!vararg&&(type=="i64"||type=="double"))return 8;if(!type)return Math.min(size,8);return Math.min(size||(type?Runtime.getNativeFieldSize(type):0),Runtime.QUANTUM_SIZE)}),dynCall:(function(sig,ptr,args){if(args&&args.length){return Module["dynCall_"+sig].apply(null,[ptr].concat(args))}else{return Module["dynCall_"+sig].call(null,ptr)}}),functionPointers:[],addFunction:(function(func){for(var i=0;i<Runtime.functionPointers.length;i++){if(!Runtime.functionPointers[i]){Runtime.functionPointers[i]=func;return 2*(1+i)}}throw"Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS."}),removeFunction:(function(index){Runtime.functionPointers[(index-2)/2]=null}),warnOnce:(function(text){if(!Runtime.warnOnce.shown)Runtime.warnOnce.shown={};if(!Runtime.warnOnce.shown[text]){Runtime.warnOnce.shown[text]=1;Module.printErr(text)}}),funcWrappers:{},getFuncWrapper:(function(func,sig){assert(sig);if(!Runtime.funcWrappers[sig]){Runtime.funcWrappers[sig]={}}var sigCache=Runtime.funcWrappers[sig];if(!sigCache[func]){if(sig.length===1){sigCache[func]=function dynCall_wrapper(){return Runtime.dynCall(sig,func)}}else if(sig.length===2){sigCache[func]=function dynCall_wrapper(arg){return Runtime.dynCall(sig,func,[arg])}}else{sigCache[func]=function dynCall_wrapper(){return Runtime.dynCall(sig,func,Array.prototype.slice.call(arguments))}}}return sigCache[func]}),getCompilerSetting:(function(name){throw"You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work"}),stackAlloc:(function(size){var ret=STACKTOP;STACKTOP=STACKTOP+size|0;STACKTOP=STACKTOP+15&-16;return ret}),staticAlloc:(function(size){var ret=STATICTOP;STATICTOP=STATICTOP+size|0;STATICTOP=STATICTOP+15&-16;return ret}),dynamicAlloc:(function(size){var ret=HEAP32[DYNAMICTOP_PTR>>2];var end=(ret+size+15|0)&-16;HEAP32[DYNAMICTOP_PTR>>2]=end;if(end>=TOTAL_MEMORY){var success=enlargeMemory();if(!success){HEAP32[DYNAMICTOP_PTR>>2]=ret;return 0}}return ret}),alignMemory:(function(size,quantum){var ret=size=Math.ceil(size/(quantum?quantum:16))*(quantum?quantum:16);return ret}),makeBigInt:(function(low,high,unsigned){var ret=unsigned?+(low>>>0)+ +(high>>>0)*+4294967296:+(low>>>0)+ +(high|0)*+4294967296;return ret}),GLOBAL_BASE:8,QUANTUM_SIZE:4,__dummy__:0};Module["Runtime"]=Runtime;var ABORT=0;var EXITSTATUS=0;function assert(condition,text){if(!condition){abort("Assertion failed: "+text)}}function getCFunc(ident){var func=Module["_"+ident];if(!func){try{func=eval("_"+ident)}catch(e){}}assert(func,"Cannot call unknown function "+ident+" (perhaps LLVM optimizations or closure removed it?)");return func}var cwrap,ccall;((function(){var JSfuncs={"stackSave":(function(){Runtime.stackSave()}),"stackRestore":(function(){Runtime.stackRestore()}),"arrayToC":(function(arr){var ret=Runtime.stackAlloc(arr.length);writeArrayToMemory(arr,ret);return ret}),"stringToC":(function(str){var ret=0;if(str!==null&&str!==undefined&&str!==0){var len=(str.length<<2)+1;ret=Runtime.stackAlloc(len);stringToUTF8(str,ret,len)}return ret})};var toC={"string":JSfuncs["stringToC"],"array":JSfuncs["arrayToC"]};ccall=function ccallFunc(ident,returnType,argTypes,args,opts){var func=getCFunc(ident);var cArgs=[];var stack=0;if(args){for(var i=0;i<args.length;i++){var converter=toC[argTypes[i]];if(converter){if(stack===0)stack=Runtime.stackSave();cArgs[i]=converter(args[i])}else{cArgs[i]=args[i]}}}var ret=func.apply(null,cArgs);if(returnType==="string")ret=Pointer_stringify(ret);if(stack!==0){if(opts&&opts.async){EmterpreterAsync.asyncFinalizers.push((function(){Runtime.stackRestore(stack)}));return}Runtime.stackRestore(stack)}return ret};var sourceRegex=/^function\s*[a-zA-Z$_0-9]*\s*\(([^)]*)\)\s*{\s*([^*]*?)[\s;]*(?:return\s*(.*?)[;\s]*)?}$/;function parseJSFunc(jsfunc){var parsed=jsfunc.toString().match(sourceRegex).slice(1);return{arguments:parsed[0],body:parsed[1],returnValue:parsed[2]}}var JSsource=null;function ensureJSsource(){if(!JSsource){JSsource={};for(var fun in JSfuncs){if(JSfuncs.hasOwnProperty(fun)){JSsource[fun]=parseJSFunc(JSfuncs[fun])}}}}cwrap=function cwrap(ident,returnType,argTypes){argTypes=argTypes||[];var cfunc=getCFunc(ident);var numericArgs=argTypes.every((function(type){return type==="number"}));var numericRet=returnType!=="string";if(numericRet&&numericArgs){return cfunc}var argNames=argTypes.map((function(x,i){return"$"+i}));var funcstr="(function("+argNames.join(",")+") {";var nargs=argTypes.length;if(!numericArgs){ensureJSsource();funcstr+="var stack = "+JSsource["stackSave"].body+";";for(var i=0;i<nargs;i++){var arg=argNames[i],type=argTypes[i];if(type==="number")continue;var convertCode=JSsource[type+"ToC"];funcstr+="var "+convertCode.arguments+" = "+arg+";";funcstr+=convertCode.body+";";funcstr+=arg+"=("+convertCode.returnValue+");"}}var cfuncname=parseJSFunc((function(){return cfunc})).returnValue;funcstr+="var ret = "+cfuncname+"("+argNames.join(",")+");";if(!numericRet){var strgfy=parseJSFunc((function(){return Pointer_stringify})).returnValue;funcstr+="ret = "+strgfy+"(ret);"}if(!numericArgs){ensureJSsource();funcstr+=JSsource["stackRestore"].body.replace("()","(stack)")+";"}funcstr+="return ret})";return eval(funcstr)}}))();Module["ccall"]=ccall;Module["cwrap"]=cwrap;function setValue(ptr,value,type,noSafe){type=type||"i8";if(type.charAt(type.length-1)==="*")type="i32";switch(type){case"i1":HEAP8[ptr>>0]=value;break;case"i8":HEAP8[ptr>>0]=value;break;case"i16":HEAP16[ptr>>1]=value;break;case"i32":HEAP32[ptr>>2]=value;break;case"i64":tempI64=[value>>>0,(tempDouble=value,+Math_abs(tempDouble)>=+1?tempDouble>+0?(Math_min(+Math_floor(tempDouble/+4294967296),+4294967295)|0)>>>0:~~+Math_ceil((tempDouble- +(~~tempDouble>>>0))/+4294967296)>>>0:0)],HEAP32[ptr>>2]=tempI64[0],HEAP32[ptr+4>>2]=tempI64[1];break;case"float":HEAPF32[ptr>>2]=value;break;case"double":HEAPF64[ptr>>3]=value;break;default:abort("invalid type for setValue: "+type)}}Module["setValue"]=setValue;function getValue(ptr,type,noSafe){type=type||"i8";if(type.charAt(type.length-1)==="*")type="i32";switch(type){case"i1":return HEAP8[ptr>>0];case"i8":return HEAP8[ptr>>0];case"i16":return HEAP16[ptr>>1];case"i32":return HEAP32[ptr>>2];case"i64":return HEAP32[ptr>>2];case"float":return HEAPF32[ptr>>2];case"double":return HEAPF64[ptr>>3];default:abort("invalid type for setValue: "+type)}return null}Module["getValue"]=getValue;var ALLOC_NORMAL=0;var ALLOC_STACK=1;var ALLOC_STATIC=2;var ALLOC_DYNAMIC=3;var ALLOC_NONE=4;Module["ALLOC_NORMAL"]=ALLOC_NORMAL;Module["ALLOC_STACK"]=ALLOC_STACK;Module["ALLOC_STATIC"]=ALLOC_STATIC;Module["ALLOC_DYNAMIC"]=ALLOC_DYNAMIC;Module["ALLOC_NONE"]=ALLOC_NONE;function allocate(slab,types,allocator,ptr){var zeroinit,size;if(typeof slab==="number"){zeroinit=true;size=slab}else{zeroinit=false;size=slab.length}var singleType=typeof types==="string"?types:null;var ret;if(allocator==ALLOC_NONE){ret=ptr}else{ret=[typeof _malloc==="function"?_malloc:Runtime.staticAlloc,Runtime.stackAlloc,Runtime.staticAlloc,Runtime.dynamicAlloc][allocator===undefined?ALLOC_STATIC:allocator](Math.max(size,singleType?1:types.length))}if(zeroinit){var ptr=ret,stop;assert((ret&3)==0);stop=ret+(size&~3);for(;ptr<stop;ptr+=4){HEAP32[ptr>>2]=0}stop=ret+size;while(ptr<stop){HEAP8[ptr++>>0]=0}return ret}if(singleType==="i8"){if(slab.subarray||slab.slice){HEAPU8.set(slab,ret)}else{HEAPU8.set(new Uint8Array(slab),ret)}return ret}var i=0,type,typeSize,previousType;while(i<size){var curr=slab[i];if(typeof curr==="function"){curr=Runtime.getFunctionIndex(curr)}type=singleType||types[i];if(type===0){i++;continue}if(type=="i64")type="i32";setValue(ret+i,curr,type);if(previousType!==type){typeSize=Runtime.getNativeTypeSize(type);previousType=type}i+=typeSize}return ret}Module["allocate"]=allocate;function getMemory(size){if(!staticSealed)return Runtime.staticAlloc(size);if(!runtimeInitialized)return Runtime.dynamicAlloc(size);return _malloc(size)}Module["getMemory"]=getMemory;function Pointer_stringify(ptr,length){if(length===0||!ptr)return"";var hasUtf=0;var t;var i=0;while(1){t=HEAPU8[ptr+i>>0];hasUtf|=t;if(t==0&&!length)break;i++;if(length&&i==length)break}if(!length)length=i;var ret="";if(hasUtf<128){var MAX_CHUNK=1024;var curr;while(length>0){curr=String.fromCharCode.apply(String,HEAPU8.subarray(ptr,ptr+Math.min(length,MAX_CHUNK)));ret=ret?ret+curr:curr;ptr+=MAX_CHUNK;length-=MAX_CHUNK}return ret}return Module["UTF8ToString"](ptr)}Module["Pointer_stringify"]=Pointer_stringify;function AsciiToString(ptr){var str="";while(1){var ch=HEAP8[ptr++>>0];if(!ch)return str;str+=String.fromCharCode(ch)}}Module["AsciiToString"]=AsciiToString;function stringToAscii(str,outPtr){return writeAsciiToMemory(str,outPtr,false)}Module["stringToAscii"]=stringToAscii;var UTF8Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(u8Array,idx){var endPtr=idx;while(u8Array[endPtr])++endPtr;if(endPtr-idx>16&&u8Array.subarray&&UTF8Decoder){return UTF8Decoder.decode(u8Array.subarray(idx,endPtr))}else{var u0,u1,u2,u3,u4,u5;var str="";while(1){u0=u8Array[idx++];if(!u0)return str;if(!(u0&128)){str+=String.fromCharCode(u0);continue}u1=u8Array[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}u2=u8Array[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u3=u8Array[idx++]&63;if((u0&248)==240){u0=(u0&7)<<18|u1<<12|u2<<6|u3}else{u4=u8Array[idx++]&63;if((u0&252)==248){u0=(u0&3)<<24|u1<<18|u2<<12|u3<<6|u4}else{u5=u8Array[idx++]&63;u0=(u0&1)<<30|u1<<24|u2<<18|u3<<12|u4<<6|u5}}}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}}}Module["UTF8ArrayToString"]=UTF8ArrayToString;function UTF8ToString(ptr){return UTF8ArrayToString(HEAPU8,ptr)}Module["UTF8ToString"]=UTF8ToString;function stringToUTF8Array(str,outU8Array,outIdx,maxBytesToWrite){if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127){if(outIdx>=endIdx)break;outU8Array[outIdx++]=u}else if(u<=2047){if(outIdx+1>=endIdx)break;outU8Array[outIdx++]=192|u>>6;outU8Array[outIdx++]=128|u&63}else if(u<=65535){if(outIdx+2>=endIdx)break;outU8Array[outIdx++]=224|u>>12;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else if(u<=2097151){if(outIdx+3>=endIdx)break;outU8Array[outIdx++]=240|u>>18;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else if(u<=67108863){if(outIdx+4>=endIdx)break;outU8Array[outIdx++]=248|u>>24;outU8Array[outIdx++]=128|u>>18&63;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else{if(outIdx+5>=endIdx)break;outU8Array[outIdx++]=252|u>>30;outU8Array[outIdx++]=128|u>>24&63;outU8Array[outIdx++]=128|u>>18&63;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}}outU8Array[outIdx]=0;return outIdx-startIdx}Module["stringToUTF8Array"]=stringToUTF8Array;function stringToUTF8(str,outPtr,maxBytesToWrite){return stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite)}Module["stringToUTF8"]=stringToUTF8;function lengthBytesUTF8(str){var len=0;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127){++len}else if(u<=2047){len+=2}else if(u<=65535){len+=3}else if(u<=2097151){len+=4}else if(u<=67108863){len+=5}else{len+=6}}return len}Module["lengthBytesUTF8"]=lengthBytesUTF8;var UTF16Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf-16le"):undefined;function demangle(func){var __cxa_demangle_func=Module["___cxa_demangle"]||Module["__cxa_demangle"];if(__cxa_demangle_func){try{var s=func.substr(1);var len=lengthBytesUTF8(s)+1;var buf=_malloc(len);stringToUTF8(s,buf,len);var status=_malloc(4);var ret=__cxa_demangle_func(buf,0,0,status);if(getValue(status,"i32")===0&&ret){return Pointer_stringify(ret)}}catch(e){}finally{if(buf)_free(buf);if(status)_free(status);if(ret)_free(ret)}return func}Runtime.warnOnce("warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling");return func}function demangleAll(text){var regex=/__Z[\w\d_]+/g;return text.replace(regex,(function(x){var y=demangle(x);return x===y?x:x+" ["+y+"]"}))}function jsStackTrace(){var err=new Error;if(!err.stack){try{throw new Error(0)}catch(e){err=e}if(!err.stack){return"(no stack trace available)"}}return err.stack.toString()}function stackTrace(){var js=jsStackTrace();if(Module["extraStackTrace"])js+="\n"+Module["extraStackTrace"]();return demangleAll(js)}Module["stackTrace"]=stackTrace;var HEAP,buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferViews(){Module["HEAP8"]=HEAP8=new Int8Array(buffer);Module["HEAP16"]=HEAP16=new Int16Array(buffer);Module["HEAP32"]=HEAP32=new Int32Array(buffer);Module["HEAPU8"]=HEAPU8=new Uint8Array(buffer);Module["HEAPU16"]=HEAPU16=new Uint16Array(buffer);Module["HEAPU32"]=HEAPU32=new Uint32Array(buffer);Module["HEAPF32"]=HEAPF32=new Float32Array(buffer);Module["HEAPF64"]=HEAPF64=new Float64Array(buffer)}var STATIC_BASE,STATICTOP,staticSealed;var STACK_BASE,STACKTOP,STACK_MAX;var DYNAMIC_BASE,DYNAMICTOP_PTR;STATIC_BASE=STATICTOP=STACK_BASE=STACKTOP=STACK_MAX=DYNAMIC_BASE=DYNAMICTOP_PTR=0;staticSealed=false;function abortOnCannotGrowMemory(){abort("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value "+TOTAL_MEMORY+", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime but prevents some optimizations, (3) set Module.TOTAL_MEMORY to a higher value before the program runs, or (4) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ")}function enlargeMemory(){abortOnCannotGrowMemory()}var TOTAL_STACK=Module["TOTAL_STACK"]||5242880;var TOTAL_MEMORY=Module["TOTAL_MEMORY"]||16777216;if(TOTAL_MEMORY<TOTAL_STACK)Module.printErr("TOTAL_MEMORY should be larger than TOTAL_STACK, was "+TOTAL_MEMORY+"! (TOTAL_STACK="+TOTAL_STACK+")");if(Module["buffer"]){buffer=Module["buffer"]}else{{buffer=new ArrayBuffer(TOTAL_MEMORY)}}updateGlobalBufferViews();function getTotalMemory(){return TOTAL_MEMORY}HEAP32[0]=1668509029;HEAP16[1]=25459;if(HEAPU8[2]!==115||HEAPU8[3]!==99)throw"Runtime error: expected the system to be little-endian!";Module["HEAP"]=HEAP;Module["buffer"]=buffer;Module["HEAP8"]=HEAP8;Module["HEAP16"]=HEAP16;Module["HEAP32"]=HEAP32;Module["HEAPU8"]=HEAPU8;Module["HEAPU16"]=HEAPU16;Module["HEAPU32"]=HEAPU32;Module["HEAPF32"]=HEAPF32;Module["HEAPF64"]=HEAPF64;function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback();continue}var func=callback.func;if(typeof func==="number"){if(callback.arg===undefined){Module["dynCall_v"](func)}else{Module["dynCall_vi"](func,callback.arg)}}else{func(callback.arg===undefined?null:callback.arg)}}}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATEXIT__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeExited=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function ensureInitRuntime(){if(runtimeInitialized)return;runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function exitRuntime(){callRuntimeCallbacks(__ATEXIT__);runtimeExited=true}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}Module["addOnPreRun"]=addOnPreRun;function addOnInit(cb){__ATINIT__.unshift(cb)}Module["addOnInit"]=addOnInit;function addOnPreMain(cb){__ATMAIN__.unshift(cb)}Module["addOnPreMain"]=addOnPreMain;function addOnExit(cb){__ATEXIT__.unshift(cb)}Module["addOnExit"]=addOnExit;function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}Module["addOnPostRun"]=addOnPostRun;function intArrayFromString(stringy,dontAddNull,length){var len=length>0?length:lengthBytesUTF8(stringy)+1;var u8array=new Array(len);var numBytesWritten=stringToUTF8Array(stringy,u8array,0,u8array.length);if(dontAddNull)u8array.length=numBytesWritten;return u8array}Module["intArrayFromString"]=intArrayFromString;function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){chr&=255}ret.push(String.fromCharCode(chr))}return ret.join("")}Module["intArrayToString"]=intArrayToString;function writeStringToMemory(string,buffer,dontAddNull){Runtime.warnOnce("writeStringToMemory is deprecated and should not be called! Use stringToUTF8() instead!");var lastChar,end;if(dontAddNull){end=buffer+lengthBytesUTF8(string);lastChar=HEAP8[end]}stringToUTF8(string,buffer,Infinity);if(dontAddNull)HEAP8[end]=lastChar}Module["writeStringToMemory"]=writeStringToMemory;function writeArrayToMemory(array,buffer){HEAP8.set(array,buffer)}Module["writeArrayToMemory"]=writeArrayToMemory;function writeAsciiToMemory(str,buffer,dontAddNull){for(var i=0;i<str.length;++i){HEAP8[buffer++>>0]=str.charCodeAt(i)}if(!dontAddNull)HEAP8[buffer>>0]=0}Module["writeAsciiToMemory"]=writeAsciiToMemory;if(!Math["imul"]||Math["imul"](4294967295,5)!==-5)Math["imul"]=function imul(a,b){var ah=a>>>16;var al=a&65535;var bh=b>>>16;var bl=b&65535;return al*bl+(ah*bl+al*bh<<16)|0};Math.imul=Math["imul"];if(!Math["clz32"])Math["clz32"]=(function(x){x=x>>>0;for(var i=0;i<32;i++){if(x&1<<31-i)return i}return 32});Math.clz32=Math["clz32"];if(!Math["trunc"])Math["trunc"]=(function(x){return x<0?Math.ceil(x):Math.floor(x)});Math.trunc=Math["trunc"];var Math_abs=Math.abs;var Math_cos=Math.cos;var Math_sin=Math.sin;var Math_tan=Math.tan;var Math_acos=Math.acos;var Math_asin=Math.asin;var Math_atan=Math.atan;var Math_atan2=Math.atan2;var Math_exp=Math.exp;var Math_log=Math.log;var Math_sqrt=Math.sqrt;var Math_ceil=Math.ceil;var Math_floor=Math.floor;var Math_pow=Math.pow;var Math_imul=Math.imul;var Math_fround=Math.fround;var Math_round=Math.round;var Math_min=Math.min;var Math_clz32=Math.clz32;var Math_trunc=Math.trunc;var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}Module["addRunDependency"]=addRunDependency;function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}Module["removeRunDependency"]=removeRunDependency;Module["preloadedImages"]={};Module["preloadedAudios"]={};var ASM_CONSTS=[];STATIC_BASE=Runtime.GLOBAL_BASE;STATICTOP=STATIC_BASE+34528;__ATINIT__.push();allocate([8,201,188,243,103,230,9,106,59,167,202,132,133,174,103,187,43,248,148,254,114,243,110,60,241,54,29,95,58,245,79,165,209,130,230,173,127,82,14,81,31,108,62,43,140,104,5,155,107,189,65,251,171,217,131,31,121,33,126,19,25,205,224,91,34,174,40,215,152,47,138,66,205,101,239,35,145,68,55,113,47,59,77,236,207,251,192,181,188,219,137,129,165,219,181,233,56,181,72,243,91,194,86,57,25,208,5,182,241,17,241,89,155,79,25,175,164,130,63,146,24,129,109,218,213,94,28,171,66,2,3,163,152,170,7,216,190,111,112,69,1,91,131,18,140,178,228,78,190,133,49,36,226,180,255,213,195,125,12,85,111,137,123,242,116,93,190,114,177,150,22,59,254,177,222,128,53,18,199,37,167,6,220,155,148,38,105,207,116,241,155,193,210,74,241,158,193,105,155,228,227,37,79,56,134,71,190,239,181,213,140,139,198,157,193,15,101,156,172,119,204,161,12,36,117,2,43,89,111,44,233,45,131,228,166,110,170,132,116,74,212,251,65,189,220,169,176,92,181,83,17,131,218,136,249,118,171,223,102,238,82,81,62,152,16,50,180,45,109,198,49,168,63,33,251,152,200,39,3,176,228,14,239,190,199,127,89,191,194,143,168,61,243,11,224,198,37,167,10,147,71,145,167,213,111,130,3,224,81,99,202,6,112,110,14,10,103,41,41,20,252,47,210,70,133,10,183,39,38,201,38,92,56,33,27,46,237,42,196,90,252,109,44,77,223,179,149,157,19,13,56,83,222,99,175,139,84,115,10,101,168,178,119,60,187,10,106,118,230,174,237,71,46,201,194,129,59,53,130,20,133,44,114,146,100,3,241,76,161,232,191,162,1,48,66,188,75,102,26,168,145,151,248,208,112,139,75,194,48,190,84,6,163,81,108,199,24,82,239,214,25,232,146,209,16,169,101,85,36,6,153,214,42,32,113,87,133,53,14,244,184,209,187,50,112,160,106,16,200,208,210,184,22,193,164,25,83,171,65,81,8,108,55,30,153,235,142,223,76,119,72,39,168,72,155,225,181,188,176,52,99,90,201,197,179,12,28,57,203,138,65,227,74,170,216,78,115,227,99,119,79,202,156,91,163,184,178,214,243,111,46,104,252,178,239,93,238,130,143,116,96,47,23,67,111,99,165,120,114,171,240,161,20,120,200,132,236,57,100,26,8,2,199,140,40,30,99,35,250,255,190,144,233,189,130,222,235,108,80,164,21,121,198,178,247,163,249,190,43,83,114,227,242,120,113,198,156,97,38,234,206,62,39,202,7,194,192,33,199,184,134,209,30,235,224,205,214,125,218,234,120,209,110,238,127,79,125,245,186,111,23,114,170,103,240,6,166,152,200,162,197,125,99,10,174,13,249,190,4,152,63,17,27,71,28,19,53,11,113,27,132,125,4,35,245,119,219,40,147,36,199,64,123,171,202,50,188,190,201,21,10,190,158,60,76,13,16,156,196,103,29,67,182,66,62,203,190,212,197,76,42,126,101,252,156,41,127,89,236,250,214,58,171,111,203,95,23,88,71,74,140,25,68,108,133,59,140,1,189,241,36,255,248,37,195,1,96,220,55,0,183,76,62,255,195,66,61,0,50,76,164,1,225,164,76,255,76,61,163,255,117,62,31,0,81,145,64,255,118,65,14,0,162,115,214,255,6,138,46,0,124,230,244,255,10,138,143,0,52,26,194,0,184,244,76,0,129,143,41,1,190,244,19,255,123,170,122,255,98,129,68,0,121,213,147,0,86,101,30,255,161,103,155,0,140,89,67,255,239,229,190,1,67,11,181,0,198,240,137,254,238,69,188,255,67,151,238,0,19,42,108,255,229,85,113,1,50,68,135,255,17,106,9,0,50,103,1,255,80,1,168,1,35,152,30,255,16,168,185,1,56,89,232,255,101,210,252,0,41,250,71,0,204,170,79,255,14,46,239,255,80,77,239,0,189,214,75,255,17,141,249,0,38,80,76,255,190,85,117,0,86,228,170,0,156,216,208,1,195,207,164,255,150,66,76,255,175,225,16,255,141,80,98,1,76,219,242,0,198,162,114,0,46,218,152,0,155,43,241,254,155,160,104,255,51,187,165,0,2,17,175,0,66,84,160,1,247,58,30,0,35,65,53,254,69,236,191,0,45,134,245,1,163,123,221,0,32,110,20,255,52,23,165,0,186,214,71,0,233,176,96,0,242,239,54,1,57,89,138,0,83,0,84,255,136,160,100,0,92,142,120,254,104,124,190,0,181,177,62,255,250,41,85,0,152,130,42,1,96,252,246,0,151,151,63,254,239,133,62,0,32,56,156,0,45,167,189,255,142,133,179,1,131,86,211,0,187,179,150,254,250,170,14,255,210,163,78,0,37,52,151,0,99,77,26,0,238,156,213,255,213,192,209,1,73,46,84,0,20,65,41,1,54,206,79,0,201,131,146,254,170,111,24,255,177,33,50,254,171,38,203,255,78,247,116,0,209,221,153,0,133,128,178,1,58,44,25,0,201,39,59,1,189,19,252,0,49,229,210,1,117,187,117,0,181,179,184,1,0,114,219,0,48,94,147,0,245,41,56,0,125,13,204,254,244,173,119,0,44,221,32,254,84,234,20,0,249,160,198,1,236,126,234,255,47,99,168,254,170,226,153,255,102,179,216,0,226,141,122,255,122,66,153,254,182,245,134,0,227,228,25,1,214,57,235,255,216,173,56,255,181,231,210,0,119,128,157,255,129,95,136,255,110,126,51,0,2,169,183,255,7,130,98,254,69,176,94,255,116,4,227,1,217,242,145,255,202,173,31,1,105,1,39,255,46,175,69,0,228,47,58,255,215,224,69,254,207,56,69,255,16,254,139,255,23,207,212,255,202,20,126,255,95,213,96,255,9,176,33,0,200,5,207,255,241,42,128,254,35,33,192,255,248,229,196,1,129,17,120,0,251,103,151,255,7,52,112,255,140,56,66,255,40,226,245,255,217,70,37,254,172,214,9,255,72,67,134,1,146,192,214,255,44,38,112,0,68,184,75,255,206,90,251,0,149,235,141,0,181,170,58,0,116,244,239,0,92,157,2,0,102,173,98,0,233,137,96,1,127,49,203,0,5,155,148,0,23,148,9,255,211,122,12,0,34,134,26,255,219,204,136,0,134,8,41,255,224,83,43,254,85,25,247,0,109,127,0,254,169,136,48,0,238,119,219,255,231,173,213,0,206,18,254,254,8,186,7,255,126,9,7,1,111,42,72,0,111,52,236,254,96,63,141,0,147,191,127,254,205,78,192,255,14,106,237,1,187,219,76,0,175,243,187,254,105,89,173,0,85,25,89,1,162,243,148,0,2,118,209,254,33,158,9,0,139,163,46,255,93,70,40,0,108,42,142,254,111,252,142,255,155,223,144,0,51,229,167,255,73,252,155,255,94,116,12,255,152,160,218,255,156,238,37,255,179,234,207,255,197,0,179,255,154,164,141,0,225,196,104,0,10,35,25,254,209,212,242,255,97,253,222,254,184,101,229,0,222,18,127,1,164,136,135,255,30,207,140,254,146,97,243,0,129,192,26,254,201,84,33,255,111,10,78,255,147,81,178,255,4,4,24,0,161,238,215,255,6,141,33,0,53,215,14,255,41,181,208,255,231,139,157,0,179,203,221,255,255,185,113,0,189,226,172,255,113,66,214,255,202,62,45,255,102,64,8,255,78,174,16,254,133,117,68,255,182,120,89,255,133,114,211,0,189,110,21,255,15,10,106,0,41,192,1,0,152,232,121,255,188,60,160,255,153,113,206,255,0,183,226,254,180,13,72,255,176,160,14,254,211,201,134,255,158,24,143,0,127,105,53,0,96,12,189,0,167,215,251,255,159,76,128,254,106,101,225,255,30,252,4,0,146,12,174,0,89,241,178,254,10,229,166,255,123,221,42,254,30,20,212,0,82,128,3,0,48,209,243,0,119,121,64,255,50,227,156,255,0,110,197,1,103,27,144,0,133,59,140,1,189,241,36,255,248,37,195,1,96,220,55,0,183,76,62,255,195,66,61,0,50,76,164,1,225,164,76,255,76,61,163,255,117,62,31,0,81,145,64,255,118,65,14,0,162,115,214,255,6,138,46,0,124,230,244,255,10,138,143,0,52,26,194,0,184,244,76,0,129,143,41,1,190,244,19,255,123,170,122,255,98,129,68,0,121,213,147,0,86,101,30,255,161,103,155,0,140,89,67,255,239,229,190,1,67,11,181,0,198,240,137,254,238,69,188,255,234,113,60,255,37,255,57,255,69,178,182,254,128,208,179,0,118,26,125,254,3,7,214,255,241,50,77,255,85,203,197,255,211,135,250,255,25,48,100,255,187,213,180,254,17,88,105,0,83,209,158,1,5,115,98,0,4,174,60,254,171,55,110,255,217,181,17,255,20,188,170,0,146,156,102,254,87,214,174,255,114,122,155,1,233,44,170,0,127,8,239,1,214,236,234,0,175,5,219,0,49,106,61,255,6,66,208,255,2,106,110,255,81,234,19,255,215,107,192,255,67,151,238,0,19,42,108,255,229,85,113,1,50,68,135,255,17,106,9,0,50,103,1,255,80,1,168,1,35,152,30,255,16,168,185,1,56,89,232,255,101,210,252,0,41,250,71,0,204,170,79,255,14,46,239,255,80,77,239,0,189,214,75,255,17,141,249,0,38,80,76,255,190,85,117,0,86,228,170,0,156,216,208,1,195,207,164,255,150,66,76,255,175,225,16,255,141,80,98,1,76,219,242,0,198,162,114,0,46,218,152,0,155,43,241,254,155,160,104,255,178,9,252,254,100,110,212,0,14,5,167,0,233,239,163,255,28,151,157,1,101,146,10,255,254,158,70,254,71,249,228,0,88,30,50,0,68,58,160,255,191,24,104,1,129,66,129,255,192,50,85,255,8,179,138,255,38,250,201,0,115,80,160,0,131,230,113,0,125,88,147,0,90,68,199,0,253,76,158,0,28,255,118,0,113,250,254,0,66,75,46,0,230,218,43,0,229,120,186,1,148,68,43,0,136,124,238,1,187,107,197,255,84,53,246,255,51,116,254,255,51,187,165,0,2,17,175,0,66,84,160,1,247,58,30,0,35,65,53,254,69,236,191,0,45,134,245,1,163,123,221,0,32,110,20,255,52,23,165,0,186,214,71,0,233,176,96,0,242,239,54,1,57,89,138,0,83,0,84,255,136,160,100,0,92,142,120,254,104,124,190,0,181,177,62,255,250,41,85,0,152,130,42,1,96,252,246,0,151,151,63,254,239,133,62,0,32,56,156,0,45,167,189,255,142,133,179,1,131,86,211,0,187,179,150,254,250,170,14,255,68,113,21,255,222,186,59,255,66,7,241,1,69,6,72,0,86,156,108,254,55,167,89,0,109,52,219,254,13,176,23,255,196,44,106,255,239,149,71,255,164,140,125,255,159,173,1,0,51,41,231,0,145,62,33,0,138,111,93,1,185,83,69,0,144,115,46,0,97,151,16,255,24,228,26,0,49,217,226,0,113,75,234,254,193,153,12,255,182,48,96,255,14,13,26,0,128,195,249,254,69,193,59,0,132,37,81,254,125,106,60,0,214,240,169,1,164,227,66,0,210,163,78,0,37,52,151,0,99,77,26,0,238,156,213,255,213,192,209,1,73,46,84,0,20,65,41,1,54,206,79,0,201,131,146,254,170,111,24,255,177,33,50,254,171,38,203,255,78,247,116,0,209,221,153,0,133,128,178,1,58,44,25,0,201,39,59,1,189,19,252,0,49,229,210,1,117,187,117,0,181,179,184,1,0,114,219,0,48,94,147,0,245,41,56,0,125,13,204,254,244,173,119,0,44,221,32,254,84,234,20,0,249,160,198,1,236,126,234,255,143,62,221,0,129,89,214,255,55,139,5,254,68,20,191,255,14,204,178,1,35,195,217,0,47,51,206,1,38,246,165,0,206,27,6,254,158,87,36,0,217,52,146,255,125,123,215,255,85,60,31,255,171,13,7,0,218,245,88,254,252,35,60,0,55,214,160,255,133,101,56,0,224,32,19,254,147,64,234,0,26,145,162,1,114,118,125,0,248,252,250,0,101,94,196,255,198,141,226,254,51,42,182,0,135,12,9,254,109,172,210,255,197,236,194,1,241,65,154,0,48,156,47,255,153,67,55,255,218,165,34,254,74,180,179,0,218,66,71,1,88,122,99,0,212,181,219,255,92,42,231,255,239,0,154,0,245,77,183,255,94,81,170,1,18,213,216,0,171,93,71,0,52,94,248,0,18,151,161,254,197,209,66,255,174,244,15,254,162,48,183,0,49,61,240,254,182,93,195,0,199,228,6,1,200,5,17,255,137,45,237,255,108,148,4,0,90,79,237,255,39,63,77,255,53,82,207,1,142,22,118,255,101,232,18,1,92,26,67,0,5,200,88,255,33,168,138,255,149,225,72,0,2,209,27,255,44,245,168,1,220,237,17,255,30,211,105,254,141,238,221,0,128,80,245,254,111,254,14,0,222,95,190,1,223,9,241,0,146,76,212,255,108,205,104,255,63,117,153,0,144,69,48,0,35,228,111,0,192,33,193,255,112,214,190,254,115,152,151,0,23,102,88,0,51,74,248,0,226,199,143,254,204,162,101,255,208,97,189,1,245,104,18,0,230,246,30,255,23,148,69,0,110,88,52,254,226,181,89,255,208,47,90,254,114,161,80,255,33,116,248,0,179,152,87,255,69,144,177,1,88,238,26,255,58,32,113,1,1,77,69,0,59,121,52,255,152,238,83,0,52,8,193,0,231,39,233,255,199,34,138,0,222,68,173,0,91,57,242,254,220,210,127,255,192,7,246,254,151,35,187,0,195,236,165,0,111,93,206,0,212,247,133,1,154,133,209,255,155,231,10,0,64,78,38,0,122,249,100,1,30,19,97,255,62,91,249,1,248,133,77,0,197,63,168,254,116,10,82,0,184,236,113,254,212,203,194,255,61,100,252,254,36,5,202,255,119,91,153,255,129,79,29,0,103,103,171,254,237,215,111,255,216,53,69,0,239,240,23,0,194,149,221,255,38,225,222,0,232,255,180,254,118,82,133,255,57,209,177,1,139,232,133,0,158,176,46,254,194,115,46,0,88,247,229,1,28,103,191,0,221,222,175,254,149,235,44,0,151,228,25,254,218,105,103,0,142,85,210,0,149,129,190,255,213,65,94,254,117,134,224,255,82,198,117,0,157,221,220,0,163,101,36,0,197,114,37,0,104,172,166,254,11,182,0,0,81,72,188,255,97,188,16,255,69,6,10,0,199,147,145,255,8,9,115,1,65,214,175,255,217,173,209,0,80,127,166,0,247,229,4,254,167,183,124,255,90,28,204,254,175,59,240,255,11,41,248,1,108,40,51,255,144,177,195,254,150,250,126,0,138,91,65,1,120,60,222,255,245,193,239,0,29,214,189,255,128,2,25,0,80,154,162,0,77,220,107,1,234,205,74,255,54,166,103,255,116,72,9,0,228,94,47,255,30,200,25,255,35,214,89,255,61,176,140,255,83,226,163,255,75,130,172,0,128,38,17,0,95,137,152,255,215,124,159,1,79,93,0,0,148,82,157,254,195,130,251,255,40,202,76,255,251,126,224,0,157,99,62,254,207,7,225,255,96,68,195,0,140,186,157,255,131,19,231,255,42,128,254,0,52,219,61,254,102,203,72,0,141,7,11,255,186,164,213,0,31,122,119,0,133,242,145,0,208,252,232,255,91,213,182,255,143,4,250,254,249,215,74,0,165,30,111,1,171,9,223,0,229,123,34,1,92,130,26,255,77,155,45,1,195,139,28,255,59,224,78,0,136,17,247,0,108,121,32,0,79,250,189,255,96,227,252,254,38,241,62,0,62,174,125,255,155,111,93,255,10,230,206,1,97,197,40,255,0,49,57,254,65,250,13,0,18,251,150,255,220,109,210,255,5,174,166,254,44,129,189,0,235,35,147,255,37,247,141,255,72,141,4,255,103,107,255,0,247,90,4,0,53,44,42,0,2,30,240,0,4,59,63,0,88,78,36,0,113,167,180,0,190,71,193,255,199,158,164,255,58,8,172,0,77,33,12,0,65,63,3,0,153,77,33,255,172,254,102,1,228,221,4,255,87,30,254,1,146,41,86,255,138,204,239,254,108,141,17,255,187,242,135,0,210,208,127,0,68,45,14,254,73,96,62,0,81,60,24,255,170,6,36,255,3,249,26,0,35,213,109,0,22,129,54,255,21,35,225,255,234,61,56,255,58,217,6,0,143,124,88,0,236,126,66,0,209,38,183,255,34,238,6,255,174,145,102,0,95,22,211,0,196,15,153,254,46,84,232,255,117,34,146,1,231,250,74,255,27,134,100,1,92,187,195,255,170,198,112,0,120,28,42,0,209,70,67,0,29,81,31,0,29,168,100,1,169,173,160,0,107,35,117,0,62,96,59,255,81,12,69,1,135,239,190,255,220,252,18,0,163,220,58,255,137,137,188,255,83,102,109,0,96,6,76,0,234,222,210,255,185,174,205,1,60,158,213,255,13,241,214,0,172,129,140,0,93,104,242,0,192,156,251,0,43,117,30,0,225,81,158,0,127,232,218,0,226,28,203,0,233,27,151,255,117,43,5,255,242,14,47,255,33,20,6,0,137,251,44,254,27,31,245,255,183,214,125,254,40,121,149,0,186,158,213,255,89,8,227,0,69,88,0,254,203,135,225,0,201,174,203,0,147,71,184,0,18,121,41,254,94,5,78,0,224,214,240,254,36,5,180,0,251,135,231,1,163,138,212,0,210,249,116,254,88,129,187,0,19,8,49,254,62,14,144,255,159,76,211,0,214,51,82,0,109,117,228,254,103,223,203,255,75,252,15,1,154,71,220,255,23,13,91,1,141,168,96,255,181,182,133,0,250,51,55,0,234,234,212,254,175,63,158,0,39,240,52,1,158,189,36,255,213,40,85,1,32,180,247,255,19,102,26,1,84,24,97,255,69,21,222,0,148,139,122,255,220,213,235,1,232,203,255,0,121,57,147,0,227,7,154,0,53,22,147,1,72,1,225,0,82,134,48,254,83,60,157,255,145,72,169,0,34,103,239,0,198,233,47,0,116,19,4,255,184,106,9,255,183,129,83,0,36,176,230,1,34,103,72,0,219,162,134,0,245,42,158,0,32,149,96,254,165,44,144,0,202,239,72,254,215,150,5,0,42,66,36,1,132,215,175,0,86,174,86,255,26,197,156,255,49,232,135,254,103,182,82,0,253,128,176,1,153,178,122,0,245,250,10,0,236,24,178,0,137,106,132,0,40,29,41,0,50,30,152,255,124,105,38,0,230,191,75,0,143,43,170,0,44,131,20,255,44,13,23,255,237,255,155,1,159,109,100,255,112,181,24,255,104,220,108,0,55,211,131,0,99,12,213,255,152,151,145,255,238,5,159,0,97,155,8,0,33,108,81,0,1,3,103,0,62,109,34,255,250,155,180,0,32,71,195,255,38,70,145,1,159,95,245,0,69,229,101,1,136,28,240,0,79,224,25,0,78,110,121,255,248,168,124,0,187,128,247,0,2,147,235,254,79,11,132,0,70,58,12,1,181,8,163,255,79,137,133,255,37,170,11,255,141,243,85,255,176,231,215,255,204,150,164,255,239,215,39,255,46,87,156,254,8,163,88,255,172,34,232,0,66,44,102,255,27,54,41,254,236,99,87,255,41,123,169,1,52,114,43,0,117,134,40,0,155,134,26,0,231,207,91,254,35,132,38,255,19,102,125,254,36,227,133,255,118,3,113,255,29,13,124,0,152,96,74,1,88,146,206,255,167,191,220,254,162,18,88,255,182,100,23,0,31,117,52,0,81,46,106,1,12,2,7,0,69,80,201,1,209,246,172,0,12,48,141,1,224,211,88,0,116,226,159,0,122,98,130,0,65,236,234,1,225,226,9,255,207,226,123,1,89,214,59,0,112,135,88,1,90,244,203,255,49,11,38,1,129,108,186,0,89,112,15,1,101,46,204,255,127,204,45,254,79,255,221,255,51,73,18,255,127,42,101,255,241,21,202,0,160,227,7,0,105,50,236,0,79,52,197,255,104,202,208,1,180,15,16,0,101,197,78,255,98,77,203,0,41,185,241,1,35,193,124,0,35,155,23,255,207,53,192,0,11,125,163,1,249,158,185,255,4,131,48,0,21,93,111,255,61,121,231,1,69,200,36,255,185,48,185,255,111,238,21,255,39,50,25,255,99,215,163,255,87,212,30,255,164,147,5,255,128,6,35,1,108,223,110,255,194,76,178,0,74,101,180,0,243,47,48,0,174,25,43,255,82,173,253,1,54,114,192,255,40,55,91,0,215,108,176,255,11,56,7,0,224,233,76,0,209,98,202,254,242,25,125,0,44,193,93,254,203,8,177,0,135,176,19,0,112,71,213,255,206,59,176,1,4,67,26,0,14,143,213,254,42,55,208,255,60,67,120,0,193,21,163,0,99,164,115,0,10,20,118,0,156,212,222,254,160,7,217,255,114,245,76,1,117,59,123,0,176,194,86,254,213,15,176,0,78,206,207,254,213,129,59,0,233,251,22,1,96,55,152,255,236,255,15,255,197,89,84,255,93,149,133,0,174,160,113,0,234,99,169,255,152,116,88,0,144,164,83,255,95,29,198,255,34,47,15,255,99,120,134,255,5,236,193,0,249,247,126,255,147,187,30,0,50,230,117,255,108,217,219,255,163,81,166,255,72,25,169,254,155,121,79,255,28,155,89,254,7,126,17,0,147,65,33,1,47,234,253,0,26,51,18,0,105,83,199,255,163,196,230,0,113,248,164,0,226,254,218,0,189,209,203,255,164,247,222,254,255,35,165,0,4,188,243,1,127,179,71,0,37,237,254,255,100,186,240,0,5,57,71,254,103,72,73,255,244,18,81,254,229,210,132,255,238,6,180,255,11,229,174,255,227,221,192,1,17,49,28,0,163,215,196,254,9,118,4,255,51,240,71,0,113,129,109,255,76,240,231,0,188,177,127,0,125,71,44,1,26,175,243,0,94,169,25,254,27,230,29,0,15,139,119,1,168,170,186,255,172,197,76,255,252,75,188,0,137,124,196,0,72,22,96,255,45,151,249,1,220,145,100,0,64,192,159,255,120,239,226,0,129,178,146,0,0,192,125,0,235,138,234,0,183,157,146,0,83,199,192,255,184,172,72,255,73,225,128,0,77,6,250,255,186,65,67,0,104,246,207,0,188,32,138,255,218,24,242,0,67,138,81,254,237,129,121,255,20,207,150,1,41,199,16,255,6,20,128,0,159,118,5,0,181,16,143,255,220,38,15,0,23,64,147,254,73,26,13,0,87,228,57,1,204,124,128,0,43,24,223,0,219,99,199,0,22,75,20,255,19,27,126,0,157,62,215,0,110,29,230,0,179,167,255,1,54,252,190,0,221,204,182,254,179,158,65,255,81,157,3,0,194,218,159,0,170,223,0,0,224,11,32,255,38,197,98,0,168,164,37,0,23,88,7,1,164,186,110,0,96,36,134,0,234,242,229,0,250,121,19,0,242,254,112,255,3,47,94,1,9,239,6,255,81,134,153,254,214,253,168,255,67,124,224,0,245,95,74,0,28,30,44,254,1,109,220,255,178,89,89,0,252,36,76,0,24,198,46,255,76,77,111,0,134,234,136,255,39,94,29,0,185,72,234,255,70,68,135,255,231,102,7,254,77,231,140,0,167,47,58,1,148,97,118,255,16,27,225,1,166,206,143,255,110,178,214,255,180,131,162,0,143,141,225,1,13,218,78,255,114,153,33,1,98,104,204,0,175,114,117,1,167,206,75,0,202,196,83,1,58,64,67,0,138,47,111,1,196,247,128,255,137,224,224,254,158,112,207,0,154,100,255,1,134,37,107,0,198,128,79,255,127,209,155,255,163,254,185,254,60,14,243,0,31,219,112,254,29,217,65,0,200,13,116,254,123,60,196,255,224,59,184,254,242,89,196,0,123,16,75,254,149,16,206,0,69,254,48,1,231,116,223,255,209,160,65,1,200,80,98,0,37,194,184,254,148,63,34,0,139,240,65,255,217,144,132,255,56,38,45,254,199,120,210,0,108,177,166,255,160,222,4,0,220,126,119,254,165,107,160,255,82,220,248,1,241,175,136,0,144,141,23,255,169,138,84,0,160,137,78,255,226,118,80,255,52,27,132,255,63,96,139,255,152,250,39,0,188,155,15,0,232,51,150,254,40,15,232,255,240,229,9,255,137,175,27,255,75,73,97,1,218,212,11,0,135,5,162,1,107,185,213,0,2,249,107,255,40,242,70,0,219,200,25,0,25,157,13,0,67,82,80,255,196,249,23,255,145,20,149,0,50,72,146,0,94,76,148,1,24,251,65,0,31,192,23,0,184,212,201,255,123,233,162,1,247,173,72,0,162,87,219,254,126,134,89,0,159,11,12,254,166,105,29,0,73,27,228,1,113,120,183,255,66,163,109,1,212,143,11,255,159,231,168,1,255,128,90,0,57,14,58,254,89,52,10,255,253,8,163,1,0,145,210,255,10,129,85,1,46,181,27,0,103,136,160,254,126,188,209,255,34,35,111,0,215,219,24,255,212,11,214,254,101,5,118,0,232,197,133,255,223,167,109,255,237,80,86,255,70,139,94,0,158,193,191,1,155,15,51,255,15,190,115,0,78,135,207,255,249,10,27,1,181,125,233,0,95,172,13,254,170,213,161,255,39,236,138,255,95,93,87,255,190,128,95,0,125,15,206,0,166,150,159,0,227,15,158,255,206,158,120,255,42,141,128,0,101,178,120,1,156,109,131,0,218,14,44,254,247,168,206,255,212,112,28,0,112,17,228,255,90,16,37,1,197,222,108,0,254,207,83,255,9,90,243,255,243,244,172,0,26,88,115,255,205,116,122,0,191,230,193,0,180,100,11,1,217,37,96,255,154,78,156,0,235,234,31,255,206,178,178,255,149,192,251,0,182,250,135,0,246,22,105,0,124,193,109,255,2,210,149,255,169,17,170,0,0,96,110,255,117,9,8,1,50,123,40,255,193,189,99,0,34,227,160,0,48,80,70,254,211,51,236,0,45,122,245,254,44,174,8,0,173,37,233,255,158,65,171,0,122,69,215,255,90,80,2,255,131,106,96,254,227,114,135,0,205,49,119,254,176,62,64,255,82,51,17,255,241,20,243,255,130,13,8,254,128,217,243,255,162,27,1,254,90,118,241,0,246,198,246,255,55,16,118,255,200,159,157,0,163,17,1,0,140,107,121,0,85,161,118,255,38,0,149,0,156,47,238,0,9,166,166,1,75,98,181,255,50,74,25,0,66,15,47,0,139,225,159,0,76,3,142,255,14,238,184,0,11,207,53,255,183,192,186,1,171,32,174,255,191,76,221,1,247,170,219,0,25,172,50,254,217,9,233,0,203,126,68,255,183,92,48,0,127,167,183,1,65,49,254,0,16,63,127,1,254,21,170,255,59,224,127,254,22,48,63,255,27,78,130,254,40,195,29,0,250,132,112,254,35,203,144,0,104,169,168,0,207,253,30,255,104,40,38,254,94,228,88,0,206,16,128,255,212,55,122,255,223,22,234,0,223,197,127,0,253,181,181,1,145,102,118,0,236,153,36,255,212,217,72,255,20,38,24,254,138,62,62,0,152,140,4,0,230,220,99,255,1,21,212,255,148,201,231,0,244,123,9,254,0,171,210,0,51,58,37,255,1,255,14,255,244,183,145,254,0,242,166,0,22,74,132,0,121,216,41,0,95,195,114,254,133,24,151,255,156,226,231,255,247,5,77,255,246,148,115,254,225,92,81,255,222,80,246,254,170,123,89,255,74,199,141,0,29,20,8,255,138,136,70,255,93,75,92,0,221,147,49,254,52,126,226,0,229,124,23,0,46,9,181,0,205,64,52,1,131,254,28,0,151,158,212,0,131,64,78,0,206,25,171,0,0,230,139,0,191,253,110,254,103,247,167,0,64,40,40,1,42,165,241,255,59,75,228,254,124,243,189,255,196,92,178,255,130,140,86,255,141,89,56,1,147,198,5,255,203,248,158,254,144,162,141,0,11,172,226,0,130,42,21,255,1,167,143,255,144,36,36,255,48,88,164,254,168,170,220,0,98,71,214,0,91,208,79,0,159,76,201,1,166,42,214,255,69,255,0,255,6,128,125,255,190,1,140,0,146,83,218,255,215,238,72,1,122,127,53,0,189,116,165,255,84,8,66,255,214,3,208,255,213,110,133,0,195,168,44,1,158,231,69,0,162,64,200,254,91,58,104,0,182,58,187,254,249,228,136,0,203,134,76,254,99,221,233,0,75,254,214,254,80,69,154,0,64,152,248,254,236,136,202,255,157,105,153,254,149,175,20,0,22,35,19,255,124,121,233,0,186,250,198,254,132,229,139,0,137,80,174,255,165,125,68,0,144,202,148,254,235,239,248,0,135,184,118,0,101,94,17,255,122,72,70,254,69,130,146,0,127,222,248,1,69,127,118,255,30,82,215,254,188,74,19,255,229,167,194,254,117,25,66,255,65,234,56,254,213,22,156,0,151,59,93,254,45,28,27,255,186,126,164,255,32,6,239,0,127,114,99,1,219,52,2,255,99,96,166,254,62,190,126,255,108,222,168,1,75,226,174,0,230,226,199,0,60,117,218,255,252,248,20,1,214,188,204,0,31,194,134,254,123,69,192,255,169,173,36,254,55,98,91,0,223,42,102,254,137,1,102,0,157,90,25,0,239,122,64,255,252,6,233,0,7,54,20,255,82,116,174,0,135,37,54,255,15,186,125,0,227,112,175,255,100,180,225,255,42,237,244,255,244,173,226,254,248,18,33,0,171,99,150,255,74,235,50,255,117,82,32,254,106,168,237,0,207,109,208,1,228,9,186,0,135,60,169,254,179,92,143,0,244,170,104,255,235,45,124,255,70,99,186,0,117,137,183,0,224,31,215,0,40,9,100,0,26,16,95,1,68,217,87,0,8,151,20,255,26,100,58,255,176,165,203,1,52,118,70,0,7,32,254,254,244,254,245,255,167,144,194,255,125,113,23,255,176,121,181,0,136,84,209,0,138,6,30,255,89,48,28,0,33,155,14,255,25,240,154,0,141,205,109,1,70,115,62,255,20,40,107,254,138,154,199,255,94,223,226,255,157,171,38,0,163,177,25,254,45,118,3,255,14,222,23,1,209,190,81,255,118,123,232,1,13,213,101,255,123,55,123,254,27,246,165,0,50,99,76,255,140,214,32,255,97,65,67,255,24,12,28,0,174,86,78,1,64,247,96,0,160,135,67,0,66,55,243,255,147,204,96,255,26,6,33,255,98,51,83,1,153,213,208,255,2,184,54,255,25,218,11,0,49,67,246,254,18,149,72,255,13,25,72,0,42,79,214,0,42,4,38,1,27,139,144,255,149,187,23,0,18,164,132,0,245,84,184,254,120,198,104,255,126,218,96,0,56,117,234,255,13,29,214,254,68,47,10,255,167,154,132,254,152,38,198,0,66,178,89,255,200,46,171,255,13,99,83,255,210,187,253,255,170,45,42,1,138,209,124,0,214,162,141,0,12,230,156,0,102,36,112,254,3,147,67,0,52,215,123,255,233,171,54,255,98,137,62,0,247,218,39,255,231,218,236,0,247,191,127,0,195,146,84,0,165,176,92,255,19,212,94,255,17,74,227,0,88,40,153,1,198,147,1,255,206,67,245,254,240,3,218,255,61,141,213,255,97,183,106,0,195,232,235,254,95,86,154,0,209,48,205,254,118,209,241,255,240,120,223,1,213,29,159,0,163,127,147,255,13,218,93,0,85,24,68,254,70,20,80,255,189,5,140,1,82,97,254,255,99,99,191,255,132,84,133,255,107,218,116,255,112,122,46,0,105,17,32,0,194,160,63,255,68,222,39,1,216,253,92,0,177,105,205,255,149,201,195,0,42,225,11,255,40,162,115,0,9,7,81,0,165,218,219,0,180,22,0,254,29,146,252,255,146,207,225,1,180,135,96,0,31,163,112,0,177,11,219,255,133,12,193,254,43,78,50,0,65,113,121,1,59,217,6,255,110,94,24,1,112,172,111,0,7,15,96,0,36,85,123,0,71,150,21,255,208,73,188,0,192,11,167,1,213,245,34,0,9,230,92,0,162,142,39,255,215,90,27,0,98,97,89,0,94,79,211,0,90,157,240,0,95,220,126,1,102,176,226,0,36,30,224,254,35,31,127,0,231,232,115,1,85,83,130,0,210,73,245,255,47,143,114,255,68,65,197,0,59,72,62,255,183,133,173,254,93,121,118,255,59,177,81,255,234,69,173,255,205,128,177,0,220,244,51,0,26,244,209,1,73,222,77,255,163,8,96,254,150,149,211,0,158,254,203,1,54,127,139,0,161,224,59,0,4,109,22,255,222,42,45,255,208,146,102,255,236,142,187,0,50,205,245,255,10,74,89,254,48,79,142,0,222,76,130,255,30,166,63,0,236,12,13,255,49,184,244,0,187,113,102,0,218,101,253,0,153,57,182,254,32,150,42,0,25,198,146,1,237,241,56,0,140,68,5,0,91,164,172,255,78,145,186,254,67,52,205,0,219,207,129,1,109,115,17,0,54,143,58,1,21,248,120,255,179,255,30,0,193,236,66,255,1,255,7,255,253,192,48,255,19,69,217,1,3,214,0,255,64,101,146,1,223,125,35,255,235,73,179,255,249,167,226,0,225,175,10,1,97,162,58,0,106,112,171,1,84,172,5,255,133,140,178,255,134,245,142,0,97,90,125,255,186,203,185,255,223,77,23,255,192,92,106,0,15,198,115,255,217,152,248,0,171,178,120,255,228,134,53,0,176,54,193,1,250,251,53,0,213,10,100,1,34,199,106,0,151,31,244,254,172,224,87,255,14,237,23,255,253,85,26,255,127,39,116,255,172,104,100,0,251,14,70,255,212,208,138,255,253,211,250,0,176,49,165,0,15,76,123,255,37,218,160,255,92,135,16,1,10,126,114,255,70,5,224,255,247,249,141,0,68,20,60,1,241,210,189,255,195,217,187,1,151,3,113,0,151,92,174,0,231,62,178,255,219,183,225,0,23,23,33,255,205,181,80,0,57,184,248,255,67,180,1,255,90,123,93,255,39,0,162,255,96,248,52,255,84,66,140,0,34,127,228,255,194,138,7,1,166,110,188,0,21,17,155,1,154,190,198,255,214,80,59,255,18,7,143,0,72,29,226,1,199,217,249,0,232,161,71,1,149,190,201,0,217,175,95,254,113,147,67,255,138,143,199,255,127,204,1,0,29,182,83,1,206,230,155,255,186,204,60,0,10,125,85,255,232,96,25,255,255,89,247,255,213,254,175,1,232,193,81,0,28,43,156,254,12,69,8,0,147,24,248,0,18,198,49,0,134,60,35,0,118,246,18,255,49,88,254,254,228,21,186,255,182,65,112,1,219,22,1,255,22,126,52,255,189,53,49,255,112,25,143,0,38,127,55,255,226,101,163,254,208,133,61,255,137,69,174,1,190,118,145,255,60,98,219,255,217,13,245,255,250,136,10,0,84,254,226,0,201,31,125,1,240,51,251,255,31,131,130,255,2,138,50,255,215,215,177,1,223,12,238,255,252,149,56,255,124,91,68,255,72,126,170,254,119,255,100,0,130,135,232,255,14,79,178,0,250,131,197,0,138,198,208,0,121,216,139,254,119,18,36,255,29,193,122,0,16,42,45,255,213,240,235,1,230,190,169,255,198,35,228,254,110,173,72,0,214,221,241,255,56,148,135,0,192,117,78,254,141,93,207,255,143,65,149,0,21,18,98,255,95,44,244,1,106,191,77,0,254,85,8,254,214,110,176,255,73,173,19,254,160,196,199,255,237,90,144,0,193,172,113,255,200,155,136,254,228,90,221,0,137,49,74,1,164,221,215,255,209,189,5,255,105,236,55,255,42,31,129,1,193,255,236,0,46,217,60,0,138,88,187,255,226,82,236,255,81,69,151,255,142,190,16,1,13,134,8,0,127,122,48,255,81,64,156,0,171,243,139,0,237,35,246,0,122,143,193,254,212,122,146,0,95,41,255,1,87,132,77,0,4,212,31,0,17,31,78,0,39,45,173,254,24,142,217,255,95,9,6,255,227,83,6,0,98,59,130,254,62,30,33,0,8,115,211,1,162,97,128,255,7,184,23,254,116,28,168,255,248,138,151,255,98,244,240,0,186,118,130,0,114,248,235,255,105,173,200,1,160,124,71,255,94,36,164,1,175,65,146,255,238,241,170,254,202,198,197,0,228,71,138,254,45,246,109,255,194,52,158,0,133,187,176,0,83,252,154,254,89,189,221,255,170,73,252,0,148,58,125,0,36,68,51,254,42,69,177,255,168,76,86,255,38,100,204,255,38,53,35,0,175,19,97,0,225,238,253,255,81,81,135,0,210,27,255,254,235,73,107,0,8,207,115,0,82,127,136,0,84,99,21,254,207,19,136,0,100,164,101,0,80,208,77,255,132,207,237,255,15,3,15,255,33,166,110,0,156,95,85,255,37,185,111,1,150,106,35,255,166,151,76,0,114,87,135,255,159,194,64,0,12,122,31,255,232,7,101,254,173,119,98,0,154,71,220,254,191,57,53,255,168,232,160,255,224,32,99,255,218,156,165,0,151,153,163,0,217,13,148,1,197,113,89,0,149,28,161,254,207,23,30,0,105,132,227,255,54,230,94,255,133,173,204,255,92,183,157,255,88,144,252,254,102,33,90,0,159,97,3,0,181,218,155,255,240,114,119,0,106,214,53,255,165,190,115,1,152,91,225,255,88,106,44,255,208,61,113,0,151,52,124,0,191,27,156,255,110,54,236,1,14,30,166,255,39,127,207,1,229,199,28,0,188,228,188,254,100,157,235,0,246,218,183,1,107,22,193,255,206,160,95,0,76,239,147,0,207,161,117,0,51,166,2,255,52,117,10,254,73,56,227,255,152,193,225,0,132,94,136,255,101,191,209,0,32,107,229,255,198,43,180,1,100,210,118,0,114,67,153,255,23,88,26,255,89,154,92,1,220,120,140,255,144,114,207,255,252,115,250,255,34,206,72,0,138,133,127,255,8,178,124,1,87,75,97,0,15,229,92,254,240,67,131,255,118,123,227,254,146,120,104,255,145,213,255,1,129,187,70,255,219,119,54,0,1,19,173,0,45,150,148,1,248,83,72,0,203,233,169,1,142,107,56,0,247,249,38,1,45,242,80,255,30,233,103,0,96,82,70,0,23,201,111,0,81,39,30,255,161,183,78,255,194,234,33,255,68,227,140,254,216,206,116,0,70,27,235,255,104,144,79,0,164,230,93,254,214,135,156,0,154,187,242,254,188,20,131,255,36,109,174,0,159,112,241,0,5,110,149,1,36,165,218,0,166,29,19,1,178,46,73,0,93,43,32,254,248,189,237,0,102,155,141,0,201,93,195,255,241,139,253,255,15,111,98,255,108,65,163,254,155,79,190,255,73,174,193,254,246,40,48,255,107,88,11,254,202,97,85,255,253,204,18,255,113,242,66,0,110,160,194,254,208,18,186,0,81,21,60,0,188,104,167,255,124,166,97,254,210,133,142,0,56,242,137,254,41,111,130,0,111,151,58,1,111,213,141,255,183,172,241,255,38,6,196,255,185,7,123,255,46,11,246,0,245,105,119,1,15,2,161,255,8,206,45,255,18,202,74,255,83,124,115,1,212,141,157,0,83,8,209,254,139,15,232,255,172,54,173,254,50,247,132,0,214,189,213,0,144,184,105,0,223,254,248,0,255,147,240,255,23,188,72,0,7,51,54,0,188,25,180,254,220,180,0,255,83,160,20,0,163,189,243,255,58,209,194,255,87,73,60,0,106,24,49,0,245,249,220,0,22,173,167,0,118,11,195,255,19,126,237,0,110,159,37,255,59,82,47,0,180,187,86,0,188,148,208,1,100,37,133,255,7,112,193,0,129,188,156,255,84,106,129,255,133,225,202,0,14,236,111,255,40,20,101,0,172,172,49,254,51,54,74,255,251,185,184,255,93,155,224,255,180,249,224,1,230,178,146,0,72,57,54,254,178,62,184,0,119,205,72,0,185,239,253,255,61,15,218,0,196,67,56,255,234,32,171,1,46,219,228,0,208,108,234,255,20,63,232,255,165,53,199,1,133,228,5,255,52,205,107,0,74,238,140,255,150,156,219,254,239,172,178,255,251,189,223,254,32,142,211,255,218,15,138,1,241,196,80,0,28,36,98,254,22,234,199,0,61,237,220,255,246,57,37,0,142,17,142,255,157,62,26,0,43,238,95,254,3,217,6,255,213,25,240,1,39,220,174,255,154,205,48,254,19,13,192,255,244,34,54,254,140,16,155,0,240,181,5,254,155,193,60,0,166,128,4,255,36,145,56,255,150,240,219,0,120,51,145,0,82,153,42,1,140,236,146,0,107,92,248,1,189,10,3,0,63,136,242,0,211,39,24,0,19,202,161,1,173,27,186,255,210,204,239,254,41,209,162,255,182,254,159,255,172,116,52,0,195,103,222,254,205,69,59,0,53,22,41,1,218,48,194,0,80,210,242,0,210,188,207,0,187,161,161,254,216,17,1,0,136,225,113,0,250,184,63,0,223,30,98,254,77,168,162,0,59,53,175,0,19,201,10,255,139,224,194,0,147,193,154,255,212,189,12,254,1,200,174,255,50,133,113,1,94,179,90,0,173,182,135,0,94,177,113,0,43,89,215,255,136,252,106,255,123,134,83,254,5,245,66,255,82,49,39,1,220,2,224,0,97,129,177,0,77,59,89,0,61,29,155,1,203,171,220,255,92,78,139,0,145,33,181,255,169,24,141,1,55,150,179,0,139,60,80,255,218,39,97,0,2,147,107,255,60,248,72,0,173,230,47,1,6,83,182,255,16,105,162,254,137,212,81,255,180,184,134,1,39,222,164,255,221,105,251,1,239,112,125,0,63,7,97,0,63,104,227,255,148,58,12,0,90,60,224,255,84,212,252,0,79,215,168,0,248,221,199,1,115,121,1,0,36,172,120,0,32,162,187,255,57,107,49,255,147,42,21,0,106,198,43,1,57,74,87,0,126,203,81,255,129,135,195,0,140,31,177,0,221,139,194,0,3,222,215,0,131,68,231,0,177,86,178,254,124,151,180,0,184,124,38,1,70,163,17,0,249,251,181,1,42,55,227,0,226,161,44,0,23,236,110,0,51,149,142,1,93,5,236,0,218,183,106,254,67,24,77,0,40,245,209,255,222,121,153,0,165,57,30,0,83,125,60,0,70,38,82,1,229,6,188,0,109,222,157,255,55,118,63,255,205,151,186,0,227,33,149,255,254,176,246,1,227,177,227,0,34,106,163,254,176,43,79,0,106,95,78,1,185,241,122,255,185,14,61,0,36,1,202,0,13,178,162,255,247,11,132,0,161,230,92,1,65,1,185,255,212,50,165,1,141,146,64,255,158,242,218,0,21,164,125,0,213,139,122,1,67,71,87,0,203,158,178,1,151,92,43,0,152,111,5,255,39,3,239,255,217,255,250,255,176,63,71,255,74,245,77,1,250,174,18,255,34,49,227,255,246,46,251,255,154,35,48,1,125,157,61,255,106,36,78,255,97,236,153,0,136,187,120,255,113,134,171,255,19,213,217,254,216,94,209,255,252,5,61,0,94,3,202,0,3,26,183,255,64,191,43,255,30,23,21,0,129,141,77,255,102,120,7,1,194,76,140,0,188,175,52,255,17,81,148,0,232,86,55,1,225,48,172,0,134,42,42,255,238,50,47,0,169,18,254,0,20,147,87,255,14,195,239,255,69,247,23,0,238,229,128,255,177,49,112,0,168,98,251,255,121,71,248,0,243,8,145,254,246,227,153,255,219,169,177,254,251,139,165,255,12,163,185,255,164,40,171,255,153,159,27,254,243,109,91,255,222,24,112,1,18,214,231,0,107,157,181,254,195,147,0,255,194,99,104,255,89,140,190,255,177,66,126,254,106,185,66,0,49,218,31,0,252,174,158,0,188,79,230,1,238,41,224,0,212,234,8,1,136,11,181,0,166,117,83,255,68,195,94,0,46,132,201,0,240,152,88,0,164,57,69,254,160,224,42,255,59,215,67,255,119,195,141,255,36,180,121,254,207,47,8,255,174,210,223,0,101,197,68,255,255,82,141,1,250,137,233,0,97,86,133,1,16,80,69,0,132,131,159,0,116,93,100,0,45,141,139,0,152,172,157,255,90,43,91,0,71,153,46,0,39,16,112,255,217,136,97,255,220,198,25,254,177,53,49,0,222,88,134,255,128,15,60,0,207,192,169,255,192,116,209,255,106,78,211,1,200,213,183,255,7,12,122,254,222,203,60,255,33,110,199,254,251,106,117,0,228,225,4,1,120,58,7,255,221,193,84,254,112,133,27,0,189,200,201,255,139,135,150,0,234,55,176,255,61,50,65,0,152,108,169,255,220,85,1,255,112,135,227,0,162,26,186,0,207,96,185,254,244,136,107,0,93,153,50,1,198,97,151,0,110,11,86,255,143,117,174,255,115,212,200,0,5,202,183,0,237,164,10,254,185,239,62,0,236,120,18,254,98,123,99,255,168,201,194,254,46,234,214,0,191,133,49,255,99,169,119,0,190,187,35,1,115,21,45,255,249,131,72,0,112,6,123,255,214,49,181,254,166,233,34,0,92,197,102,254,253,228,205,255,3,59,201,1,42,98,46,0,219,37,35,255,169,195,38,0,94,124,193,1,156,43,223,0,95,72,133,254,120,206,191,0,122,197,239,255,177,187,79,255,254,46,2,1,250,167,190,0,84,129,19,0,203,113,166,255,249,31,189,254,72,157,202,255,208,71,73,255,207,24,72,0,10,16,18,1,210,81,76,255,88,208,192,255,126,243,107,255,238,141,120,255,199,121,234,255,137,12,59,255,36,220,123,255,148,179,60,254,240,12,29,0,66,0,97,1,36,30,38,255,115,1,93,255,96,103,231,255],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE);allocate([197,158,59,1,192,164,240,0,202,202,57,255,24,174,48,0,89,77,155,1,42,76,215,0,244,151,233,0,23,48,81,0,239,127,52,254,227,130,37,255,248,116,93,1,124,132,118,0,173,254,192,1,6,235,83,255,110,175,231,1,251,28,182,0,129,249,93,254,84,184,128,0,76,181,62,0,175,128,186,0,100,53,136,254,109,29,226,0,221,233,58,1,20,99,74,0,0,22,160,0,134,13,21,0,9,52,55,255,17,89,140,0,175,34,59,0,84,165,119,255,224,226,234,255,7,72,166,255,123,115,255,1,18,214,246,0,250,7,71,1,217,220,185,0,212,35,76,255,38,125,175,0,189,97,210,0,114,238,44,255,41,188,169,254,45,186,154,0,81,92,22,0,132,160,193,0,121,208,98,255,13,81,44,255,203,156,82,0,71,58,21,255,208,114,191,254,50,38,147,0,154,216,195,0,101,25,18,0,60,250,215,255,233,132,235,255,103,175,142,1,16,14,92,0,141,31,110,254,238,241,45,255,153,217,239,1,97,168,47,255,249,85,16,1,28,175,62,255,57,254,54,0,222,231,126,0,166,45,117,254,18,189,96,255,228,76,50,0,200,244,94,0,198,152,120,1,68,34,69,255,12,65,160,254,101,19,90,0,167,197,120,255,68,54,185,255,41,218,188,0,113,168,48,0,88,105,189,1,26,82,32,255,185,93,164,1,228,240,237,255,66,182,53,0,171,197,92,255,107,9,233,1,199,120,144,255,78,49,10,255,109,170,105,255,90,4,31,255,28,244,113,255,74,58,11,0,62,220,246,255,121,154,200,254,144,210,178,255,126,57,129,1,43,250,14,255,101,111,28,1,47,86,241,255,61,70,150,255,53,73,5,255,30,26,158,0,209,26,86,0,138,237,74,0,164,95,188,0,142,60,29,254,162,116,248,255,187,175,160,0,151,18,16,0,209,111,65,254,203,134,39,255,88,108,49,255,131,26,71,255,221,27,215,254,104,105,93,255,31,236,31,254,135,0,211,255,143,127,110,1,212,73,229,0,233,67,167,254,195,1,208,255,132,17,221,255,51,217,90,0,67,235,50,255,223,210,143,0,179,53,130,1,233,106,198,0,217,173,220,255,112,229,24,255,175,154,93,254,71,203,246,255,48,66,133,255,3,136,230,255,23,221,113,254,235,111,213,0,170,120,95,254,251,221,2,0,45,130,158,254,105,94,217,255,242,52,180,254,213,68,45,255,104,38,28,0,244,158,76,0,161,200,96,255,207,53,13,255,187,67,148,0,170,54,248,0,119,162,178,255,83,20,11,0,42,42,192,1,146,159,163,255,183,232,111,0,77,229,21,255,71,53,143,0,27,76,34,0,246,136,47,255,219,39,182,255,92,224,201,1,19,142,14,255,69,182,241,255,163,118,245,0,9,109,106,1,170,181,247,255,78,47,238,255,84,210,176,255,213,107,139,0,39,38,11,0,72,21,150,0,72,130,69,0,205,77,155,254,142,133,21,0,71,111,172,254,226,42,59,255,179,0,215,1,33,128,241,0,234,252,13,1,184,79,8,0,110,30,73,255,246,141,189,0,170,207,218,1,74,154,69,255,138,246,49,255,155,32,100,0,125,74,105,255,90,85,61,255,35,229,177,255,62,125,193,255,153,86,188,1,73,120,212,0,209,123,246,254,135,209,38,255,151,58,44,1,92,69,214,255,14,12,88,255,252,153,166,255,253,207,112,255,60,78,83,255,227,124,110,0,180,96,252,255,53,117,33,254,164,220,82,255,41,1,27,255,38,164,166,255,164,99,169,254,61,144,70,255,192,166,18,0,107,250,66,0,197,65,50,0,1,179,18,255,255,104,1,255,43,153,35,255,80,111,168,0,110,175,168,0,41,105,45,255,219,14,205,255,164,233,140,254,43,1,118,0,233,67,195,0,178,82,159,255,138,87,122,255,212,238,90,255,144,35,124,254,25,140,164,0,251,215,44,254,133,70,107,255,101,227,80,254,92,169,55,0,215,42,49,0,114,180,85,255,33,232,27,1,172,213,25,0,62,176,123,254,32,133,24,255,225,191,62,0,93,70,153,0,181,42,104,1,22,191,224,255,200,200,140,255,249,234,37,0,149,57,141,0,195,56,208,255,254,130,70,255,32,173,240,255,29,220,199,0,110,100,115,255,132,229,249,0,228,233,223,255,37,216,209,254,178,177,209,255,183,45,165,254,224,97,114,0,137,97,168,255,225,222,172,0,165,13,49,1,210,235,204,255,252,4,28,254,70,160,151,0,232,190,52,254,83,248,93,255,62,215,77,1,175,175,179,255,160,50,66,0,121,48,208,0,63,169,209,255,0,210,200,0,224,187,44,1,73,162,82,0,9,176,143,255,19,76,193,255,29,59,167,1,24,43,154,0,28,190,190,0,141,188,129,0,232,235,203,255,234,0,109,255,54,65,159,0,60,88,232,255,121,253,150,254,252,233,131,255,198,110,41,1,83,77,71,255,200,22,59,254,106,253,242,255,21,12,207,255,237,66,189,0,90,198,202,1,225,172,127,0,53,22,202,0,56,230,132,0,1,86,183,0,109,190,42,0,243,68,174,1,109,228,154,0,200,177,122,1,35,160,183,255,177,48,85,255,90,218,169,255,248,152,78,0,202,254,110,0,6,52,43,0,142,98,65,255,63,145,22,0,70,106,93,0,232,138,107,1,110,179,61,255,211,129,218,1,242,209,92,0,35,90,217,1,182,143,106,255,116,101,217,255,114,250,221,255,173,204,6,0,60,150,163,0,73,172,44,255,239,110,80,255,237,76,153,254,161,140,249,0,149,232,229,0,133,31,40,255,174,164,119,0,113,51,214,0,129,228,2,254,64,34,243,0,107,227,244,255,174,106,200,255,84,153,70,1,50,35,16,0,250,74,216,254,236,189,66,255,153,249,13,0,230,178,4,255,221,41,238,0,118,227,121,255,94,87,140,254,254,119,92,0,73,239,246,254,117,87,128,0,19,211,145,255,177,46,252,0,229,91,246,1,69,128,247,255,202,77,54,1,8,11,9,255,153,96,166,0,217,214,173,255,134,192,2,1,0,207,0,0,189,174,107,1,140,134,100,0,158,193,243,1,182,102,171,0,235,154,51,0,142,5,123,255,60,168,89,1,217,14,92,255,19,214,5,1,211,167,254,0,44,6,202,254,120,18,236,255,15,113,184,255,184,223,139,0,40,177,119,254,182,123,90,255,176,165,176,0,247,77,194,0,27,234,120,0,231,0,214,255,59,39,30,0,125,99,145,255,150,68,68,1,141,222,248,0,153,123,210,255,110,127,152,255,229,33,214,1,135,221,197,0,137,97,2,0,12,143,204,255,81,41,188,0,115,79,130,255,94,3,132,0,152,175,187,255,124,141,10,255,126,192,179,255,11,103,198,0,149,6,45,0,219,85,187,1,230,18,178,255,72,182,152,0,3,198,184,255,128,112,224,1,97,161,230,0,254,99,38,255,58,159,197,0,151,66,219,0,59,69,143,255,185,112,249,0,119,136,47,255,123,130,132,0,168,71,95,255,113,176,40,1,232,185,173,0,207,93,117,1,68,157,108,255,102,5,147,254,49,97,33,0,89,65,111,254,247,30,163,255,124,217,221,1,102,250,216,0,198,174,75,254,57,55,18,0,227,5,236,1,229,213,173,0,201,109,218,1,49,233,239,0,30,55,158,1,25,178,106,0,155,111,188,1,94,126,140,0,215,31,238,1,77,240,16,0,213,242,25,1,38,71,168,0,205,186,93,254,49,211,140,255,219,0,180,255,134,118,165,0,160,147,134,255,110,186,35,255,198,243,42,0,243,146,119,0,134,235,163,1,4,241,135,255,193,46,193,254,103,180,79,255,225,4,184,254,242,118,130,0,146,135,176,1,234,111,30,0,69,66,213,254,41,96,123,0,121,94,42,255,178,191,195,255,46,130,42,0,117,84,8,255,233,49,214,254,238,122,109,0,6,71,89,1,236,211,123,0,244,13,48,254,119,148,14,0,114,28,86,255,75,237,25,255,145,229,16,254,129,100,53,255,134,150,120,254,168,157,50,0,23,72,104,255,224,49,14,0,255,123,22,255,151,185,151,255,170,80,184,1,134,182,20,0,41,100,101,1,153,33,16,0,76,154,111,1,86,206,234,255,192,160,164,254,165,123,93,255,1,216,164,254,67,17,175,255,169,11,59,255,158,41,61,255,73,188,14,255,195,6,137,255,22,147,29,255,20,103,3,255,246,130,227,255,122,40,128,0,226,47,24,254,35,36,32,0,152,186,183,255,69,202,20,0,195,133,195,0,222,51,247,0,169,171,94,1,183,0,160,255,64,205,18,1,156,83,15,255,197,58,249,254,251,89,110,255,50,10,88,254,51,43,216,0,98,242,198,1,245,151,113,0,171,236,194,1,197,31,199,255,229,81,38,1,41,59,20,0,253,104,230,0,152,93,14,255,246,242,146,254,214,169,240,255,240,102,108,254,160,167,236,0,154,218,188,0,150,233,202,255,27,19,250,1,2,71,133,255,175,12,63,1,145,183,198,0,104,120,115,255,130,251,247,0,17,212,167,255,62,123,132,255,247,100,189,0,155,223,152,0,143,197,33,0,155,59,44,255,150,93,240,1,127,3,87,255,95,71,207,1,167,85,1,255,188,152,116,255,10,23,23,0,137,195,93,1,54,98,97,0,240,0,168,255,148,188,127,0,134,107,151,0,76,253,171,0,90,132,192,0,146,22,54,0,224,66,54,254,230,186,229,255,39,182,196,0,148,251,130,255,65,131,108,254,128,1,160,0,169,49,167,254,199,254,148,255,251,6,131,0,187,254,129,255,85,82,62,0,178,23,58,255,254,132,5,0,164,213,39,0,134,252,146,254,37,53,81,255,155,134,82,0,205,167,238,255,94,45,180,255,132,40,161,0,254,111,112,1,54,75,217,0,179,230,221,1,235,94,191,255,23,243,48,1,202,145,203,255,39,118,42,255,117,141,253,0,254,0,222,0,43,251,50,0,54,169,234,1,80,68,208,0,148,203,243,254,145,7,135,0,6,254,0,0,252,185,127,0,98,8,129,255,38,35,72,255,211,36,220,1,40,26,89,0,168,64,197,254,3,222,239,255,2,83,215,254,180,159,105,0,58,115,194,0,186,116,106,255,229,247,219,255,129,118,193,0,202,174,183,1,166,161,72,0,201,107,147,254,237,136,74,0,233,230,106,1,105,111,168,0,64,224,30,1,1,229,3,0,102,151,175,255,194,238,228,255,254,250,212,0,187,237,121,0,67,251,96,1,197,30,11,0,183,95,204,0,205,89,138,0,64,221,37,1,255,223,30,255,178,48,211,255,241,200,90,255,167,209,96,255,57,130,221,0,46,114,200,255,61,184,66,0,55,182,24,254,110,182,33,0,171,190,232,255,114,94,31,0,18,221,8,0,47,231,254,0,255,112,83,0,118,15,215,255,173,25,40,254,192,193,31,255,238,21,146,255,171,193,118,255,101,234,53,254,131,212,112,0,89,192,107,1,8,208,27,0,181,217,15,255,231,149,232,0,140,236,126,0,144,9,199,255,12,79,181,254,147,182,202,255,19,109,182,255,49,212,225,0,74,163,203,0,175,233,148,0,26,112,51,0,193,193,9,255,15,135,249,0,150,227,130,0,204,0,219,1,24,242,205,0,238,208,117,255,22,244,112,0,26,229,34,0,37,80,188,255,38,45,206,254,240,90,225,255,29,3,47,255,42,224,76,0,186,243,167,0,32,132,15,255,5,51,125,0,139,135,24,0,6,241,219,0,172,229,133,255,246,214,50,0,231,11,207,255,191,126,83,1,180,163,170,255,245,56,24,1,178,164,211,255,3,16,202,1,98,57,118,255,141,131,89,254,33,51,24,0,243,149,91,255,253,52,14,0,35,169,67,254,49,30,88,255,179,27,36,255,165,140,183,0,58,189,151,0,88,31,0,0,75,169,66,0,66,101,199,255,24,216,199,1,121,196,26,255,14,79,203,254,240,226,81,255,94,28,10,255,83,193,240,255,204,193,131,255,94,15,86,0,218,40,157,0,51,193,209,0,0,242,177,0,102,185,247,0,158,109,116,0,38,135,91,0,223,175,149,0,220,66,1,255,86,60,232,0,25,96,37,255,225,122,162,1,215,187,168,255,158,157,46,0,56,171,162,0,232,240,101,1,122,22,9,0,51,9,21,255,53,25,238,255,217,30,232,254,125,169,148,0,13,232,102,0,148,9,37,0,165,97,141,1,228,131,41,0,222,15,243,255,254,18,17,0,6,60,237,1,106,3,113,0,59,132,189,0,92,112,30,0,105,208,213,0,48,84,179,255,187,121,231,254,27,216,109,255,162,221,107,254,73,239,195,255,250,31,57,255,149,135,89,255,185,23,115,1,3,163,157,255,18,112,250,0,25,57,187,255,161,96,164,0,47,16,243,0,12,141,251,254,67,234,184,255,41,18,161,0,175,6,96,255,160,172,52,254,24,176,183,255,198,193,85,1,124,121,137,255,151,50,114,255,220,203,60,255,207,239,5,1,0,38,107,255,55,238,94,254,70,152,94,0,213,220,77,1,120,17,69,255,85,164,190,255,203,234,81,0,38,49,37,254,61,144,124,0,137,78,49,254,168,247,48,0,95,164,252,0,105,169,135,0,253,228,134,0,64,166,75,0,81,73,20,255,207,210,10,0,234,106,150,255,94,34,90,255,254,159,57,254,220,133,99,0,139,147,180,254,24,23,185,0,41,57,30,255,189,97,76,0,65,187,223,255,224,172,37,255,34,62,95,1,231,144,240,0,77,106,126,254,64,152,91,0,29,98,155,0,226,251,53,255,234,211,5,255,144,203,222,255,164,176,221,254,5,231,24,0,179,122,205,0,36,1,134,255,125,70,151,254,97,228,252,0,172,129,23,254,48,90,209,255,150,224,82,1,84,134,30,0,241,196,46,0,103,113,234,255,46,101,121,254,40,124,250,255,135,45,242,254,9,249,168,255,140,108,131,255,143,163,171,0,50,173,199,255,88,222,142,255,200,95,158,0,142,192,163,255,7,117,135,0,111,124,22,0,236,12,65,254,68,38,65,255,227,174,254,0,244,245,38,0,240,50,208,255,161,63,250,0,60,209,239,0,122,35,19,0,14,33,230,254,2,159,113,0,106,20,127,255,228,205,96,0,137,210,174,254,180,212,144,255,89,98,154,1,34,88,139,0,167,162,112,1,65,110,197,0,241,37,169,0,66,56,131,255,10,201,83,254,133,253,187,255,177,112,45,254,196,251,0,0,196,250,151,255,238,232,214,255,150,209,205,0,28,240,118,0,71,76,83,1,236,99,91,0,42,250,131,1,96,18,64,255,118,222,35,0,113,214,203,255,122,119,184,255,66,19,36,0,204,64,249,0,146,89,139,0,134,62,135,1,104,233,101,0,188,84,26,0,49,249,129,0,208,214,75,255,207,130,77,255,115,175,235,0,171,2,137,255,175,145,186,1,55,245,135,255,154,86,181,1,100,58,246,255,109,199,60,255,82,204,134,255,215,49,230,1,140,229,192,255,222,193,251,255,81,136,15,255,179,149,162,255,23,39,29,255,7,95,75,254,191,81,222,0,241,81,90,255,107,49,201,255,244,211,157,0,222,140,149,255,65,219,56,254,189,246,90,255,178,59,157,1,48,219,52,0,98,34,215,0,28,17,187,255,175,169,24,0,92,79,161,255,236,200,194,1,147,143,234,0,229,225,7,1,197,168,14,0,235,51,53,1,253,120,174,0,197,6,168,255,202,117,171,0,163,21,206,0,114,85,90,255,15,41,10,255,194,19,99,0,65,55,216,254,162,146,116,0,50,206,212,255,64,146,29,255,158,158,131,1,100,165,130,255,172,23,129,255,125,53,9,255,15,193,18,1,26,49,11,255,181,174,201,1,135,201,14,255,100,19,149,0,219,98,79,0,42,99,143,254,96,0,48,255,197,249,83,254,104,149,79,255,235,110,136,254,82,128,44,255,65,41,36,254,88,211,10,0,187,121,187,0,98,134,199,0,171,188,179,254,210,11,238,255,66,123,130,254,52,234,61,0,48,113,23,254,6,86,120,255,119,178,245,0,87,129,201,0,242,141,209,0,202,114,85,0,148,22,161,0,103,195,48,0,25,49,171,255,138,67,130,0,182,73,122,254,148,24,130,0,211,229,154,0,32,155,158,0,84,105,61,0,177,194,9,255,166,89,86,1,54,83,187,0,249,40,117,255,109,3,215,255,53,146,44,1,63,47,179,0,194,216,3,254,14,84,136,0,136,177,13,255,72,243,186,255,117,17,125,255,211,58,211,255,93,79,223,0,90,88,245,255,139,209,111,255,70,222,47,0,10,246,79,255,198,217,178,0,227,225,11,1,78,126,179,255,62,43,126,0,103,148,35,0,129,8,165,254,245,240,148,0,61,51,142,0,81,208,134,0,15,137,115,255,211,119,236,255,159,245,248,255,2,134,136,255,230,139,58,1,160,164,254,0,114,85,141,255,49,166,182,255,144,70,84,1,85,182,7,0,46,53,93,0,9,166,161,255,55,162,178,255,45,184,188,0,146,28,44,254,169,90,49,0,120,178,241,1,14,123,127,255,7,241,199,1,189,66,50,255,198,143,101,254,189,243,135,255,141,24,24,254,75,97,87,0,118,251,154,1,237,54,156,0,171,146,207,255,131,196,246,255,136,64,113,1,151,232,57,0,240,218,115,0,49,61,27,255,64,129,73,1,252,169,27,255,40,132,10,1,90,201,193,255,252,121,240,1,186,206,41,0,43,198,97,0,145,100,183,0,204,216,80,254,172,150,65,0,249,229,196,254,104,123,73,255,77,104,96,254,130,180,8,0,104,123,57,0,220,202,229,255,102,249,211,0,86,14,232,255,182,78,209,0,239,225,164,0,106,13,32,255,120,73,17,255,134,67,233,0,83,254,181,0,183,236,112,1,48,64,131,255,241,216,243,255,65,193,226,0,206,241,100,254,100,134,166,255,237,202,197,0,55,13,81,0,32,124,102,255,40,228,177,0,118,181,31,1,231,160,134,255,119,187,202,0,0,142,60,255,128,38,189,255,166,201,150,0,207,120,26,1,54,184,172,0,12,242,204,254,133,66,230,0,34,38,31,1,184,112,80,0,32,51,165,254,191,243,55,0,58,73,146,254,155,167,205,255,100,104,152,255,197,254,207,255,173,19,247,0,238,10,202,0,239,151,242,0,94,59,39,255,240,29,102,255,10,92,154,255,229,84,219,255,161,129,80,0,208,90,204,1,240,219,174,255,158,102,145,1,53,178,76,255,52,108,168,1,83,222,107,0,211,36,109,0,118,58,56,0,8,29,22,0,237,160,199,0,170,209,157,0,137,71,47,0,143,86,32,0,198,242,2,0,212,48,136,1,92,172,186,0,230,151,105,1,96,191,229,0,138,80,191,254,240,216,130,255,98,43,6,254,168,196,49,0,253,18,91,1,144,73,121,0,61,146,39,1,63,104,24,255,184,165,112,254,126,235,98,0,80,213,98,255,123,60,87,255,82,140,245,1,223,120,173,255,15,198,134,1,206,60,239,0,231,234,92,255,33,238,19,255,165,113,142,1,176,119,38,0,160,43,166,254,239,91,105,0,107,61,194,1,25,4,68,0,15,139,51,0,164,132,106,255,34,116,46,254,168,95,197,0,137,212,23,0,72,156,58,0,137,112,69,254,150,105,154,255,236,201,157,0,23,212,154,255,136,82,227,254,226,59,221,255,95,149,192,0,81,118,52,255,33,43,215,1,14,147,75,255,89,156,121,254,14,18,79,0,147,208,139,1,151,218,62,255,156,88,8,1,210,184,98,255,20,175,123,255,102,83,229,0,220,65,116,1,150,250,4,255,92,142,220,255,34,247,66,255,204,225,179,254,151,81,151,0,71,40,236,255,138,63,62,0,6,79,240,255,183,185,181,0,118,50,27,0,63,227,192,0,123,99,58,1,50,224,155,255,17,225,223,254,220,224,77,255,14,44,123,1,141,128,175,0,248,212,200,0,150,59,183,255,147,97,29,0,150,204,181,0,253,37,71,0,145,85,119,0,154,200,186,0,2,128,249,255,83,24,124,0,14,87,143,0,168,51,245,1,124,151,231,255,208,240,197,1,124,190,185,0,48,58,246,0,20,233,232,0,125,18,98,255,13,254,31,255,245,177,130,255,108,142,35,0,171,125,242,254,140,12,34,255,165,161,162,0,206,205,101,0,247,25,34,1,100,145,57,0,39,70,57,0,118,204,203,255,242,0,162,0,165,244,30,0,198,116,226,0,128,111,153,255,140,54,182,1,60,122,15,255,155,58,57,1,54,50,198,0,171,211,29,255,107,138,167,255,173,107,199,255,109,161,193,0,89,72,242,255,206,115,89,255,250,254,142,254,177,202,94,255,81,89,50,0,7,105,66,255,25,254,255,254,203,64,23,255,79,222,108,255,39,249,75,0,241,124,50,0,239,152,133,0,221,241,105,0,147,151,98,0,213,161,121,254,242,49,137,0,233,37,249,254,42,183,27,0,184,119,230,255,217,32,163,255,208,251,228,1,137,62,131,255,79,64,9,254,94,48,113,0,17,138,50,254,193,255,22,0,247,18,197,1,67,55,104,0,16,205,95,255,48,37,66,0,55,156,63,1,64,82,74,255,200,53,71,254,239,67,125,0,26,224,222,0,223,137,93,255,30,224,202,255,9,220,132,0,198,38,235,1,102,141,86,0,60,43,81,1,136,28,26,0,233,36,8,254,207,242,148,0,164,162,63,0,51,46,224,255,114,48,79,255,9,175,226,0,222,3,193,255,47,160,232,255,255,93,105,254,14,42,230,0,26,138,82,1,208,43,244,0,27,39,38,255,98,208,127,255,64,149,182,255,5,250,209,0,187,60,28,254,49,25,218,255,169,116,205,255,119,18,120,0,156,116,147,255,132,53,109,255,13,10,202,0,110,83,167,0,157,219,137,255,6,3,130,255,50,167,30,255,60,159,47,255,129,128,157,254,94,3,189,0,3,166,68,0,83,223,215,0,150,90,194,1,15,168,65,0,227,83,51,255,205,171,66,255,54,187,60,1,152,102,45,255,119,154,225,0,240,247,136,0,100,197,178,255,139,71,223,255,204,82,16,1,41,206,42,255,156,192,221,255,216,123,244,255,218,218,185,255,187,186,239,255,252,172,160,255,195,52,22,0,144,174,181,254,187,100,115,255,211,78,176,255,27,7,193,0,147,213,104,255,90,201,10,255,80,123,66,1,22,33,186,0,1,7,99,254,30,206,10,0,229,234,5,0,53,30,210,0,138,8,220,254,71,55,167,0,72,225,86,1,118,190,188,0,254,193,101,1,171,249,172,255,94,158,183,254,93,2,108,255,176,93,76,255,73,99,79,255,74,64,129,254,246,46,65,0,99,241,127,254,246,151,102,255,44,53,208,254,59,102,234,0,154,175,164,255,88,242,32,0,111,38,1,0,255,182,190,255,115,176,15,254,169,60,129,0,122,237,241,0,90,76,63,0,62,74,120,255,122,195,110,0,119,4,178,0,222,242,210,0,130,33,46,254,156,40,41,0,167,146,112,1,49,163,111,255,121,176,235,0,76,207,14,255,3,25,198,1,41,235,213,0,85,36,214,1,49,92,109,255,200,24,30,254,168,236,195,0,145,39,124,1,236,195,149,0,90,36,184,255,67,85,170,255,38,35,26,254,131,124,68,255,239,155,35,255,54,201,164,0,196,22,117,255,49,15,205,0,24,224,29,1,126,113,144,0,117,21,182,0,203,159,141,0,223,135,77,0,176,230,176,255,190,229,215,255,99,37,181,255,51,21,138,255,25,189,89,255,49,48,165,254,152,45,247,0,170,108,222,0,80,202,5,0,27,69,103,254,204,22,129,255,180,252,62,254,210,1,91,255,146,110,254,255,219,162,28,0,223,252,213,1,59,8,33,0,206,16,244,0,129,211,48,0,107,160,208,0,112,59,209,0,109,77,216,254,34,21,185,255,246,99,56,255,179,139,19,255,185,29,50,255,84,89,19,0,74,250,98,255,225,42,200,255,192,217,205,255,210,16,167,0,99,132,95,1,43,230,57,0,254,11,203,255,99,188,63,255,119,193,251,254,80,105,54,0,232,181,189,1,183,69,112,255,208,171,165,255,47,109,180,255,123,83,165,0,146,162,52,255,154,11,4,255,151,227,90,255,146,137,97,254,61,233,41,255,94,42,55,255,108,164,236,0,152,68,254,0,10,140,131,255,10,106,79,254,243,158,137,0,67,178,66,254,177,123,198,255,15,62,34,0,197,88,42,255,149,95,177,255,152,0,198,255,149,254,113,255,225,90,163,255,125,217,247,0,18,17,224,0,128,66,120,254,192,25,9,255,50,221,205,0,49,212,70,0,233,255,164,0,2,209,9,0,221,52,219,254,172,224,244,255,94,56,206,1,242,179,2,255,31,91,164,1,230,46,138,255,189,230,220,0,57,47,61,255,111,11,157,0,177,91,152,0,28,230,98,0,97,87,126,0,198,89,145,255,167,79,107,0,249,77,160,1,29,233,230,255,150,21,86,254,60,11,193,0,151,37,36,254,185,150,243,255,228,212,83,1,172,151,180,0,201,169,155,0,244,60,234,0,142,235,4,1,67,218,60,0,192,113,75,1,116,243,207,255,65,172,155,0,81,30,156,255,80,72,33,254,18,231,109,255,142,107,21,254,125,26,132,255,176,16,59,255,150,201,58,0,206,169,201,0,208,121,226,0,40,172,14,255,150,61,94,255,56,57,156,255,141,60,145,255,45,108,149,255,238,145,155,255,209,85,31,254,192,12,210,0,99,98,93,254,152,16,151,0,225,185,220,0,141,235,44,255,160,172,21,254,71,26,31,255,13,64,93,254,28,56,198,0,177,62,248,1,182,8,241,0,166,101,148,255,78,81,133,255,129,222,215,1,188,169,129,255,232,7,97,0,49,112,60,255,217,229,251,0,119,108,138,0,39,19,123,254,131,49,235,0,132,84,145,0,130,230,148,255,25,74,187,0,5,245,54,255,185,219,241,1,18,194,228,255,241,202,102,0,105,113,202,0,155,235,79,0,21,9,178,255,156,1,239,0,200,148,61,0,115,247,210,255,49,221,135,0,58,189,8,1,35,46,9,0,81,65,5,255,52,158,185,255,125,116,46,255,74,140,13,255,210,92,172,254,147,23,71,0,217,224,253,254,115,108,180,255,145,58,48,254,219,177,24,255,156,255,60,1,154,147,242,0,253,134,87,0,53,75,229,0,48,195,222,255,31,175,50,255,156,210,120,255,208,35,222,255,18,248,179,1,2,10,101,255,157,194,248,255,158,204,101,255,104,254,197,255,79,62,4,0,178,172,101,1,96,146,251,255,65,10,156,0,2,137,165,255,116,4,231,0,242,215,1,0,19,35,29,255,43,161,79,0,59,149,246,1,251,66,176,0,200,33,3,255,80,110,142,255,195,161,17,1,228,56,66,255,123,47,145,254,132,4,164,0,67,174,172,0,25,253,114,0,87,97,87,1,250,220,84,0,96,91,200,255,37,125,59,0,19,65,118,0,161,52,241,255,237,172,6,255,176,191,255,255,1,65,130,254,223,190,230,0,101,253,231,255,146,35,109,0,250,29,77,1,49,0,19,0,123,90,155,1,22,86,32,255,218,213,65,0,111,93,127,0,60,93,169,255,8,127,182,0,17,186,14,254,253,137,246,255,213,25,48,254,76,238,0,255,248,92,70,255,99,224,139,0,184,9,255,1,7,164,208,0,205,131,198,1,87,214,199,0,130,214,95,0,221,149,222,0,23,38,171,254,197,110,213,0,43,115,140,254,215,177,118,0,96,52,66,1,117,158,237,0,14,64,182,255,46,63,174,255,158,95,190,255,225,205,177,255,43,5,142,255,172,99,212,255,244,187,147,0,29,51,153,255,228,116,24,254,30,101,207,0,19,246,150,255,134,231,5,0,125,134,226,1,77,65,98,0,236,130,33,255,5,110,62,0,69,108,127,255,7,113,22,0,145,20,83,254,194,161,231,255,131,181,60,0,217,209,177,255,229,148,212,254,3,131,184,0,117,177,187,1,28,14,31,255,176,102,80,0,50,84,151,255,125,31,54,255,21,157,133,255,19,179,139,1,224,232,26,0,34,117,170,255,167,252,171,255,73,141,206,254,129,250,35,0,72,79,236,1,220,229,20,255,41,202,173,255,99,76,238,255,198,22,224,255,108,198,195,255,36,141,96,1,236,158,59,255,106,100,87,0,110,226,2,0,227,234,222,0,154,93,119,255,74,112,164,255,67,91,2,255,21,145,33,255,102,214,137,255,175,230,103,254,163,246,166,0,93,247,116,254,167,224,28,255,220,2,57,1,171,206,84,0,123,228,17,255,27,120,119,0,119,11,147,1,180,47,225,255,104,200,185,254,165,2,114,0,77,78,212,0,45,154,177,255,24,196,121,254,82,157,182,0,90,16,190,1,12,147,197,0,95,239,152,255,11,235,71,0,86,146,119,255,172,134,214,0,60,131,196,0,161,225,129,0,31,130,120,254,95,200,51,0,105,231,210,255,58,9,148,255,43,168,221,255,124,237,142,0,198,211,50,254,46,245,103,0,164,248,84,0,152,70,208,255,180,117,177,0,70,79,185,0,243,74,32,0,149,156,207,0,197,196,161,1,245,53,239,0,15,93,246,254,139,240,49,255,196,88,36,255,162,38,123,0,128,200,157,1,174,76,103,255,173,169,34,254,216,1,171,255,114,51,17,0,136,228,194,0,110,150,56,254,106,246,159,0,19,184,79,255,150,77,240,255,155,80,162,0,0,53,169,255,29,151,86,0,68,94,16,0,92,7,110,254,98,117,149,255,249,77,230,255,253,10,140,0,214,124,92,254,35,118,235,0,89,48,57,1,22,53,166,0,184,144,61,255,179,255,194,0,214,248,61,254,59,110,246,0,121,21,81,254,166,3,228,0,106,64,26,255,69,232,134,255,242,220,53,254,46,220,85,0,113,149,247,255,97,179,103,255,190,127,11,0,135,209,182,0,95,52,129,1,170,144,206,255,122,200,204,255,168,100,146,0,60,144,149,254,70,60,40,0,122,52,177,255,246,211,101,255,174,237,8,0,7,51,120,0,19,31,173,0,126,239,156,255,143,189,203,0,196,128,88,255,233,133,226,255,30,125,173,255,201,108,50,0,123,100,59,255,254,163,3,1,221,148,181,255,214,136,57,254,222,180,137,255,207,88,54,255,28,33,251,255,67,214,52,1,210,208,100,0,81,170,94,0,145,40,53,0,224,111,231,254,35,28,244,255,226,199,195,254,238,17,230,0,217,217,164,254,169,157,221,0,218,46,162,1,199,207,163,255,108,115,162,1,14,96,187,255,118,60,76,0,184,159,152,0,209,231,71,254,42,164,186,255,186,153,51,254,221,171,182,255,162,142,173,0,235,47,193,0,7,139,16,1,95,164,64,255,16,221,166,0,219,197,16,0,132,29,44,255,100,69,117,255,60,235,88,254,40,81,173,0,71,190,61,255,187,88,157,0,231,11,23,0,237,117,164,0,225,168,223,255,154,114,116,255,163,152,242,1,24,32,170,0,125,98,113,254,168,19,76,0,17,157,220,254,155,52,5,0,19,111,161,255,71,90,252,255,173,110,240,0,10,198,121,255,253,255,240,255,66,123,210,0,221,194,215,254,121,163,17,255,225,7,99,0,190,49,182,0,115,9,133,1,232,26,138,255,213,68,132,0,44,119,122,255,179,98,51,0,149,90,106,0,71,50,230,255,10,153,118,255,177,70,25,0,165,87,205,0,55,138,234,0,238,30,97,0,113,155,207,0,98,153,127,0,34,107,219,254,117,114,172,255,76,180,255,254,242,57,179,255,221,34,172,254,56,162,49,255,83,3,255,255,113,221,189,255,188,25,228,254,16,88,89,255,71,28,198,254,22,17,149,255,243,121,254,255,107,202,99,255,9,206,14,1,220,47,153,0,107,137,39,1,97,49,194,255,149,51,197,254,186,58,11,255,107,43,232,1,200,6,14,255,181,133,65,254,221,228,171,255,123,62,231,1,227,234,179,255,34,189,212,254,244,187,249,0,190,13,80,1,130,89,1,0,223,133,173,0,9,222,198,255,66,127,74,0,167,216,93,255,155,168,198,1,66,145,0,0,68,102,46,1,172,90,154,0,216,128,75,255,160,40,51,0,158,17,27,1,124,240,49,0,236,202,176,255,151,124,192,255,38,193,190,0,95,182,61,0,163,147,124,255,255,165,51,255,28,40,17,254,215,96,78,0,86,145,218,254,31,36,202,255,86,9,5,0,111,41,200,255,237,108,97,0,57,62,44,0,117,184,15,1,45,241,116,0,152,1,220,255,157,165,188,0,250,15,131,1,60,44,125,255,65,220,251,255,75,50,184,0,53,90,128,255,231,80,194,255,136,129,127,1,21,18,187,255,45,58,161,255,71,147,34,0,174,249,11,254,35,141,29,0,239,68,177,255,115,110,58,0,238,190,177,1,87,245,166,255,190,49,247,255,146,83,184,255,173,14,39,255,146,215,104,0,142,223,120,0,149,200,155,255,212,207,145,1,16,181,217,0,173,32,87,255,255,35,181,0,119,223,161,1,200,223,94,255,70,6,186,255,192,67,85,255,50,169,152,0,144,26,123,255,56,243,179,254,20,68,136,0,39,140,188,254,253,208,5,255,200,115,135,1,43,172,229,255,156,104,187,0,151,251,167,0,52,135,23,0,151,153,72,0,147,197,107,254,148,158,5,255,238,143,206,0,126,153,137,255,88,152,197,254,7,68,167,0,252,159,165,255,239,78,54,255,24,63,55,255,38,222,94,0,237,183,12,255,206,204,210,0,19,39,246,254,30,74,231,0,135,108,29,1,179,115,0,0,117,118,116,1,132,6,252,255,145,129,161,1,105,67,141,0,82,37,226,255,238,226,228,255,204,214,129,254,162,123,100,255,185,121,234,0,45,108,231,0,66,8,56,255,132,136,128,0,172,224,66,254,175,157,188,0,230,223,226,254,242,219,69,0,184,14,119,1,82,162,56,0,114,123,20,0,162,103,85,255,49,239,99,254,156,135,215,0,111,255,167,254,39,196,214,0,144,38,79,1,249,168,125,0,155,97,156,255,23,52,219,255,150,22,144,0,44,149,165,255,40,127,183,0,196,77,233,255,118,129,210,255,170,135,230,255,214,119,198,0,233,240,35,0,253,52,7,255,117,102,48,255,21,204,154,255,179,136,177,255,23,2,3,1,149,130,89,255,252,17,159,1,70,60,26,0,144,107,17,0,180,190,60,255,56,182,59,255,110,71,54,255,198,18,129,255,149,224,87,255,223,21,152,255,138,22,182,255,250,156,205,0,236,45,208,255,79,148,242,1,101,70,209,0,103,78,174,0,101,144,172,255,152,136,237,1,191,194,136,0,113,80,125,1,152,4,141,0,155,150,53,255,196,116,245,0,239,114,73,254,19,82,17,255,124,125,234,255,40,52,191,0,42,210,158,255,155,132,165,0,178,5,42,1,64,92,40,255,36,85,77,255,178,228,118,0,137,66,96,254,115,226,66,0,110,240,69,254,151,111,80,0,167,174,236,255,227,108,107,255,188,242,65,255,183,81,255,0,57,206,181,255,47,34,181,255,213,240,158,1,71,75,95,0,156,40,24,255,102,210,81,0,171,199,228,255,154,34,41,0,227,175,75,0,21,239,195,0,138,229,95,1,76,192,49,0,117,123,87,1,227,225,130,0,125,62,63,255,2,198,171,0,254,36,13,254,145,186,206,0,148,255,244,255,35,0,166,0,30,150,219,1,92,228,212,0,92,198,60,254,62,133,200,255,201,41,59,0,125,238,109,255,180,163,238,1,140,122,82,0,9,22,88,255,197,157,47,255,153,94,57,0,88,30,182,0,84,161,85,0,178,146,124,0,166,166,7,255,21,208,223,0,156,182,242,0,155,121,185,0,83,156,174,254,154,16,118,255,186,83,232,1,223,58,121,255,29,23,88,0,35,125,127,255,170,5,149,254,164,12,130,255,155,196,29,0,161,96,136,0,7,35,29,1,162,37,251,0,3,46,242,255,0,217,188,0,57,174,226,1,206,233,2,0,57,187,136,254,123,189,9,255,201,117,127,255,186,36,204,0,231,25,216,0,80,78,105,0,19,134,129,255,148,203,68,0,141,81,125,254,248,165,200,255,214,144,135,0,151,55,166,255,38,235,91,0,21,46,154,0,223,254,150,255,35,153,180,255,125,176,29,1,43,98,30,255,216,122,230,255,233,160,12,0,57,185,12,254,240,113,7,255,5,9,16,254,26,91,108,0,109,198,203,0,8,147,40,0,129,134,228,255,124,186,40,255,114,98,132,254,166,132,23,0,99,69,44,0,9,242,238,255,184,53,59,0,132,129,102,255,52,32,243,254,147,223,200,255,123,83,179,254,135,144,201,255,141,37,56,1,151,60,227,255,90,73,156,1,203,172,187,0,80,151,47,255,94,137,231,255,36,191,59,255,225,209,181,255,74,215,213,254,6,118,179,255,153,54,193,1,50,0,231,0,104,157,72,1,140,227,154,255,182,226,16,254,96,225,92,255,115,20,170,254,6,250,78,0,248,75,173,255,53,89,6,255,0,180,118,0,72,173,1,0,64,8,206,1,174,133,223,0,185,62,133,255,214,11,98,0,197,31,208,0,171,167,244,255,22,231,181,1,150,218,185,0,247,169,97,1,165,139,247,255,47,120,149,1,103,248,51,0,60,69,28,254,25,179,196,0,124,7,218,254,58,107,81,0,184,233,156,255,252,74,36,0,118,188,67,0,141,95,53,255,222,94,165,254,46,61,53,0,206,59,115,255,47,236,250,255,74,5,32,1,129,154,238,255,106,32,226,0,121,187,61,255,3,166,241,254,67,170,172,255,29,216,178,255,23,201,252,0,253,110,243,0,200,125,57,0,109,192,96,255,52,115,238,0,38,121,243,255,201,56,33,0,194,118,130,0,75,96,25,255,170,30,230,254,39,63,253,0,36,45,250,255,251,1,239,0,160,212,92,1,45,209,237,0,243,33,87,254,237,84,201,255,212,18,157,254,212,99,127,255,217,98,16,254,139,172,239,0,168,201,130,255,143,193,169,255,238,151,193,1,215,104,41,0,239,61,165,254,2,3,242,0,22,203,177,254,177,204,22,0,149,129,213,254,31,11,41,255,0,159,121,254,160,25,114,255,162,80,200,0,157,151,11,0,154,134,78,1,216,54,252,0,48,103,133,0,105,220,197,0,253,168,77,254,53,179,23,0,24,121,240,1,255,46,96,255,107,60,135,254,98,205,249,255,63,249,119,255,120,59,211,255,114,180,55,254,91,85,237,0,149,212,77,1,56,73,49,0,86,198,150,0,93,209,160,0,69,205,182,255,244,90,43,0,20,36,176,0,122,116,221,0,51,167,39,1,231,1,63,255,13,197,134,0,3,209,34,255,135,59,202,0,167,100,78,0,47,223,76,0,185,60,62,0,178,166,123,1,132,12,161,255,61,174,43,0,195,69,144,0,127,47,191,1,34,44,78,0,57,234,52,1,255,22,40,255,246,94,146,0,83,228,128,0,60,78,224,255,0,96,210,255,153,175,236,0,159,21,73,0,180,115,196,254,131,225,106,0,255,167,134,0,159,8,112,255,120,68,194,255,176,196,198,255,118,48,168,255,93,169,1,0,112,200,102,1,74,24,254,0,19,141,4,254,142,62,63,0,131,179,187,255,77,156,155,255,119,86,164,0,170,208,146,255,208,133,154,255,148,155,58,255,162,120,232,254,252,213,155,0,241,13,42,0,94,50,131,0,179,170,112,0,140,83,151,255,55,119,84,1,140,35,239,255,153,45,67,1,236,175,39,0,54,151,103,255,158,42,65,255,196,239,135,254,86,53,203,0,149,97,47,254,216,35,17,255,70,3,70,1,103,36,90,255,40,26,173,0,184,48,13,0,163,219,217,255,81,6,1,255,221,170,108,254,233,208,93,0,100,201,249,254,86,36,35,255,209,154,30,1,227,201,251,255,2,189,167,254,100,57,3,0,13,128,41,0,197,100,75,0,150,204,235,255,145,174,59,0,120,248,149,255,85,55,225,0,114,210,53,254,199,204,119,0,14,247,74,1,63,251,129,0,67,104,151,1,135,130,80,0,79,89,55,255,117,230,157,255,25,96,143,0,213,145,5,0,69,241,120,1,149,243,95,255,114,42,20,0,131,72,2,0,154,53,20,255,73,62,109,0,196,102,152,0,41,12,204,255,122,38,11,1,250,10,145,0,207,125,148,0,246,244,222,255,41,32,85,1,112,213,126,0,162,249,86,1,71,198,127,255,81,9,21,1,98,39,4,255,204,71,45,1,75,111,137,0,234,59,231,0,32,48,95,255,204,31,114,1,29,196,181,255,51,241,167,254,93,109,142,0,104,144,45,0,235,12,181,255,52,112,164,0,76,254,202,255,174,14,162,0,61,235,147,255,43,64,185,254,233,125,217,0,243,88,167,254,74,49,8,0,156,204,66,0,124,214,123,0,38,221,118,1,146,112,236,0,114,98,177,0,151,89,199,0,87,197,112,0,185,149,161,0,44,96,165,0,248,179,20,255,188,219,216,254,40,62,13,0,243,142,141,0,229,227,206,255,172,202,35,255,117,176,225,255,82,110,38,1,42,245,14,255,20,83,97,0,49,171,10,0,242,119,120,0,25,232,61,0,212,240,147,255,4,115,56,255,145,17,239,254,202,17,251,255,249,18,245,255,99,117,239,0,184,4,179,255,246,237,51,255,37,239,137,255,166,112,166,255,81,188,33,255,185,250,142,255,54,187,173,0,208,112,201,0,246,43,228,1,104,184,88,255,212,52,196,255,51,117,108,255,254,117,155,0,46,91,15,255,87,14,144,255,87,227,204,0,83,26,83,1,159,76,227,0,159,27,213,1,24,151,108,0,117,144,179,254,137,209,82,0,38,159,10,0,115,133,201,0,223,182,156,1,110,196,93,255,57,60,233,0,5,167,105,255,154,197,164,0,96,34,186,255,147,133,37,1,220,99,190,0,1,167,84,255,20,145,171,0,194,197,251,254,95,78,133,255,252,248,243,255,225,93,131,255,187,134,196,255,216,153,170,0,20,118,158,254,140,1,118,0,86,158,15,1,45,211,41,255,147,1,100,254,113,116,76,255,211,127,108,1,103,15,48,0,193,16,102,1,69,51,95,255,107,128,157,0,137,171,233,0,90,124,144,1,106,161,182,0,175,76,236,1,200,141,172,255,163,58,104,0,233,180,52,255,240,253,14,255,162,113,254,255,38,239,138,254,52,46,166,0,241,101,33,254,131,186,156,0,111,208,62,255,124,94,160,255,31,172,254,0,112,174,56,255,188,99,27,255,67,138,251,0,125,58,128,1,156,152,174,255,178,12,247,255,252,84,158,0,82,197,14,254,172,200,83,255,37,39,46,1,106,207,167,0,24,189,34,0,131,178,144,0,206,213,4,0,161,226,210,0,72,51,105,255,97,45,187,255,78,184,223,255,176,29,251,0,79,160,86,255,116,37,178,0,82,77,213,1,82,84,141,255,226,101,212,1,175,88,199,255,245,94,247,1,172,118,109,255,166,185,190,0,131,181,120,0,87,254,93,255,134,240,73,255,32,245,143,255,139,162,103,255,179,98,18,254,217,204,112,0,147,223,120,255,53,10,243,0,166,140,150,0,125,80,200,255,14,109,219,255,91,218,1,255,252,252,47,254,109,156,116,255,115,49,127,1,204,87,211,255,148,202,217,255,26,85,249,255,14,245,134,1,76,89,169,255,242,45,230,0,59,98,172,255,114,73,132,254,78,155,49,255,158,126,84,0,49,175,43,255,16,182,84,255,157,103,35,0,104,193,109,255,67,221,154,0,201,172,1,254,8,162,88,0,165,1,29,255,125,155,229,255,30,154,220,1,103,239,92,0,220,1,109,255,202,198,1,0,94,2,142,1,36,54,44,0,235,226,158,255,170,251,214,255,185,77,9,0,97,74,242,0,219,163,149,255,240,35,118,255,223,114,88,254,192,199,3,0,106,37,24,255,201,161,118,255,97,89,99,1,224,58,103,255,101,199,147,254,222,60,99,0,234,25,59,1,52,135,27,0,102,3,91,254,168,216,235,0,229,232,136,0,104,60,129,0,46,168,238,0,39,191,67,0,75,163,47,0,143,97,98,255,56,216,168,1,168,233,252,255,35,111,22,255,92,84,43,0,26,200,87,1,91,253,152,0,202,56,70,0,142,8,77,0,80,10,175,1,252,199,76,0,22,110,82,255,129,1,194,0,11,128,61,1,87,14,145,255,253,222,190,1,15,72,174,0,85,163,86,254,58,99,44,255,45,24,188,254,26,205,15,0,19,229,210,254,248,67,195,0,99,71,184,0,154,199,37,255,151,243,121,255,38,51,75,255,201,85,130,254,44,65,250,0,57,147,243,254,146,43,59,255,89,28,53,0,33,84,24,255,179,51,18,254,189,70,83,0,11,156,179,1,98,134,119,0,158,111,111,0,119,154,73,255,200,63,140,254,45,13,13,255,154,192,2,254,81,72,42,0,46,160,185,254,44,112,6,0,146,215,149,1,26,176,104,0,68,28,87,1,236,50,153,255,179,128,250,254,206,193,191,255,166,92,137,254,53,40,239,0,210,1,204,254,168,173,35,0,141,243,45,1,36,50,109,255,15,242,194,255,227,159,122,255,176,175,202,254,70,57,72,0,40,223,56,0,208,162,58,255,183,98,93,0,15,111,12,0,30,8,76,255,132,127,246,255,45,242,103,0,69,181,15,255,10,209,30,0,3,179,121,0,241,232,218,1,123,199,88,255,2,210,202,1,188,130,81,255,94,101,208,1,103,36,45],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE+10240);allocate([76,193,24,1,95,26,241,255,165,162,187,0,36,114,140,0,202,66,5,255,37,56,147,0,152,11,243,1,127,85,232,255,250,135,212,1,185,177,113,0,90,220,75,255,69,248,146,0,50,111,50,0,92,22,80,0,244,36,115,254,163,100,82,255,25,193,6,1,127,61,36,0,253,67,30,254,65,236,170,255,161,17,215,254,63,175,140,0,55,127,4,0,79,112,233,0,109,160,40,0,143,83,7,255,65,26,238,255,217,169,140,255,78,94,189,255,0,147,190,255,147,71,186,254,106,77,127,255,233,157,233,1,135,87,237,255,208,13,236,1,155,109,36,255,180,100,218,0,180,163,18,0,190,110,9,1,17,63,123,255,179,136,180,255,165,123,123,255,144,188,81,254,71,240,108,255,25,112,11,255,227,218,51,255,167,50,234,255,114,79,108,255,31,19,115,255,183,240,99,0,227,87,143,255,72,217,248,255,102,169,95,1,129,149,149,0,238,133,12,1,227,204,35,0,208,115,26,1,102,8,234,0,112,88,143,1,144,249,14,0,240,158,172,254,100,112,119,0,194,141,153,254,40,56,83,255,121,176,46,0,42,53,76,255,158,191,154,0,91,209,92,0,173,13,16,1,5,72,226,255,204,254,149,0,80,184,207,0,100,9,122,254,118,101,171,255,252,203,0,254,160,207,54,0,56,72,249,1,56,140,13,255,10,64,107,254,91,101,52,255,225,181,248,1,139,255,132,0,230,145,17,0,233,56,23,0,119,1,241,255,213,169,151,255,99,99,9,254,185,15,191,255,173,103,109,1,174,13,251,255,178,88,7,254,27,59,68,255,10,33,2,255,248,97,59,0,26,30,146,1,176,147,10,0,95,121,207,1,188,88,24,0,185,94,254,254,115,55,201,0,24,50,70,0,120,53,6,0,142,66,146,0,228,226,249,255,104,192,222,1,173,68,219,0,162,184,36,255,143,102,137,255,157,11,23,0,125,45,98,0,235,93,225,254,56,112,160,255,70,116,243,1,153,249,55,255,129,39,17,1,241,80,244,0,87,69,21,1,94,228,73,255,78,66,65,255,194,227,231,0,61,146,87,255,173,155,23,255,112,116,219,254,216,38,11,255,131,186,133,0,94,212,187,0,100,47,91,0,204,254,175,255,222,18,215,254,173,68,108,255,227,228,79,255,38,221,213,0,163,227,150,254,31,190,18,0,160,179,11,1,10,90,94,255,220,174,88,0,163,211,229,255,199,136,52,0,130,95,221,255,140,188,231,254,139,113,128,255,117,171,236,254,49,220,20,255,59,20,171,255,228,109,188,0,20,225,32,254,195,16,174,0,227,254,136,1,135,39,105,0,150,77,206,255,210,238,226,0,55,212,132,254,239,57,124,0,170,194,93,255,249,16,247,255,24,151,62,255,10,151,10,0,79,139,178,255,120,242,202,0,26,219,213,0,62,125,35,255,144,2,108,255,230,33,83,255,81,45,216,1,224,62,17,0,214,217,125,0,98,153,153,255,179,176,106,254,131,93,138,255,109,62,36,255,178,121,32,255,120,252,70,0,220,248,37,0,204,88,103,1,128,220,251,255,236,227,7,1,106,49,198,255,60,56,107,0,99,114,238,0,220,204,94,1,73,187,1,0,89,154,34,0,78,217,165,255,14,195,249,255,9,230,253,255,205,135,245,0,26,252,7,255,84,205,27,1,134,2,112,0,37,158,32,0,231,91,237,255,191,170,204,255,152,7,222,0,109,192,49,0,193,166,146,255,232,19,181,255,105,142,52,255,103,16,27,1,253,200,165,0,195,217,4,255,52,189,144,255,123,155,160,254,87,130,54,255,78,120,61,255,14,56,41,0,25,41,125,255,87,168,245,0,214,165,70,0,212,169,6,255,219,211,194,254,72,93,164,255,197,33,103,255,43,142,141,0,131,225,172,0,244,105,28,0,68,68,225,0,136,84,13,255,130,57,40,254,139,77,56,0,84,150,53,0,54,95,157,0,144,13,177,254,95,115,186,0,117,23,118,255,244,166,241,255,11,186,135,0,178,106,203,255,97,218,93,0,43,253,45,0,164,152,4,0,139,118,239,0,96,1,24,254,235,153,211,255,168,110,20,255,50,239,176,0,114,41,232,0,193,250,53,0,254,160,111,254,136,122,41,255,97,108,67,0,215,152,23,255,140,209,212,0,42,189,163,0,202,42,50,255,106,106,189,255,190,68,217,255,233,58,117,0,229,220,243,1,197,3,4,0,37,120,54,254,4,156,134,255,36,61,171,254,165,136,100,255,212,232,14,0,90,174,10,0,216,198,65,255,12,3,64,0,116,113,115,255,248,103,8,0,231,125,18,255,160,28,197,0,30,184,35,1,223,73,249,255,123,20,46,254,135,56,37,255,173,13,229,1,119,161,34,255,245,61,73,0,205,125,112,0,137,104,134,0,217,246,30,255,237,142,143,0,65,159,102,255,108,164,190,0,219,117,173,255,34,37,120,254,200,69,80,0,31,124,218,254,74,27,160,255,186,154,199,255,71,199,252,0,104,81,159,1,17,200,39,0,211,61,192,1,26,238,91,0,148,217,12,0,59,91,213,255,11,81,183,255,129,230,122,255,114,203,145,1,119,180,66,255,72,138,180,0,224,149,106,0,119,82,104,255,208,140,43,0,98,9,182,255,205,101,134,255,18,101,38,0,95,197,166,255,203,241,147,0,62,208,145,255,133,246,251,0,2,169,14,0,13,247,184,0,142,7,254,0,36,200,23,255,88,205,223,0,91,129,52,255,21,186,30,0,143,228,210,1,247,234,248,255,230,69,31,254,176,186,135,255,238,205,52,1,139,79,43,0,17,176,217,254,32,243,67,0,242,111,233,0,44,35,9,255,227,114,81,1,4,71,12,255,38,105,191,0,7,117,50,255,81,79,16,0,63,68,65,255,157,36,110,255,77,241,3,255,226,45,251,1,142,25,206,0,120,123,209,1,28,254,238,255,5,128,126,255,91,222,215,255,162,15,191,0,86,240,73,0,135,185,81,254,44,241,163,0,212,219,210,255,112,162,155,0,207,101,118,0,168,72,56,255,196,5,52,0,72,172,242,255,126,22,157,255,146,96,59,255,162,121,152,254,140,16,95,0,195,254,200,254,82,150,162,0,119,43,145,254,204,172,78,255,166,224,159,0,104,19,237,255,245,126,208,255,226,59,213,0,117,217,197,0,152,72,237,0,220,31,23,254,14,90,231,255,188,212,64,1,60,101,246,255,85,24,86,0,1,177,109,0,146,83,32,1,75,182,192,0,119,241,224,0,185,237,27,255,184,101,82,1,235,37,77,255,253,134,19,0,232,246,122,0,60,106,179,0,195,11,12,0,109,66,235,1,125,113,59,0,61,40,164,0,175,104,240,0,2,47,187,255,50,12,141,0,194,139,181,255,135,250,104,0,97,92,222,255,217,149,201,255,203,241,118,255,79,151,67,0,122,142,218,255,149,245,239,0,138,42,200,254,80,37,97,255,124,112,167,255,36,138,87,255,130,29,147,255,241,87,78,255,204,97,19,1,177,209,22,255,247,227,127,254,99,119,83,255,212,25,198,1,16,179,179,0,145,77,172,254,89,153,14,255,218,189,167,0,107,233,59,255,35,33,243,254,44,112,112,255,161,127,79,1,204,175,10,0,40,21,138,254,104,116,228,0,199,95,137,255,133,190,168,255,146,165,234,1,183,99,39,0,183,220,54,254,255,222,133,0,162,219,121,254,63,239,6,0,225,102,54,255,251,18,246,0,4,34,129,1,135,36,131,0,206,50,59,1,15,97,183,0,171,216,135,255,101,152,43,255,150,251,91,0,38,145,95,0,34,204,38,254,178,140,83,255,25,129,243,255,76,144,37,0,106,36,26,254,118,144,172,255,68,186,229,255,107,161,213,255,46,163,68,255,149,170,253,0,187,17,15,0,218,160,165,255,171,35,246,1,96,13,19,0,165,203,117,0,214,107,192,255,244,123,177,1,100,3,104,0,178,242,97,255,251,76,130,255,211,77,42,1,250,79,70,255,63,244,80,1,105,101,246,0,61,136,58,1,238,91,213,0,14,59,98,255,167,84,77,0,17,132,46,254,57,175,197,255,185,62,184,0,76,64,207,0,172,175,208,254,175,74,37,0,138,27,211,254,148,125,194,0,10,89,81,0,168,203,101,255,43,213,209,1,235,245,54,0,30,35,226,255,9,126,70,0,226,125,94,254,156,117,20,255,57,248,112,1,230,48,64,255,164,92,166,1,224,214,230,255,36,120,143,0,55,8,43,255,251,1,245,1,106,98,165,0,74,107,106,254,53,4,54,255,90,178,150,1,3,120,123,255,244,5,89,1,114,250,61,255,254,153,82,1,77,15,17,0,57,238,90,1,95,223,230,0,236,52,47,254,103,148,164,255,121,207,36,1,18,16,185,255,75,20,74,0,187,11,101,0,46,48,129,255,22,239,210,255,77,236,129,255,111,77,204,255,61,72,97,255,199,217,251,255,42,215,204,0,133,145,201,255,57,230,146,1,235,100,198,0,146,73,35,254,108,198,20,255,182,79,210,255,82,103,136,0,246,108,176,0,34,17,60,255,19,74,114,254,168,170,78,255,157,239,20,255,149,41,168,0,58,121,28,0,79,179,134,255,231,121,135,255,174,209,98,255,243,122,190,0,171,166,205,0,212,116,48,0,29,108,66,255,162,222,182,1,14,119,21,0,213,39,249,255,254,223,228,255,183,165,198,0,133,190,48,0,124,208,109,255,119,175,85,255,9,209,121,1,48,171,189,255,195,71,134,1,136,219,51,255,182,91,141,254,49,159,72,0,35,118,245,255,112,186,227,255,59,137,31,0,137,44,163,0,114,103,60,254,8,213,150,0,162,10,113,255,194,104,72,0,220,131,116,255,178,79,92,0,203,250,213,254,93,193,189,255,130,255,34,254,212,188,151,0,136,17,20,255,20,101,83,255,212,206,166,0,229,238,73,255,151,74,3,255,168,87,215,0,155,188,133,255,166,129,73,0,240,79,133,255,178,211,81,255,203,72,163,254,193,168,165,0,14,164,199,254,30,255,204,0,65,72,91,1,166,74,102,255,200,42,0,255,194,113,227,255,66,23,208,0,229,216,100,255,24,239,26,0,10,233,62,255,123,10,178,1,26,36,174,255,119,219,199,1,45,163,190,0,16,168,42,0,166,57,198,255,28,26,26,0,126,165,231,0,251,108,100,255,61,229,121,255,58,118,138,0,76,207,17,0,13,34,112,254,89,16,168,0,37,208,105,255,35,201,215,255,40,106,101,254,6,239,114,0,40,103,226,254,246,127,110,255,63,167,58,0,132,240,142,0,5,158,88,255,129,73,158,255,94,89,146,0,230,54,146,0,8,45,173,0,79,169,1,0,115,186,247,0,84,64,131,0,67,224,253,255,207,189,64,0,154,28,81,1,45,184,54,255,87,212,224,255,0,96,73,255,129,33,235,1,52,66,80,255,251,174,155,255,4,179,37,0,234,164,93,254,93,175,253,0,198,69,87,255,224,106,46,0,99,29,210,0,62,188,114,255,44,234,8,0,169,175,247,255,23,109,137,255,229,182,39,0,192,165,94,254,245,101,217,0,191,88,96,0,196,94,99,255,106,238,11,254,53,126,243,0,94,1,101,255,46,147,2,0,201,124,124,255,141,12,218,0,13,166,157,1,48,251,237,255,155,250,124,255,106,148,146,255,182,13,202,0,28,61,167,0,217,152,8,254,220,130,45,255,200,230,255,1,55,65,87,255,93,191,97,254,114,251,14,0,32,105,92,1,26,207,141,0,24,207,13,254,21,50,48,255,186,148,116,255,211,43,225,0,37,34,162,254,164,210,42,255,68,23,96,255,182,214,8,255,245,117,137,255,66,195,50,0,75,12,83,254,80,140,164,0,9,165,36,1,228,110,227,0,241,17,90,1,25,52,212,0,6,223,12,255,139,243,57,0,12,113,75,1,246,183,191,255,213,191,69,255,230,15,142,0,1,195,196,255,138,171,47,255,64,63,106,1,16,169,214,255,207,174,56,1,88,73,133,255,182,133,140,0,177,14,25,255,147,184,53,255,10,227,161,255,120,216,244,255,73,77,233,0,157,238,139,1,59,65,233,0,70,251,216,1,41,184,153,255,32,203,112,0,146,147,253,0,87,101,109,1,44,82,133,255,244,150,53,255,94,152,232,255,59,93,39,255,88,147,220,255,78,81,13,1,32,47,252,255,160,19,114,255,93,107,39,255,118,16,211,1,185,119,209,255,227,219,127,254,88,105,236,255,162,110,23,255,36,166,110,255,91,236,221,255,66,234,116,0,111,19,244,254,10,233,26,0,32,183,6,254,2,191,242,0,218,156,53,254,41,60,70,255,168,236,111,0,121,185,126,255,238,142,207,255,55,126,52,0,220,129,208,254,80,204,164,255,67,23,144,254,218,40,108,255,127,202,164,0,203,33,3,255,2,158,0,0,37,96,188,255,192,49,74,0,109,4,0,0,111,167,10,254,91,218,135,255,203,66,173,255,150,194,226,0,201,253,6,255,174,102,121,0,205,191,110,0,53,194,4,0,81,40,45,254,35,102,143,255,12,108,198,255,16,27,232,255,252,71,186,1,176,110,114,0,142,3,117,1,113,77,142,0,19,156,197,1,92,47,252,0,53,232,22,1,54,18,235,0,46,35,189,255,236,212,129,0,2,96,208,254,200,238,199,255,59,175,164,255,146,43,231,0,194,217,52,255,3,223,12,0,138,54,178,254,85,235,207,0,232,207,34,0,49,52,50,255,166,113,89,255,10,45,216,255,62,173,28,0,111,165,246,0,118,115,91,255,128,84,60,0,167,144,203,0,87,13,243,0,22,30,228,1,177,113,146,255,129,170,230,254,252,153,129,255,145,225,43,0,70,231,5,255,122,105,126,254,86,246,148,255,110,37,154,254,209,3,91,0,68,145,62,0,228,16,165,255,55,221,249,254,178,210,91,0,83,146,226,254,69,146,186,0,93,210,104,254,16,25,173,0,231,186,38,0,189,122,140,255,251,13,112,255,105,110,93,0,251,72,170,0,192,23,223,255,24,3,202,1,225,93,228,0,153,147,199,254,109,170,22,0,248,101,246,255,178,124,12,255,178,254,102,254,55,4,65,0,125,214,180,0,183,96,147,0,45,117,23,254,132,191,249,0,143,176,203,254,136,183,54,255,146,234,177,0,146,101,86,255,44,123,143,1,33,209,152,0,192,90,41,254,83,15,125,255,213,172,82,0,215,169,144,0,16,13,34,0,32,209,100,255,84,18,249,1,197,17,236,255,217,186,230,0,49,160,176,255,111,118,97,255,237,104,235,0,79,59,92,254,69,249,11,255,35,172,74,1,19,118,68,0,222,124,165,255,180,66,35,255,86,174,246,0,43,74,111,255,126,144,86,255,228,234,91,0,242,213,24,254,69,44,235,255,220,180,35,0,8,248,7,255,102,47,92,255,240,205,102,255,113,230,171,1,31,185,201,255,194,246,70,255,122,17,187,0,134,70,199,255,149,3,150,255,117,63,103,0,65,104,123,255,212,54,19,1,6,141,88,0,83,134,243,255,136,53,103,0,169,27,180,0,177,49,24,0,111,54,167,0,195,61,215,255,31,1,108,1,60,42,70,0,185,3,162,255,194,149,40,255,246,127,38,254,190,119,38,255,61,119,8,1,96,161,219,255,42,203,221,1,177,242,164,255,245,159,10,0,116,196,0,0,5,93,205,254,128,127,179,0,125,237,246,255,149,162,217,255,87,37,20,254,140,238,192,0,9,9,193,0,97,1,226,0,29,38,10,0,0,136,63,255,229,72,210,254,38,134,92,255,78,218,208,1,104,36,84,255,12,5,193,255,242,175,61,255,191,169,46,1,179,147,147,255,113,190,139,254,125,172,31,0,3,75,252,254,215,36,15,0,193,27,24,1,255,69,149,255,110,129,118,0,203,93,249,0,138,137,64,254,38,70,6,0,153,116,222,0,161,74,123,0,193,99,79,255,118,59,94,255,61,12,43,1,146,177,157,0,46,147,191,0,16,255,38,0,11,51,31,1,60,58,98,255,111,194,77,1,154,91,244,0,140,40,144,1,173,10,251,0,203,209,50,254,108,130,78,0,228,180,90,0,174,7,250,0,31,174,60,0,41,171,30,0,116,99,82,255,118,193,139,255,187,173,198,254,218,111,56,0,185,123,216,0,249,158,52,0,52,180,93,255,201,9,91,255,56,45,166,254,132,155,203,255,58,232,110,0,52,211,89,255,253,0,162,1,9,87,183,0,145,136,44,1,94,122,245,0,85,188,171,1,147,92,198,0,0,8,104,0,30,95,174,0,221,230,52,1,247,247,235,255,137,174,53,255,35,21,204,255,71,227,214,1,232,82,194,0,11,48,227,255,170,73,184,255,198,251,252,254,44,112,34,0,131,101,131,255,72,168,187,0,132,135,125,255,138,104,97,255,238,184,168,255,243,104,84,255,135,216,226,255,139,144,237,0,188,137,150,1,80,56,140,255,86,169,167,255,194,78,25,255,220,17,180,255,17,13,193,0,117,137,212,255,141,224,151,0,49,244,175,0,193,99,175,255,19,99,154,1,255,65,62,255,156,210,55,255,242,244,3,255,250,14,149,0,158,88,217,255,157,207,134,254,251,232,28,0,46,156,251,255,171,56,184,255,239,51,234,0,142,138,131,255,25,254,243,1,10,201,194,0,63,97,75,0,210,239,162,0,192,200,31,1,117,214,243,0,24,71,222,254,54,40,232,255,76,183,111,254,144,14,87,255,214,79,136,255,216,196,212,0,132,27,140,254,131,5,253,0,124,108,19,255,28,215,75,0,76,222,55,254,233,182,63,0,68,171,191,254,52,111,222,255,10,105,77,255,80,170,235,0,143,24,88,255,45,231,121,0,148,129,224,1,61,246,84,0,253,46,219,255,239,76,33,0,49,148,18,254,230,37,69,0,67,134,22,254,142,155,94,0,31,157,211,254,213,42,30,255,4,228,247,254,252,176,13,255,39,0,31,254,241,244,255,255,170,45,10,254,253,222,249,0,222,114,132,0,255,47,6,255,180,163,179,1,84,94,151,255,89,209,82,254,229,52,169,255,213,236,0,1,214,56,228,255,135,119,151,255,112,201,193,0,83,160,53,254,6,151,66,0,18,162,17,0,233,97,91,0,131,5,78,1,181,120,53,255,117,95,63,255,237,117,185,0,191,126,136,255,144,119,233,0,183,57,97,1,47,201,187,255,167,165,119,1,45,100,126,0,21,98,6,254,145,150,95,255,120,54,152,0,209,98,104,0,143,111,30,254,184,148,249,0,235,216,46,0,248,202,148,255,57,95,22,0,242,225,163,0,233,247,232,255,71,171,19,255,103,244,49,255,84,103,93,255,68,121,244,1,82,224,13,0,41,79,43,255,249,206,167,255,215,52,21,254,192,32,22,255,247,111,60,0,101,74,38,255,22,91,84,254,29,28,13,255,198,231,215,254,244,154,200,0,223,137,237,0,211,132,14,0,95,64,206,255,17,62,247,255,233,131,121,1,93,23,77,0,205,204,52,254,81,189,136,0,180,219,138,1,143,18,94,0,204,43,140,254,188,175,219,0,111,98,143,255,151,63,162,255,211,50,71,254,19,146,53,0,146,45,83,254,178,82,238,255,16,133,84,255,226,198,93,255,201,97,20,255,120,118,35,255,114,50,231,255,162,229,156,255,211,26,12,0,114,39,115,255,206,212,134,0,197,217,160,255,116,129,94,254,199,215,219,255,75,223,249,1,253,116,181,255,232,215,104,255,228,130,246,255,185,117,86,0,14,5,8,0,239,29,61,1,237,87,133,255,125,146,137,254,204,168,223,0,46,168,245,0,154,105,22,0,220,212,161,255,107,69,24,255,137,218,181,255,241,84,198,255,130,122,211,255,141,8,153,255,190,177,118,0,96,89,178,0,255,16,48,254,122,96,105,255,117,54,232,255,34,126,105,255,204,67,166,0,232,52,138,255,211,147,12,0,25,54,7,0,44,15,215,254,51,236,45,0,190,68,129,1,106,147,225,0,28,93,45,254,236,141,15,255,17,61,161,0,220,115,192,0,236,145,24,254,111,168,169,0,224,58,63,255,127,164,188,0,82,234,75,1,224,158,134,0,209,68,110,1,217,166,217,0,70,225,166,1,187,193,143,255,16,7,88,255,10,205,140,0,117,192,156,1,17,56,38,0,27,124,108,1,171,215,55,255,95,253,212,0,155,135,168,255,246,178,153,254,154,68,74,0,232,61,96,254,105,132,59,0,33,76,199,1,189,176,130,255,9,104,25,254,75,198,102,255,233,1,112,0,108,220,20,255,114,230,70,0,140,194,133,255,57,158,164,254,146,6,80,255,169,196,97,1,85,183,130,0,70,158,222,1,59,237,234,255,96,25,26,255,232,175,97,255,11,121,248,254,88,35,194,0,219,180,252,254,74,8,227,0,195,227,73,1,184,110,161,255,49,233,164,1,128,53,47,0,82,14,121,255,193,190,58,0,48,174,117,255,132,23,32,0,40,10,134,1,22,51,25,255,240,11,176,255,110,57,146,0,117,143,239,1,157,101,118,255,54,84,76,0,205,184,18,255,47,4,72,255,78,112,85,255,193,50,66,1,93,16,52,255,8,105,134,0,12,109,72,255,58,156,251,0,144,35,204,0,44,160,117,254,50,107,194,0,1,68,165,255,111,110,162,0,158,83,40,254,76,214,234,0,58,216,205,255,171,96,147,255,40,227,114,1,176,227,241,0,70,249,183,1,136,84,139,255,60,122,247,254,143,9,117,255,177,174,137,254,73,247,143,0,236,185,126,255,62,25,247,255,45,64,56,255,161,244,6,0,34,57,56,1,105,202,83,0,128,147,208,0,6,103,10,255,74,138,65,255,97,80,100,255,214,174,33,255,50,134,74,255,110,151,130,254,111,84,172,0,84,199,75,254,248,59,112,255,8,216,178,1,9,183,95,0,238,27,8,254,170,205,220,0,195,229,135,0,98,76,237,255,226,91,26,1,82,219,39,255,225,190,199,1,217,200,121,255,81,179,8,255,140,65,206,0,178,207,87,254,250,252,46,255,104,89,110,1,253,189,158,255,144,214,158,255,160,245,54,255,53,183,92,1,21,200,194,255,146,33,113,1,209,1,255,0,235,106,43,255,167,52,232,0,157,229,221,0,51,30,25,0,250,221,27,1,65,147,87,255,79,123,196,0,65,196,223,255,76,44,17,1,85,241,68,0,202,183,249,255,65,212,212,255,9,33,154,1,71,59,80,0,175,194,59,255,141,72,9,0,100,160,244,0,230,208,56,0,59,25,75,254,80,194,194,0,18,3,200,254,160,159,115,0,132,143,247,1,111,93,57,255,58,237,11,1,134,222,135,255,122,163,108,1,123,43,190,255,251,189,206,254,80,182,72,255,208,246,224,1,17,60,9,0,161,207,38,0,141,109,91,0,216,15,211,255,136,78,110,0,98,163,104,255,21,80,121,255,173,178,183,1,127,143,4,0,104,60,82,254,214,16,13,255,96,238,33,1,158,148,230,255,127,129,62,255,51,255,210,255,62,141,236,254,157,55,224,255,114,39,244,0,192,188,250,255,228,76,53,0,98,84,81,255,173,203,61,254,147,50,55,255,204,235,191,0,52,197,244,0,88,43,211,254,27,191,119,0,188,231,154,0,66,81,161,0,92,193,160,1,250,227,120,0,123,55,226,0,184,17,72,0,133,168,10,254,22,135,156,255,41,25,103,255,48,202,58,0,186,149,81,255,188,134,239,0,235,181,189,254,217,139,188,255,74,48,82,0,46,218,229,0,189,253,251,0,50,229,12,255,211,141,191,1,128,244,25,255,169,231,122,254,86,47,189,255,132,183,23,255,37,178,150,255,51,137,253,0,200,78,31,0,22,105,50,0,130,60,0,0,132,163,91,254,23,231,187,0,192,79,239,0,157,102,164,255,192,82,20,1,24,181,103,255,240,9,234,0,1,123,164,255,133,233,0,255,202,242,242,0,60,186,245,0,241,16,199,255,224,116,158,254,191,125,91,255,224,86,207,0,121,37,231,255,227,9,198,255,15,153,239,255,121,232,217,254,75,112,82,0,95,12,57,254,51,214,105,255,148,220,97,1,199,98,36,0,156,209,12,254,10,212,52,0,217,180,55,254,212,170,232,255,216,20,84,255,157,250,135,0,157,99,127,254,1,206,41,0,149,36,70,1,54,196,201,255,87,116,0,254,235,171,150,0,27,163,234,0,202,135,180,0,208,95,0,254,123,156,93,0,183,62,75,0,137,235,182,0,204,225,255,255,214,139,210,255,2,115,8,255,29,12,111,0,52,156,1,0,253,21,251,255,37,165,31,254,12,130,211,0,106,18,53,254,42,99,154,0,14,217,61,254,216,11,92,255,200,197,112,254,147,38,199,0,36,252,120,254,107,169,77,0,1,123,159,255,207,75,102,0,163,175,196,0,44,1,240,0,120,186,176,254,13,98,76,255,237,124,241,255,232,146,188,255,200,96,224,0,204,31,41,0,208,200,13,0,21,225,96,255,175,156,196,0,247,208,126,0,62,184,244,254,2,171,81,0,85,115,158,0,54,64,45,255,19,138,114,0,135,71,205,0,227,47,147,1,218,231,66,0,253,209,28,0,244,15,173,255,6,15,118,254,16,150,208,255,185,22,50,255,86,112,207,255,75,113,215,1,63,146,43,255,4,225,19,254,227,23,62,255,14,255,214,254,45,8,205,255,87,197,151,254,210,82,215,255,245,248,247,255,128,248,70,0,225,247,87,0,90,120,70,0,213,245,92,0,13,133,226,0,47,181,5,1,92,163,105,255,6,30,133,254,232,178,61,255,230,149,24,255,18,49,158,0,228,100,61,254,116,243,251,255,77,75,92,1,81,219,147,255,76,163,254,254,141,213,246,0,232,37,152,254,97,44,100,0,201,37,50,1,212,244,57,0,174,171,183,255,249,74,112,0,166,156,30,0,222,221,97,255,243,93,73,254,251,101,100,255,216,217,93,255,254,138,187,255,142,190,52,255,59,203,177,255,200,94,52,0,115,114,158,255,165,152,104,1,126,99,226,255,118,157,244,1,107,200,16,0,193,90,229,0,121,6,88,0,156,32,93,254,125,241,211,255,14,237,157,255,165,154,21,255,184,224,22,255,250,24,152,255,113,77,31,0,247,171,23,255,237,177,204,255,52,137,145,255,194,182,114,0,224,234,149,0,10,111,103,1,201,129,4,0,238,142,78,0,52,6,40,255,110,213,165,254,60,207,253,0,62,215,69,0,96,97,0,255,49,45,202,0,120,121,22,255,235,139,48,1,198,45,34,255,182,50,27,1,131,210,91,255,46,54,128,0,175,123,105,255,198,141,78,254,67,244,239,255,245,54,103,254,78,38,242,255,2,92,249,254,251,174,87,255,139,63,144,0,24,108,27,255,34,102,18,1,34,22,152,0,66,229,118,254,50,143,99,0,144,169,149,1,118,30,152,0,178,8,121,1,8,159,18,0,90,101,230,255,129,29,119,0,68,36,11,1,232,183,55,0,23,255,96,255,161,41,193,255,63,139,222,0,15,179,243,0,255,100,15,255,82,53,135,0,137,57,149,1,99,240,170,255,22,230,228,254,49,180,82,255,61,82,43,0,110,245,217,0,199,125,61,0,46,253,52,0,141,197,219,0,211,159,193,0,55,121,105,254,183,20,129,0,169,119,170,255,203,178,139,255,135,40,182,255,172,13,202,255,65,178,148,0,8,207,43,0,122,53,127,1,74,161,48,0,227,214,128,254,86,11,243,255,100,86,7,1,245,68,134,255,61,43,21,1,152,84,94,255,190,60,250,254,239,118,232,255,214,136,37,1,113,76,107,255,93,104,100,1,144,206,23,255,110,150,154,1,228,103,185,0,218,49,50,254,135,77,139,255,185,1,78,0,0,161,148,255,97,29,233,255,207,148,149,255,160,168,0,0,91,128,171,255,6,28,19,254,11,111,247,0,39,187,150,255,138,232,149,0,117,62,68,255,63,216,188,255,235,234,32,254,29,57,160,255,25,12,241,1,169,60,191,0,32,131,141,255,237,159,123,255,94,197,94,254,116,254,3,255,92,179,97,254,121,97,92,255,170,112,14,0,21,149,248,0,248,227,3,0,80,96,109,0,75,192,74,1,12,90,226,255,161,106,68,1,208,114,127,255,114,42,255,254,74,26,74,255,247,179,150,254,121,140,60,0,147,70,200,255,214,40,161,255,161,188,201,255,141,65,135,255,242,115,252,0,62,47,202,0,180,149,255,254,130,55,237,0,165,17,186,255,10,169,194,0,156,109,218,255,112,140,123,255,104,128,223,254,177,142,108,255,121,37,219,255,128,77,18,255,111,108,23,1,91,192,75,0,174,245,22,255,4,236,62,255,43,64,153,1,227,173,254,0,237,122,132,1,127,89,186,255,142,82,128,254,252,84,174,0,90,179,177,1,243,214,87,255,103,60,162,255,208,130,14,255,11,130,139,0,206,129,219,255,94,217,157,255,239,230,230,255,116,115,159,254,164,107,95,0,51,218,2,1,216,125,198,255,140,202,128,254,11,95,68,255,55,9,93,254,174,153,6,255,204,172,96,0,69,160,110,0,213,38,49,254,27,80,213,0,118,125,114,0,70,70,67,255,15,142,73,255,131,122,185,255,243,20,50,254,130,237,40,0,210,159,140,1,197,151,65,255,84,153,66,0,195,126,90,0,16,238,236,1,118,187,102,255,3,24,133,255,187,69,230,0,56,197,92,1,213,69,94,255,80,138,229,1,206,7,230,0,222,111,230,1,91,233,119,255,9,89,7,1,2,98,1,0,148,74,133,255,51,246,180,255,228,177,112,1,58,189,108,255,194,203,237,254,21,209,195,0,147,10,35,1,86,157,226,0,31,163,139,254,56,7,75,255,62,90,116,0,181,60,169,0,138,162,212,254,81,167,31,0,205,90,112,255,33,112,227,0,83,151,117,1,177,224,73,255,174,144,217,255,230,204,79,255,22,77,232,255,114,78,234,0,224,57,126,254,9,49,141,0,242,147,165,1,104,182,140,255,167,132,12,1,123,68,127,0,225,87,39,1,251,108,8,0,198,193,143,1,121,135,207,255,172,22,70,0,50,68,116,255,101,175,40,255,248,105,233,0,166,203,7,0,110,197,218,0,215,254,26,254,168,226,253,0,31,143,96,0,11,103,41,0,183,129,203,254,100,247,74,255,213,126,132,0,210,147,44,0,199,234,27,1,148,47,181,0,155,91,158,1,54,105,175,255,2,78,145,254,102,154,95,0,128,207,127,254,52,124,236,255,130,84,71,0,221,243,211,0,152,170,207,0,222,106,199,0,183,84,94,254,92,200,56,255,138,182,115,1,142,96,146,0,133,136,228,0,97,18,150,0,55,251,66,0,140,102,4,0,202,103,151,0,30,19,248,255,51,184,207,0,202,198,89,0,55,197,225,254,169,95,249,255,66,65,68,255,188,234,126,0,166,223,100,1,112,239,244,0,144,23,194,0,58,39,182,0,244,44,24,254,175,68,179,255,152,118,154,1,176,162,130,0,217,114,204,254,173,126,78,255,33,222,30,255,36,2,91,255,2,143,243,0,9,235,215,0,3,171,151,1,24,215,245,255,168,47,164,254,241,146,207,0,69,129,180,0,68,243,113,0,144,53,72,254,251,45,14,0,23,110,168,0,68,68,79,255,110,70,95,254,174,91,144,255,33,206,95,255,137,41,7,255,19,187,153,254,35,255,112,255,9,145,185,254,50,157,37,0,11,112,49,1,102,8,190,255,234,243,169,1,60,85,23,0,74,39,189,0,116,49,239,0,173,213,210,0,46,161,108,255,159,150,37,0,196,120,185,255,34,98,6,255,153,195,62,255,97,230,71,255,102,61,76,0,26,212,236,255,164,97,16,0,198,59,146,0,163,23,196,0,56,24,61,0,181,98,193,0,251,147,229,255,98,189,24,255,46,54,206,255,234,82,246,0,183,103,38,1,109,62,204,0,10,240,224,0,146,22,117,255,142,154,120,0,69,212,35,0,208,99,118,1,121,255,3,255,72,6,194,0,117,17,197,255,125,15,23,0,154,79,153,0,214,94,197,255,185,55,147,255,62,254,78,254,127,82,153,0,110,102,63,255,108,82,161,255,105,187,212,1,80,138,39,0,60,255,93,255,72,12,186,0,210,251,31,1,190,167,144,255,228,44,19,254,128,67,232,0,214,249,107,254,136,145,86,255,132,46,176,0,189,187,227,255,208,22,140,0,217,211,116,0,50,81,186,254,139,250,31,0,30,64,198,1,135,155,100,0,160,206,23,254,187,162,211,255,16,188,63,0,254,208,49,0,85,84,191,0,241,192,242,255,153,126,145,1,234,162,162,255,230,97,216,1,64,135,126,0,190,148,223,1,52,0,43,255,28,39,189,1,64,136,238,0,175,196,185,0,98,226,213,255,127,159,244,1,226,175,60,0,160,233,142,1,180,243,207,255,69,152,89,1,31,101,21,0,144,25,164,254,139,191,209,0,91,25,121,0,32,147,5,0,39,186,123,255,63,115,230,255,93,167,198,255,143,213,220,255,179,156,19,255,25,66,122,0,214,160,217,255,2,45,62,255,106,79,146,254,51,137,99,255,87,100,231,255,175,145,232,255,101,184,1,255,174,9,125,0,82,37,161,1,36,114,141,255,48,222,142,255,245,186,154,0,5,174,221,254,63,114,155,255,135,55,160,1,80,31,135,0,126,250,179,1,236,218,45,0,20,28,145,1,16,147,73,0,249,189,132,1,17,189,192,255,223,142,198,255,72,20,15,255,250,53,237,254,15,11,18,0,27,211,113,254,213,107,56,255,174,147,146,255,96,126,48,0,23,193,109,1,37,162,94,0,199,157,249,254,24,128,187,255,205,49,178,254,93,164,42,255,43,119,235,1,88,183,237,255,218,210,1,255,107,254,42,0,230,10,99,255,162,0,226,0,219,237,91,0,129,178,203,0,208,50,95,254,206,208,95,255,247,191,89,254,110,234,79,255,165,61,243,0,20,122,112,255,246,246,185,254,103,4,123,0,233,99,230,1,219,91,252,255,199,222,22,255,179,245,233,255,211,241,234,0,111,250,192,255,85,84,136,0,101,58,50,255,131,173,156,254,119,45,51,255,118,233,16,254,242,90,214,0,94,159,219,1,3,3,234,255,98,76,92,254,80,54,230,0,5,228,231,254,53,24,223,255,113,56,118,1,20,132,1,255,171,210,236,0,56,241,158,255,186,115,19,255,8,229,174,0,48,44,0,1,114,114,166,255,6,73,226,255,205,89,244,0,137,227,75,1,248,173,56,0,74,120,246,254,119,3,11,255,81,120,198,255,136,122,98,255,146,241,221,1,109,194,78,255,223,241,70,1,214,200,169,255,97,190,47,255,47,103,174,255,99,92,72,254,118,233,180,255,193,35,233,254,26,229,32,255,222,252,198,0,204,43,71,255,199,84,172,0,134,102,190,0,111,238,97,254,230,40,230,0,227,205,64,254,200,12,225,0,166,25,222,0,113,69,51,255,143,159,24,0,167,184,74,0,29,224,116,254,158,208,233,0,193,116,126,255,212,11,133,255,22,58,140,1,204,36,51,255,232,30,43,0,235,70,181,255,64,56,146,254,169,18,84,255,226,1,13,255,200,50,176,255,52,213,245,254,168,209,97,0,191,71,55,0,34,78,156,0,232,144,58,1,185,74,189,0,186,142,149,254,64,69,127,255,161,203,147,255,176,151,191,0,136,231,203,254,163,182,137,0,161,126,251,254,233,32,66,0,68,207,66,0,30,28,37,0,93,114,96,1,254,92,247,255,44,171,69,0,202,119,11,255,188,118,50,1,255,83,136,255,71,82,26,0,70,227,2,0,32,235,121,1,181,41,154,0,71,134,229,254,202,255,36,0,41,152,5,0,154,63,73,255,34,182,124,0,121,221,150,255,26,204,213,1,41,172,87,0,90,157,146,255,109,130,20,0,71,107,200,255,243,102,189,0,1,195,145,254,46,88,117,0,8,206,227,0,191,110,253,255,109,128,20,254,134,85,51,255,137,177,112,1,216,34,22,255,131,16,208,255,121,149,170,0,114,19,23,1,166,80,31,255,113,240,122,0,232,179,250,0,68,110,180,254,210,170,119,0,223,108,164,255,207,79,233,255,27,229,226,254,209,98,81,255,79,68,7,0,131,185,100,0,170,29,162,255,17,162,107,255,57,21,11,1,100,200,181,255,127,65,166,1,165,134,204,0,104,167,168,0,1,164,79,0,146,135,59,1,70,50,128,255,102,119,13,254,227,6,135,0,162,142,179,255,160,100,222,0,27,224,219,1,158,93,195,255,234,141,137,0,16,24,125,255,238,206,47,255,97,17,98,255,116,110,12,255,96,115,77,0,91,227,232,255,248,254,79,255,92,229,6,254,88,198,139,0,206,75,129,0,250,77,206,255,141,244,123,1,138,69,220,0,32,151,6,1,131,167,22,255,237,68,167,254,199,189,150,0,163,171,138,255,51,188,6,255,95,29,137,254,148,226,179,0,181,107,208,255,134,31,82,255,151,101,45,255,129,202,225,0,224,72,147,0,48,138,151,255,195,64,206,254,237,218,158,0,106,29,137,254,253,189,233,255,103,15,17,255,194,97,255,0,178,45,169,254,198,225,155,0,39,48,117,255,135,106,115,0,97,38,181,0,150,47,65,255,83,130,229,254,246,38,129,0,92,239,154,254,91,99,127,0,161,111,33,255,238,217,242,255,131,185,195,255,213,191,158,255,41,150,218,0,132,169,131,0,89,84,252,1,171,70,128,255,163,248,203,254,1,50,180,255,124,76,85,1,251,111,80,0,99,66,239,255,154,237,182,255,221,126,133,254,74,204,99,255,65,147,119,255,99,56,167,255,79,248,149,255,116,155,228,255,237,43,14,254,69,137,11,255,22,250,241,1,91,122,143,255,205,249,243,0,212,26,60,255,48,182,176,1,48,23,191,255,203,121,152,254,45,74,213,255,62,90,18,254,245,163,230,255,185,106,116,255,83,35,159,0,12,33,2,255,80,34,62,0,16,87,174,255,173,101,85,0,202,36,81,254,160,69,204,255,64,225,187,0,58,206,94,0,86,144,47,0,229,86,245,0,63,145,190,1,37,5,39,0,109,251,26,0,137,147,234,0,162,121,145,255,144,116,206,255,197,232,185,255,183,190,140,255,73,12,254,255,139,20,242,255,170,90,239,255,97,66,187,255,245,181,135,254,222,136,52,0,245,5,51,254,203,47,78,0,152,101,216,0,73,23,125,0,254,96,33,1,235,210,73,255,43,209,88,1,7,129,109,0,122,104,228,254,170,242,203,0,242,204,135,255,202,28,233,255,65,6,127,0,159,144,71,0,100,140,95,0,78,150,13,0,251,107,118,1,182,58,125,255,1,38,108,255,141,189,209,255,8,155,125,1,113,163,91,255,121,79,190,255,134,239,108,255,76,47,248,0,163,228,239,0,17,111,10,0,88,149,75,255,215,235,239,0,167,159,24,255,47,151,108,255,107,209,188,0,233,231,99,254,28,202,148,255,174,35,138,255,110,24,68,255,2,69,181,0,107,102,82,0,102,237,7,0,92,36,237,255,221,162,83,1,55,202,6,255,135,234,135,255,24,250,222,0,65,94,168,254,245,248,210,255,167,108,201,254,255,161,111,0,205,8,254,0,136,13,116,0,100,176,132,255,43,215,126,255,177,133,130,255,158,79,148,0,67,224,37,1,12,206,21,255,62,34,110,1,237,104,175,255,80,132,111,255,142,174,72,0,84,229,180,254,105,179,140,0,64,248,15,255,233,138,16,0,245,67,123,254,218,121,212,255,63,95,218,1,213,133,137,255,143,182,82,255,48,28,11,0,244,114,141,1,209,175,76,255,157,181,150,255,186,229,3,255,164,157,111,1,231,189,139,0,119,202,190,255,218,106,64,255,68,235,63,254,96,26,172,255,187,47,11,1,215,18,251,255,81,84,89,0,68,58,128,0,94,113,5,1,92,129,208,255,97,15,83,254,9,28,188,0,239,9,164,0,60,205,152,0,192,163,98,255,184,18,60,0,217,182,139,0,109,59,120,255,4,192,251,0,169,210,240,255,37,172,92,254,148,211,245,255,179,65,52,0,253,13,115,0,185,174,206,1,114,188,149,255,237,90,173,0,43,199,192,255,88,108,113,0,52,35,76,0,66,25,148,255,221,4,7,255,151,241,114,255,190,209,232,0,98,50,199,0,151,150,213,255,18,74,36,1,53,40,7,0,19,135,65,255,26,172,69,0,174,237,85,0,99,95,41,0,3,56,16,0,39,160,177,255,200,106,218,254,185,68,84,255,91,186,61,254,67,143,141,255,13,244,166,255,99,114,198,0,199,110,163,255,193,18,186,0,124,239,246,1,110,68,22,0,2,235,46,1,212,60,107,0,105,42,105,1,14,230,152,0,7,5,131,0,141,104,154,255,213,3,6,0,131,228,162,255,179,100,28,1,231,123,85,255,206,14,223,1,253,96,230,0,38,152,149,1,98,137,122,0,214,205,3,255,226,152,179,255,6,133,137,0,158,69,140,255,113,162,154,255,180,243,172,255,27,189,115,255,143,46,220,255,213,134,225,255,126,29,69,0,188,43,137,1,242,70,9,0,90,204,255,255,231,170,147,0,23,56,19,254,56,125,157,255,48,179,218,255,79,182,253,255,38,212,191,1,41,235,124,0,96,151,28,0,135,148,190,0,205,249,39,254,52,96,136,255,212,44,136,255,67,209,131,255,252,130,23,255,219,128,20,255,198,129,118,0,108,101,11,0,178,5,146,1,62,7,100,255,181,236,94,254,28,26,164,0,76,22,112,255,120,102,79,0,202,192,229,1,200,176,215,0,41,64,244,255,206,184,78,0,167,45,63,1,160,35,0,255,59,12,142,255,204,9,144,255,219,94,229,1,122,27,112,0,189,105,109,255,64,208,74,255,251,127,55,1,2,226,198,0,44,76,209,0,151,152,77,255,210,23,46,1,201,171,69,255,44,211,231,0,190,37,224,255,245,196,62,255,169,181,222,255,34,211,17,0,119,241,197,255,229,35,152,1,21,69,40,255,178,226,161,0,148,179,193,0,219,194,254,1,40,206,51,255,231,92,250,1,67,153,170,0,21,148,241,0,170,69,82,255,121,18,231,255,92,114,3,0,184,62,230,0,225,201,87,255,146,96,162,255,181,242,220,0,173,187,221,1,226,62,170,255,56,126,217,1,117,13,227,255,179,44,239,0,157,141,155,255,144,221,83,0,235,209,208,0,42,17,165,1,251,81,133,0,124,245,201,254,97,211,24,255,83,214,166,0,154,36,9,255,248,47,127,0,90,219,140,255,161,217,38,254,212,147,63,255,66,84,148,1,207,3,1,0,230,134,89,1,127,78,122,255,224,155,1,255,82,136,74,0,178,156,208,255,186,25,49,255,222,3,210,1,229,150,190,255,85,162,52,255,41,84,141,255,73,123,84,254,93,17,150,0,119,19,28,1,32,22,215,255,28,23,204,255,142,241,52,255,228,52,125,0,29,76,207,0,215,167,250,254,175,164,230,0,55,207,105,1,109,187,245,255,161,44,220,1,41,101,128,255,167,16,94,0,93,214,107,255,118,72,0,254,80,61,234,255,121,175,125,0,139,169,251,0,97,39,147,254,250,196,49,255,165,179,110,254,223,70,187,255,22,142,125,1,154,179,138,255,118,176,42,1,10,174,153,0,156,92,102,0,168,13,161,255,143,16,32,0,250,197,180,255,203,163,44,1,87,32,36,0,161,153,20,255,123,252,15,0,25,227,80,0,60,88,142,0,17,22,201,1,154,205,77,255,39,63,47,0,8,122,141,0,128,23,182,254,204,39,19,255,4,112,29,255,23,36,140,255,210,234,116,254,53,50,63,255,121,171,104,255,160,219,94,0,87,82,14,254,231,42,5,0,165,139,127,254,86,78,38,0,130,60,66,254,203,30,45,255,46,196,122,1,249,53,162,255,136,143,103,254,215,210,114,0,231,7,160,254,169,152,42,255,111,45,246,0,142,131,135,255,131,71,204,255,36,226,11,0,0,28,242,255,225,138,213,255,247,46,216,254,245,3,183,0,108,252,74,1,206,26,48,255,205,54,246,255,211,198,36,255,121,35,50,0,52,216,202,255,38,139,129,254,242,73,148,0,67,231,141,255,42,47,204,0,78,116,25,1,4,225,191,255,6,147,228,0,58,88,177,0,122,165,229,255,252,83,201,255,224,167,96,1,177,184,158,255,242,105,179,1,248,198,240,0,133,66,203,1,254,36,47,0,45,24,115,255,119,62,254,0,196,225,186,254,123,141,172,0,26,85,41,255,226,111,183,0,213,231,151,0,4,59,7,255,238,138,148,0,66,147,33,255,31,246,141,255,209,141,116,255,104,112,31,0,88,161,172,0,83,215,230,254,47,111,151,0,45,38,52,1,132,45,204,0,138,128,109,254,233,117,134,255,243,190,173,254,241,236,240,0,82,127,236,254,40,223,161,255,110,182,225,255,123,174,239,0,135,242,145,1,51,209,154,0,150,3,115,254,217,164,252,255,55,156,69,1,84,94,255,255,232,73,45,1,20,19,212,255,96,197,59,254,96,251,33,0,38,199,73,1,64,172,247,255,117,116,56,255,228,17,18,0,62,138,103,1,246,229,164,255,244,118,201,254,86,32,159,255,109,34,137,1,85,211,186,0,10,193,193,254,122,194,177,0,122,238,102,255,162,218,171,0,108,217,161,1,158,170,34,0,176,47,155,1,181,228,11,255,8,156,0,0,16,75,93,0,206,98,255,1,58,154,35,0,12,243,184,254,67,117,66,255,230,229,123,0,201,42,110],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE+20480);allocate([134,228,178,254,186,108,118,255,58,19,154,255,82,169,62,255,114,143,115,1,239,196,50,255,173,48,193,255,147,2,84,255,150,134,147,254,95,232,73,0,109,227,52,254,191,137,10,0,40,204,30,254,76,52,97,255,164,235,126,0,254,124,188,0,74,182,21,1,121,29,35,255,241,30,7,254,85,218,214,255,7,84,150,254,81,27,117,255,160,159,152,254,66,24,221,255,227,10,60,1,141,135,102,0,208,189,150,1,117,179,92,0,132,22,136,255,120,199,28,0,21,129,79,254,182,9,65,0,218,163,169,0,246,147,198,255,107,38,144,1,78,175,205,255,214,5,250,254,47,88,29,255,164,47,204,255,43,55,6,255,131,134,207,254,116,100,214,0,96,140,75,1,106,220,144,0,195,32,28,1,172,81,5,255,199,179,52,255,37,84,203,0,170,112,174,0,11,4,91,0,69,244,27,1,117,131,92,0,33,152,175,255,140,153,107,255,251,135,43,254,87,138,4,255,198,234,147,254,121,152,84,255,205,101,155,1,157,9,25,0,72,106,17,254,108,153,0,255,189,229,186,0,193,8,176,255,174,149,209,0,238,130,29,0,233,214,126,1,61,226,102,0,57,163,4,1,198,111,51,255,45,79,78,1,115,210,10,255,218,9,25,255,158,139,198,255,211,82,187,254,80,133,83,0,157,129,230,1,243,133,134,255,40,136,16,0,77,107,79,255,183,85,92,1,177,204,202,0,163,71,147,255,152,69,190,0,172,51,188,1,250,210,172,255,211,242,113,1,89,89,26,255,64,66,111,254,116,152,42,0,161,39,27,255,54,80,254,0,106,209,115,1,103,124,97,0,221,230,98,255,31,231,6,0,178,192,120,254,15,217,203,255,124,158,79,0,112,145,247,0,92,250,48,1,163,181,193,255,37,47,142,254,144,189,165,255,46,146,240,0,6,75,128,0,41,157,200,254,87,121,213,0,1,113,236,0,5,45,250,0,144,12,82,0,31,108,231,0,225,239,119,255,167,7,189,255,187,228,132,255,110,189,34,0,94,44,204,1,162,52,197,0,78,188,241,254,57,20,141,0,244,146,47,1,206,100,51,0,125,107,148,254,27,195,77,0,152,253,90,1,7,143,144,255,51,37,31,0,34,119,38,255,7,197,118,0,153,188,211,0,151,20,116,254,245,65,52,255,180,253,110,1,47,177,209,0,161,99,17,255,118,222,202,0,125,179,252,1,123,54,126,255,145,57,191,0,55,186,121,0,10,243,138,0,205,211,229,255,125,156,241,254,148,156,185,255,227,19,188,255,124,41,32,255,31,34,206,254,17,57,83,0,204,22,37,255,42,96,98,0,119,102,184,1,3,190,28,0,110,82,218,255,200,204,192,255,201,145,118,0,117,204,146,0,132,32,98,1,192,194,121,0,106,161,248,1,237,88,124,0,23,212,26,0,205,171,90,255,248,48,216,1,141,37,230,255,124,203,0,254,158,168,30,255,214,248,21,0,112,187,7,255,75,133,239,255,74,227,243,255,250,147,70,0,214,120,162,0,167,9,179,255,22,158,18,0,218,77,209,1,97,109,81,255,244,33,179,255,57,52,57,255,65,172,210,255,249,71,209,255,142,169,238,0,158,189,153,255,174,254,103,254,98,33,14,0,141,76,230,255,113,139,52,255,15,58,212,0,168,215,201,255,248,204,215,1,223,68,160,255,57,154,183,254,47,231,121,0,106,166,137,0,81,136,138,0,165,43,51,0,231,139,61,0,57,95,59,254,118,98,25,255,151,63,236,1,94,190,250,255,169,185,114,1,5,250,58,255,75,105,97,1,215,223,134,0,113,99,163,1,128,62,112,0,99,106,147,0,163,195,10,0,33,205,182,0,214,14,174,255,129,38,231,255,53,182,223,0,98,42,159,255,247,13,40,0,188,210,177,1,6,21,0,255,255,61,148,254,137,45,129,255,89,26,116,254,126,38,114,0,251,50,242,254,121,134,128,255,204,249,167,254,165,235,215,0,202,177,243,0,133,141,62,0,240,130,190,1,110,175,255,0,0,20,146,1,37,210,121,255,7,39,130,0,142,250,84,255,141,200,207,0,9,95,104,255,11,244,174,0,134,232,126,0,167,1,123,254,16,193,149,255,232,233,239,1,213,70,112,255,252,116,160,254,242,222,220,255,205,85,227,0,7,185,58,0,118,247,63,1,116,77,177,255,62,245,200,254,63,18,37,255,107,53,232,254,50,221,211,0,162,219,7,254,2,94,43,0,182,62,182,254,160,78,200,255,135,140,170,0,235,184,228,0,175,53,138,254,80,58,77,255,152,201,2,1,63,196,34,0,5,30,184,0,171,176,154,0,121,59,206,0,38,99,39,0,172,80,77,254,0,134,151,0,186,33,241,254,94,253,223,255,44,114,252,0,108,126,57,255,201,40,13,255,39,229,27,255,39,239,23,1,151,121,51,255,153,150,248,0,10,234,174,255,118,246,4,254,200,245,38,0,69,161,242,1,16,178,150,0,113,56,130,0,171,31,105,0,26,88,108,255,49,42,106,0,251,169,66,0,69,93,149,0,20,57,254,0,164,25,111,0,90,188,90,255,204,4,197,0,40,213,50,1,212,96,132,255,88,138,180,254,228,146,124,255,184,246,247,0,65,117,86,255,253,102,210,254,254,121,36,0,137,115,3,255,60,24,216,0,134,18,29,0,59,226,97,0,176,142,71,0,7,209,161,0,189,84,51,254,155,250,72,0,213,84,235,255,45,222,224,0,238,148,143,255,170,42,53,255,78,167,117,0,186,0,40,255,125,177,103,255,69,225,66,0,227,7,88,1,75,172,6,0,169,45,227,1,16,36,70,255,50,2,9,255,139,193,22,0,143,183,231,254,218,69,50,0,236,56,161,1,213,131,42,0,138,145,44,254,136,229,40,255,49,63,35,255,61,145,245,255,101,192,2,254,232,167,113,0,152,104,38,1,121,185,218,0,121,139,211,254,119,240,35,0,65,189,217,254,187,179,162,255,160,187,230,0,62,248,14,255,60,78,97,0,255,247,163,255,225,59,91,255,107,71,58,255,241,47,33,1,50,117,236,0,219,177,63,254,244,90,179,0,35,194,215,255,189,67,50,255,23,135,129,0,104,189,37,255,185,57,194,0,35,62,231,255,220,248,108,0,12,231,178,0,143,80,91,1,131,93,101,255,144,39,2,1,255,250,178,0,5,17,236,254,139,32,46,0,204,188,38,254,245,115,52,255,191,113,73,254,191,108,69,255,22,69,245,1,23,203,178,0,170,99,170,0,65,248,111,0,37,108,153,255,64,37,69,0,0,88,62,254,89,148,144,255,191,68,224,1,241,39,53,0,41,203,237,255,145,126,194,255,221,42,253,255,25,99,151,0,97,253,223,1,74,115,49,255,6,175,72,255,59,176,203,0,124,183,249,1,228,228,99,0,129,12,207,254,168,192,195,255,204,176,16,254,152,234,171,0,77,37,85,255,33,120,135,255,142,194,227,1,31,214,58,0,213,187,125,255,232,46,60,255,190,116,42,254,151,178,19,255,51,62,237,254,204,236,193,0,194,232,60,0,172,34,157,255,189,16,184,254,103,3,95,255,141,233,36,254,41,25,11,255,21,195,166,0,118,245,45,0,67,213,149,255,159,12,18,255,187,164,227,1,160,25,5,0,12,78,195,1,43,197,225,0,48,142,41,254,196,155,60,255,223,199,18,1,145,136,156,0,252,117,169,254,145,226,238,0,239,23,107,0,109,181,188,255,230,112,49,254,73,170,237,255,231,183,227,255,80,220,20,0,194,107,127,1,127,205,101,0,46,52,197,1,210,171,36,255,88,3,90,255,56,151,141,0,96,187,255,255,42,78,200,0,254,70,70,1,244,125,168,0,204,68,138,1,124,215,70,0,102,66,200,254,17,52,228,0,117,220,143,254,203,248,123,0,56,18,174,255,186,151,164,255,51,232,208,1,160,228,43,255,249,29,25,1,68,190,63,0,5,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,2,0,0,0,220,130,0,0,0,4,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,144,130,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,127,0,0],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE+30720);var tempDoublePtr=STATICTOP;STATICTOP+=16;function ___lock(){}function ___unlock(){}var SYSCALLS={varargs:0,get:(function(varargs){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret}),getStr:(function(){var ret=Pointer_stringify(SYSCALLS.get());return ret}),get64:(function(){var low=SYSCALLS.get(),high=SYSCALLS.get();if(low>=0)assert(high===0);else assert(high===-1);return low}),getZero:(function(){assert(SYSCALLS.get()===0)})};function ___syscall6(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.getStreamFromFD();FS.close(stream);return 0}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function _llvm_stackrestore(p){var self=_llvm_stacksave;var ret=self.LLVM_SAVEDSTACKS[p];self.LLVM_SAVEDSTACKS.splice(p,1);Runtime.stackRestore(ret)}function ___setErrNo(value){if(Module["___errno_location"])HEAP32[Module["___errno_location"]()>>2]=value;return value}function _llvm_stacksave(){var self=_llvm_stacksave;if(!self.LLVM_SAVEDSTACKS){self.LLVM_SAVEDSTACKS=[]}self.LLVM_SAVEDSTACKS.push(Runtime.stackSave());return self.LLVM_SAVEDSTACKS.length-1}function _emscripten_memcpy_big(dest,src,num){HEAPU8.set(HEAPU8.subarray(src,src+num),dest);return dest}function ___syscall140(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.getStreamFromFD(),offset_high=SYSCALLS.get(),offset_low=SYSCALLS.get(),result=SYSCALLS.get(),whence=SYSCALLS.get();var offset=offset_low;FS.llseek(stream,offset,whence);HEAP32[result>>2]=stream.position;if(stream.getdents&&offset===0&&whence===0)stream.getdents=null;return 0}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function ___syscall146(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.get(),iov=SYSCALLS.get(),iovcnt=SYSCALLS.get();var ret=0;if(!___syscall146.buffer){___syscall146.buffers=[null,[],[]];___syscall146.printChar=(function(stream,curr){var buffer=___syscall146.buffers[stream];assert(buffer);if(curr===0||curr===10){(stream===1?Module["print"]:Module["printErr"])(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}})}for(var i=0;i<iovcnt;i++){var ptr=HEAP32[iov+i*8>>2];var len=HEAP32[iov+(i*8+4)>>2];for(var j=0;j<len;j++){___syscall146.printChar(stream,HEAPU8[ptr+j])}ret+=len}return ret}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function ___syscall54(which,varargs){SYSCALLS.varargs=varargs;try{return 0}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}__ATEXIT__.push((function(){var fflush=Module["_fflush"];if(fflush)fflush(0);var printChar=___syscall146.printChar;if(!printChar)return;var buffers=___syscall146.buffers;if(buffers[1].length)printChar(1,10);if(buffers[2].length)printChar(2,10)}));DYNAMICTOP_PTR=allocate(1,"i32",ALLOC_STATIC);STACK_BASE=STACKTOP=Runtime.alignMemory(STATICTOP);STACK_MAX=STACK_BASE+TOTAL_STACK;DYNAMIC_BASE=Runtime.alignMemory(STACK_MAX);HEAP32[DYNAMICTOP_PTR>>2]=DYNAMIC_BASE;staticSealed=true;function invoke_ii(index,a1){try{return Module["dynCall_ii"](index,a1)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_iiii(index,a1,a2,a3){try{return Module["dynCall_iiii"](index,a1,a2,a3)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}Module.asmGlobalArg={"Math":Math,"Int8Array":Int8Array,"Int16Array":Int16Array,"Int32Array":Int32Array,"Uint8Array":Uint8Array,"Uint16Array":Uint16Array,"Uint32Array":Uint32Array,"Float32Array":Float32Array,"Float64Array":Float64Array,"NaN":NaN,"Infinity":Infinity};Module.asmLibraryArg={"abort":abort,"assert":assert,"enlargeMemory":enlargeMemory,"getTotalMemory":getTotalMemory,"abortOnCannotGrowMemory":abortOnCannotGrowMemory,"invoke_ii":invoke_ii,"invoke_iiii":invoke_iiii,"___lock":___lock,"___syscall6":___syscall6,"___setErrNo":___setErrNo,"_llvm_stacksave":_llvm_stacksave,"___syscall140":___syscall140,"_emscripten_memcpy_big":_emscripten_memcpy_big,"___syscall54":___syscall54,"___unlock":___unlock,"_llvm_stackrestore":_llvm_stackrestore,"___syscall146":___syscall146,"DYNAMICTOP_PTR":DYNAMICTOP_PTR,"tempDoublePtr":tempDoublePtr,"ABORT":ABORT,"STACKTOP":STACKTOP,"STACK_MAX":STACK_MAX};// EMSCRIPTEN_START_ASM
var asm=(function(global,env,buffer) {
"use asm";var a=new global.Int8Array(buffer);var b=new global.Int16Array(buffer);var c=new global.Int32Array(buffer);var d=new global.Uint8Array(buffer);var e=new global.Uint16Array(buffer);var f=new global.Uint32Array(buffer);var g=new global.Float32Array(buffer);var h=new global.Float64Array(buffer);var i=env.DYNAMICTOP_PTR|0;var j=env.tempDoublePtr|0;var k=env.ABORT|0;var l=env.STACKTOP|0;var m=env.STACK_MAX|0;var n=0;var o=0;var p=0;var q=0;var r=global.NaN,s=global.Infinity;var t=0,u=0,v=0,w=0,x=0.0;var y=0;var z=global.Math.floor;var A=global.Math.abs;var B=global.Math.sqrt;var C=global.Math.pow;var D=global.Math.cos;var E=global.Math.sin;var F=global.Math.tan;var G=global.Math.acos;var H=global.Math.asin;var I=global.Math.atan;var J=global.Math.atan2;var K=global.Math.exp;var L=global.Math.log;var M=global.Math.ceil;var N=global.Math.imul;var O=global.Math.min;var P=global.Math.max;var Q=global.Math.clz32;var R=env.abort;var S=env.assert;var T=env.enlargeMemory;var U=env.getTotalMemory;var V=env.abortOnCannotGrowMemory;var W=env.invoke_ii;var X=env.invoke_iiii;var Y=env.___lock;var Z=env.___syscall6;var _=env.___setErrNo;var $=env._llvm_stacksave;var aa=env.___syscall140;var ba=env._emscripten_memcpy_big;var ca=env.___syscall54;var da=env.___unlock;var ea=env._llvm_stackrestore;var fa=env.___syscall146;var ga=0.0;
// EMSCRIPTEN_START_FUNCS
function ja(a){a=a|0;var b=0;b=l;l=l+a|0;l=l+15&-16;return b|0}function ka(){return l|0}function la(a){a=a|0;l=a}function ma(a,b){a=a|0;b=b|0;l=a;m=b}function na(a,b){a=a|0;b=b|0;if(!n){n=a;o=b}}function oa(a){a=a|0;y=a}function pa(){return y|0}function qa(b,c){b=b|0;c=c|0;return ((((a[c+1>>0]^a[b+1>>0]|a[c>>0]^a[b>>0]|a[c+2>>0]^a[b+2>>0]|a[c+3>>0]^a[b+3>>0]|a[c+4>>0]^a[b+4>>0]|a[c+5>>0]^a[b+5>>0]|a[c+6>>0]^a[b+6>>0]|a[c+7>>0]^a[b+7>>0]|a[c+8>>0]^a[b+8>>0]|a[c+9>>0]^a[b+9>>0]|a[c+10>>0]^a[b+10>>0]|a[c+11>>0]^a[b+11>>0]|a[c+12>>0]^a[b+12>>0]|a[c+13>>0]^a[b+13>>0]|a[c+14>>0]^a[b+14>>0]|a[c+15>>0]^a[b+15>>0]|a[c+16>>0]^a[b+16>>0]|a[c+17>>0]^a[b+17>>0]|a[c+18>>0]^a[b+18>>0]|a[c+19>>0]^a[b+19>>0]|a[c+20>>0]^a[b+20>>0]|a[c+21>>0]^a[b+21>>0]|a[c+22>>0]^a[b+22>>0]|a[c+23>>0]^a[b+23>>0]|a[c+24>>0]^a[b+24>>0]|a[c+25>>0]^a[b+25>>0]|a[c+26>>0]^a[b+26>>0]|a[c+27>>0]^a[b+27>>0]|a[c+28>>0]^a[b+28>>0]|a[c+29>>0]^a[b+29>>0]|a[c+30>>0]^a[b+30>>0]|a[c+31>>0]^a[b+31>>0])&255)+511|0)>>>8&1)+-1|0}function ra(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0;g=l;l=l+240|0;h=g+8|0;i=g+168|0;j=g;k=$()|0;m=l;l=l+((1*(f+64|0)|0)+15&-16)|0;n=j;c[n>>2]=0;c[n+4>>2]=0;n=i;o=d;p=n+32|0;do{a[n>>0]=a[o>>0]|0;n=n+1|0;o=o+1|0}while((n|0)<(p|0));vb(h,d);rb(i+32|0,h);h=a[i+63>>0]&-128;ua(m,j,e,f,0,i)|0;n=b;o=m;p=n+64|0;do{a[n>>0]=a[o>>0]|0;n=n+1|0;o=o+1|0}while((n|0)<(p|0));o=b+63|0;a[o>>0]=a[o>>0]|h;ea(k|0);l=g;return}function sa(b,c,d,e){b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;f=l;l=l+288|0;g=f+208|0;h=f+168|0;i=f+128|0;j=f+88|0;k=f+48|0;m=f+8|0;n=f+248|0;o=f;p=e+64|0;q=$()|0;r=l;l=l+((1*p|0)+15&-16)|0;s=l;l=l+((1*p|0)+15&-16)|0;Ua(g,c);Qa(k);db(h,g,k);Ra(i,g,k);Xa(j,i);_a(m,h,j);eb(n,m);m=b+63|0;j=a[m>>0]|0;h=n+31|0;a[h>>0]=a[h>>0]|j&-128;a[m>>0]=j&127;j=r;m=b;b=j+64|0;do{a[j>>0]=a[m>>0]|0;j=j+1|0;m=m+1|0}while((j|0)<(b|0));sc(r+64|0,d|0,e|0)|0;e=Cb(s,o,r,p,0,n)|0;ea(q|0);l=f;return e|0}function ta(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;d=l;l=l+208|0;e=d;Jb(e);Kb(e,b,c);Rb(e,a);l=d;return 0}function ua(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;i=l;l=l+320|0;j=i+288|0;k=i+224|0;m=i+160|0;n=i;o=j;p=h+32|0;q=o+32|0;do{a[o>>0]=a[p>>0]|0;o=o+1|0;p=p+1|0}while((o|0)<(q|0));r=lc(f|0,g|0,64,0)|0;s=y;t=d;c[t>>2]=r;c[t+4>>2]=s;tc(b+64|0,e|0,f|0)|0;e=b+32|0;tc(e|0,h|0,32)|0;t=lc(f|0,g|0,32,0)|0;ta(k,e,t,y)|0;o=e;p=j;q=o+32|0;do{a[o>>0]=a[p>>0]|0;o=o+1|0;p=p+1|0}while((o|0)<(q|0));Gb(k);vb(n,k);rb(b,n);ta(m,b,r,s)|0;Gb(m);Db(e,m,h,k);l=i;return 0}function va(b,c,d){b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0;e=l;l=l+368|0;f=e+248|0;g=e+168|0;h=e+80|0;i=e;j=e+328|0;k=j;m=c;c=k+32|0;do{a[k>>0]=a[m>>0]|0;k=k+1|0;m=m+1|0}while((k|0)<(c|0));wa(f,d);xa(g,h,j,f);ya(i,h);za(h,g,i);Aa(b,h);l=e;return 0}function wa(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0;e=d[b>>0]|0;f=oc(d[b+1>>0]|0|0,0,8)|0;g=y;h=oc(d[b+2>>0]|0|0,0,16)|0;i=g|y;g=b+3|0;j=oc(d[g>>0]|0|0,0,24)|0;k=a;c[k>>2]=f|e|h|j&50331648;c[k+4>>2]=i;i=d[g>>0]|0;g=oc(d[b+4>>0]|0|0,0,8)|0;k=y;j=oc(d[b+5>>0]|0|0,0,16)|0;h=k|y;k=b+6|0;e=oc(d[k>>0]|0|0,0,24)|0;f=nc(g|i|j|e|0,h|y|0,2)|0;h=a+8|0;c[h>>2]=f&33554431;c[h+4>>2]=0;h=d[k>>0]|0;k=oc(d[b+7>>0]|0|0,0,8)|0;f=y;e=oc(d[b+8>>0]|0|0,0,16)|0;j=f|y;f=b+9|0;i=oc(d[f>>0]|0|0,0,24)|0;g=nc(k|h|e|i|0,j|y|0,3)|0;j=a+16|0;c[j>>2]=g&67108863;c[j+4>>2]=0;j=d[f>>0]|0;f=oc(d[b+10>>0]|0|0,0,8)|0;g=y;i=oc(d[b+11>>0]|0|0,0,16)|0;e=g|y;g=b+12|0;h=oc(d[g>>0]|0|0,0,24)|0;k=nc(f|j|i|h|0,e|y|0,5)|0;e=a+24|0;c[e>>2]=k&33554431;c[e+4>>2]=0;e=d[g>>0]|0;g=oc(d[b+13>>0]|0|0,0,8)|0;k=y;h=oc(d[b+14>>0]|0|0,0,16)|0;i=k|y;k=oc(d[b+15>>0]|0|0,0,24)|0;j=nc(g|e|h|k|0,i|y|0,6)|0;i=a+32|0;c[i>>2]=j&67108863;c[i+4>>2]=0;i=d[b+16>>0]|0;j=oc(d[b+17>>0]|0|0,0,8)|0;k=y;h=oc(d[b+18>>0]|0|0,0,16)|0;e=k|y;k=b+19|0;g=oc(d[k>>0]|0|0,0,24)|0;f=a+40|0;c[f>>2]=j|i|h|g&16777216;c[f+4>>2]=e;e=d[k>>0]|0;k=oc(d[b+20>>0]|0|0,0,8)|0;f=y;g=oc(d[b+21>>0]|0|0,0,16)|0;h=f|y;f=b+22|0;i=oc(d[f>>0]|0|0,0,24)|0;j=nc(k|e|g|i|0,h|y|0,1)|0;h=a+48|0;c[h>>2]=j&67108863;c[h+4>>2]=0;h=d[f>>0]|0;f=oc(d[b+23>>0]|0|0,0,8)|0;j=y;i=oc(d[b+24>>0]|0|0,0,16)|0;g=j|y;j=b+25|0;e=oc(d[j>>0]|0|0,0,24)|0;k=nc(f|h|i|e|0,g|y|0,3)|0;g=a+56|0;c[g>>2]=k&33554431;c[g+4>>2]=0;g=d[j>>0]|0;j=oc(d[b+26>>0]|0|0,0,8)|0;k=y;e=oc(d[b+27>>0]|0|0,0,16)|0;i=k|y;k=b+28|0;h=oc(d[k>>0]|0|0,0,24)|0;f=nc(j|g|e|h|0,i|y|0,4)|0;i=a+64|0;c[i>>2]=f&67108863;c[i+4>>2]=0;i=d[k>>0]|0;k=oc(d[b+29>>0]|0|0,0,8)|0;f=y;h=oc(d[b+30>>0]|0|0,0,16)|0;e=f|y;f=oc(d[b+31>>0]|0|0,0,24)|0;b=nc(k|i|h|f|0,e|y|0,6)|0;e=a+72|0;c[e>>2]=b&33554431;c[e+4>>2]=0;return}function xa(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0;g=l;l=l+1216|0;h=g+1064|0;i=g+912|0;j=g+760|0;k=g+608|0;m=g+456|0;n=g+304|0;o=g+152|0;p=g;mc(i+8|0,0,144)|0;q=i;c[q>>2]=1;c[q+4>>2]=0;mc(j+8|0,0,144)|0;q=j;c[q>>2]=1;c[q+4>>2]=0;mc(k|0,0,152)|0;mc(m|0,0,152)|0;mc(n+8|0,0,144)|0;q=n;c[q>>2]=1;c[q+4>>2]=0;mc(o|0,0,152)|0;mc(p+8|0,0,144)|0;q=p;c[q>>2]=1;c[q+4>>2]=0;q=h+80|0;r=q+72|0;do{c[q>>2]=0;q=q+4|0}while((q|0)<(r|0));q=h;s=f;r=q+80|0;do{c[q>>2]=c[s>>2];q=q+4|0;s=s+4|0}while((q|0)<(r|0));t=h;h=0;u=p;p=o;o=n;n=m;m=i;i=k;k=j;while(1){j=a[e+(31-h)>>0]|0;v=0;w=u;x=p;y=o;z=n;A=m;B=i;C=k;D=t;while(1){E=j&255;F=E>>>7;Ka(C,D,F,0);Ka(B,A,F,0);La(x,w,z,y,C,B,D,A,f);Ka(x,z,F,0);Ka(w,y,F,0);v=v+1|0;if((v|0)==8)break;else{F=D;G=A;H=C;I=B;j=E<<1&255;D=z;C=x;B=w;A=y;z=F;y=G;x=H;w=I}}h=h+1|0;if((h|0)==32)break;else{t=z;u=B;p=C;o=A;n=D;m=y;i=w;k=x}}q=b;s=x;r=q+80|0;do{c[q>>2]=c[s>>2];q=q+4|0;s=s+4|0}while((q|0)<(r|0));q=d;s=w;r=q+80|0;do{c[q>>2]=c[s>>2];q=q+4|0;s=s+4|0}while((q|0)<(r|0));l=g;return}function ya(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;c=l;l=l+800|0;d=c+720|0;e=c+640|0;f=c+560|0;g=c+480|0;h=c+400|0;i=c+320|0;j=c+240|0;k=c+160|0;m=c+80|0;n=c;Ia(d,b);Ia(n,d);Ia(m,n);za(e,m,b);za(f,e,d);Ia(m,f);za(g,m,e);Ia(m,g);Ia(n,m);Ia(m,n);Ia(n,m);Ia(m,n);za(h,m,g);Ia(m,h);Ia(n,m);Ia(m,n);Ia(n,m);Ia(m,n);Ia(n,m);Ia(m,n);Ia(n,m);Ia(m,n);Ia(n,m);za(i,n,h);Ia(m,i);Ia(n,m);Ia(m,n);Ia(n,m);Ia(m,n);Ia(n,m);Ia(m,n);Ia(n,m);Ia(m,n);Ia(n,m);Ia(m,n);Ia(n,m);Ia(m,n);Ia(n,m);Ia(m,n);Ia(n,m);Ia(m,n);Ia(n,m);Ia(m,n);Ia(n,m);za(m,n,i);Ia(n,m);Ia(m,n);Ia(n,m);Ia(m,n);Ia(n,m);Ia(m,n);Ia(n,m);Ia(m,n);Ia(n,m);Ia(m,n);za(j,m,h);Ia(m,j);Ia(n,m);h=2;do{Ia(m,n);Ia(n,m);h=h+2|0}while((h|0)<50);za(k,n,j);Ia(n,k);Ia(m,n);h=2;do{Ia(n,m);Ia(m,n);h=h+2|0}while((h|0)<100);za(n,m,k);Ia(m,n);Ia(n,m);k=2;do{Ia(m,n);Ia(n,m);k=k+2|0}while((k|0)<50);za(m,n,j);Ia(n,m);Ia(m,n);Ia(n,m);Ia(m,n);Ia(n,m);za(a,n,f);l=c;return}function za(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;e=l;l=l+160|0;f=e;Da(f,b,d);Ea(f);Fa(f);d=a;a=f;f=d+80|0;do{c[d>>2]=c[a>>2];d=d+4|0;a=a+4|0}while((d|0)<(f|0));l=e;return}function Aa(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0;e=l;l=l+48|0;f=e;g=c[d>>2]|0;c[f>>2]=g;h=c[d+8>>2]|0;i=f+4|0;c[i>>2]=h;j=c[d+16>>2]|0;k=f+8|0;c[k>>2]=j;m=c[d+24>>2]|0;n=f+12|0;c[n>>2]=m;o=c[d+32>>2]|0;p=f+16|0;c[p>>2]=o;q=c[d+40>>2]|0;r=f+20|0;c[r>>2]=q;s=c[d+48>>2]|0;t=f+24|0;c[t>>2]=s;u=c[d+56>>2]|0;v=f+28|0;c[v>>2]=u;w=c[d+64>>2]|0;x=f+32|0;c[x>>2]=w;y=c[d+72>>2]|0;d=f+36|0;c[d>>2]=y;z=(g>>31&g)>>26;A=z+h|0;h=(A>>31&A)>>25;B=h+j|0;j=(B>>31&B)>>26;C=j+m|0;m=(C>>31&C)>>25;D=m+o|0;o=(D>>31&D)>>26;E=o+q|0;q=(E>>31&E)>>25;F=q+s|0;s=(F>>31&F)>>26;G=s+u|0;u=(G>>31&G)>>25;H=u+w|0;w=(H>>31&H)>>26;I=w+y|0;y=(I>>31&I)>>25;J=(y*19|0)+((0-z<<26)+g)|0;g=(J>>31&J)>>26;z=g+((0-h<<25)+A)|0;A=(z>>31&z)>>25;h=(0-A<<25)+z|0;z=A+((0-j<<26)+B)|0;B=(z>>31&z)>>26;j=(0-B<<26)+z|0;z=B+((0-m<<25)+C)|0;C=(z>>31&z)>>25;m=(0-C<<25)+z|0;z=C+((0-o<<26)+D)|0;D=(z>>31&z)>>26;o=(0-D<<26)+z|0;z=D+((0-q<<25)+E)|0;E=(z>>31&z)>>25;q=(0-E<<25)+z|0;z=E+((0-s<<26)+F)|0;F=(z>>31&z)>>26;s=(0-F<<26)+z|0;z=F+((0-u<<25)+G)|0;G=(z>>31&z)>>25;u=(0-G<<25)+z|0;z=G+((0-w<<26)+H)|0;H=(z>>31&z)>>26;w=(0-H<<26)+z|0;z=H+((N(y,-33554432)|0)+I)|0;I=(z>>31&z)>>25;y=(N(I,-33554432)|0)+z|0;z=(I*19|0)+((0-g<<26)+J)|0;c[i>>2]=h;c[k>>2]=j;c[n>>2]=m;c[p>>2]=o;c[r>>2]=q;c[t>>2]=s;c[v>>2]=u;c[x>>2]=w;c[d>>2]=y;c[f>>2]=z;J=(z>>31&z)>>26;g=(N(J,-67108864)|0)+z|0;z=J+h+(g>>26)|0;h=j+(z>>25)|0;j=m+(h>>26)|0;m=o+(j>>25)|0;o=q+(m>>26)|0;q=s+(o>>25)|0;s=u+(q>>26)|0;u=w+(s>>25)|0;w=y+(u>>26)|0;y=(w>>25)*19|0;J=(g&67108863)+y>>26;I=(z&33554431)+J>>25;H=z+J&33554431;J=(h&67108863)+I>>26;z=h+I&67108863;I=(j&33554431)+J>>25;h=j+J&33554431;J=(m&67108863)+I>>26;j=m+I&67108863;I=(o&33554431)+J>>25;m=o+J&33554431;J=(q&67108863)+I>>26;o=q+I&67108863;I=(s&33554431)+J>>25;q=s+J&33554431;J=(u&67108863)+I>>26;s=u+I&67108863;I=w+J&33554431;u=(g+y&67108863)+(((w&33554431)+J>>25)*19|0)|0;J=Ba(u)|0;w=(Ca(H,33554431)|0)&J;J=(Ca(z,67108863)|0)&w;w=(Ca(h,33554431)|0)&J;J=(Ca(j,67108863)|0)&w;w=(Ca(m,33554431)|0)&J;J=(Ca(o,67108863)|0)&w;w=(Ca(q,33554431)|0)&J;J=(Ca(s,67108863)|0)&w;w=(Ca(I,33554431)|0)&J;J=u-(w&67108845)|0;c[f>>2]=J;f=w&33554431;u=H-f|0;H=w&67108863;w=z-H|0;z=h-f|0;h=j-H|0;c[r>>2]=m-f;m=o-H|0;o=u<<2;c[i>>2]=o;i=w<<3;c[k>>2]=i;k=z<<5;c[n>>2]=k;n=h<<6;c[p>>2]=n;p=m<<1;c[t>>2]=p;c[v>>2]=q-f<<3;c[x>>2]=s-H<<4;c[d>>2]=I-f<<6;a[b>>0]=J;a[b+1>>0]=J>>>8;a[b+2>>0]=J>>>16;a[b+3>>0]=o|J>>>24;a[b+4>>0]=u>>>6;a[b+5>>0]=u>>>14;a[b+6>>0]=i|u>>>22;a[b+7>>0]=w>>>5;a[b+8>>0]=w>>>13;a[b+9>>0]=k|w>>>21;a[b+10>>0]=z>>>3;a[b+11>>0]=z>>>11;a[b+12>>0]=n|z>>>19;a[b+13>>0]=h>>>2;a[b+14>>0]=h>>>10;a[b+15>>0]=h>>>18;h=c[r>>2]|0;a[b+16>>0]=h;a[b+17>>0]=h>>>8;a[b+18>>0]=h>>>16;a[b+19>>0]=p|h>>>24;a[b+20>>0]=m>>>7;m=c[t>>2]|0;a[b+21>>0]=m>>>16;t=c[v>>2]|0;a[b+22>>0]=t|m>>>24;a[b+23>>0]=t>>>8;a[b+24>>0]=t>>>16;m=c[x>>2]|0;a[b+25>>0]=m|t>>>24;a[b+26>>0]=m>>>8;a[b+27>>0]=m>>>16;t=c[d>>2]|0;a[b+28>>0]=t|m>>>24;a[b+29>>0]=t>>>8;a[b+30>>0]=t>>>16;a[b+31>>0]=t>>>24;l=e;return}function Ba(a){a=a|0;return ~(a+-67108845>>31)|0}function Ca(a,b){a=a|0;b=b|0;var c=0;c=~a^b;b=c<<16&c;c=b<<8&b;b=c<<4&c;c=b<<2&b;return (c<<1&c)>>31|0}function Da(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,z=0,A=0,B=0;e=jc(0,c[b>>2]|0,32)|0;f=y;g=jc(0,c[d>>2]|0,32)|0;h=qc(g|0,y|0,e|0,f|0)|0;f=a;c[f>>2]=h;c[f+4>>2]=y;f=jc(0,c[b>>2]|0,32)|0;h=y;e=d+8|0;g=jc(0,c[e>>2]|0,32)|0;i=qc(g|0,y|0,f|0,h|0)|0;h=y;f=b+8|0;g=jc(0,c[f>>2]|0,32)|0;j=y;k=jc(0,c[d>>2]|0,32)|0;l=qc(k|0,y|0,g|0,j|0)|0;j=lc(l|0,y|0,i|0,h|0)|0;h=a+8|0;c[h>>2]=j;c[h+4>>2]=y;h=jc(0,c[f>>2]|0,31)|0;j=y;i=jc(0,c[e>>2]|0,32)|0;l=qc(i|0,y|0,h|0,j|0)|0;j=y;h=jc(0,c[b>>2]|0,32)|0;i=y;g=d+16|0;k=jc(0,c[g>>2]|0,32)|0;m=qc(k|0,y|0,h|0,i|0)|0;i=lc(m|0,y|0,l|0,j|0)|0;j=y;l=b+16|0;m=jc(0,c[l>>2]|0,32)|0;h=y;k=jc(0,c[d>>2]|0,32)|0;n=qc(k|0,y|0,m|0,h|0)|0;h=lc(i|0,j|0,n|0,y|0)|0;n=a+16|0;c[n>>2]=h;c[n+4>>2]=y;n=jc(0,c[f>>2]|0,32)|0;h=y;j=jc(0,c[g>>2]|0,32)|0;i=qc(j|0,y|0,n|0,h|0)|0;h=y;n=jc(0,c[l>>2]|0,32)|0;j=y;m=jc(0,c[e>>2]|0,32)|0;k=qc(m|0,y|0,n|0,j|0)|0;j=lc(k|0,y|0,i|0,h|0)|0;h=y;i=jc(0,c[b>>2]|0,32)|0;k=y;n=d+24|0;m=jc(0,c[n>>2]|0,32)|0;o=qc(m|0,y|0,i|0,k|0)|0;k=lc(j|0,h|0,o|0,y|0)|0;o=y;h=b+24|0;j=jc(0,c[h>>2]|0,32)|0;i=y;m=jc(0,c[d>>2]|0,32)|0;p=qc(m|0,y|0,j|0,i|0)|0;i=lc(k|0,o|0,p|0,y|0)|0;p=a+24|0;c[p>>2]=i;c[p+4>>2]=y;p=jc(0,c[l>>2]|0,32)|0;i=y;o=jc(0,c[g>>2]|0,32)|0;k=qc(o|0,y|0,p|0,i|0)|0;i=y;p=jc(0,c[f>>2]|0,32)|0;o=y;j=jc(0,c[n>>2]|0,32)|0;m=qc(j|0,y|0,p|0,o|0)|0;o=y;p=jc(0,c[h>>2]|0,32)|0;j=y;q=jc(0,c[e>>2]|0,32)|0;r=qc(q|0,y|0,p|0,j|0)|0;j=lc(r|0,y|0,m|0,o|0)|0;o=oc(j|0,y|0,1)|0;j=lc(o|0,y|0,k|0,i|0)|0;i=y;k=jc(0,c[b>>2]|0,32)|0;o=y;m=d+32|0;r=jc(0,c[m>>2]|0,32)|0;p=qc(r|0,y|0,k|0,o|0)|0;o=lc(j|0,i|0,p|0,y|0)|0;p=y;i=b+32|0;j=jc(0,c[i>>2]|0,32)|0;k=y;r=jc(0,c[d>>2]|0,32)|0;q=qc(r|0,y|0,j|0,k|0)|0;k=lc(o|0,p|0,q|0,y|0)|0;q=a+32|0;c[q>>2]=k;c[q+4>>2]=y;q=jc(0,c[l>>2]|0,32)|0;k=y;p=jc(0,c[n>>2]|0,32)|0;o=qc(p|0,y|0,q|0,k|0)|0;k=y;q=jc(0,c[h>>2]|0,32)|0;p=y;j=jc(0,c[g>>2]|0,32)|0;r=qc(j|0,y|0,q|0,p|0)|0;p=lc(r|0,y|0,o|0,k|0)|0;k=y;o=jc(0,c[f>>2]|0,32)|0;r=y;q=jc(0,c[m>>2]|0,32)|0;j=qc(q|0,y|0,o|0,r|0)|0;r=lc(p|0,k|0,j|0,y|0)|0;j=y;k=jc(0,c[i>>2]|0,32)|0;p=y;o=jc(0,c[e>>2]|0,32)|0;q=qc(o|0,y|0,k|0,p|0)|0;p=lc(r|0,j|0,q|0,y|0)|0;q=y;j=jc(0,c[b>>2]|0,32)|0;r=y;k=d+40|0;o=jc(0,c[k>>2]|0,32)|0;s=qc(o|0,y|0,j|0,r|0)|0;r=lc(p|0,q|0,s|0,y|0)|0;s=y;q=b+40|0;p=jc(0,c[q>>2]|0,32)|0;j=y;o=jc(0,c[d>>2]|0,32)|0;t=qc(o|0,y|0,p|0,j|0)|0;j=lc(r|0,s|0,t|0,y|0)|0;t=a+40|0;c[t>>2]=j;c[t+4>>2]=y;t=jc(0,c[h>>2]|0,32)|0;j=y;s=jc(0,c[n>>2]|0,32)|0;r=qc(s|0,y|0,t|0,j|0)|0;j=y;t=jc(0,c[f>>2]|0,32)|0;s=y;p=jc(0,c[k>>2]|0,32)|0;o=qc(p|0,y|0,t|0,s|0)|0;s=lc(o|0,y|0,r|0,j|0)|0;j=y;r=jc(0,c[q>>2]|0,32)|0;o=y;t=jc(0,c[e>>2]|0,32)|0;p=qc(t|0,y|0,r|0,o|0)|0;o=lc(s|0,j|0,p|0,y|0)|0;p=oc(o|0,y|0,1)|0;o=y;j=jc(0,c[l>>2]|0,32)|0;s=y;r=jc(0,c[m>>2]|0,32)|0;t=qc(r|0,y|0,j|0,s|0)|0;s=lc(p|0,o|0,t|0,y|0)|0;t=y;o=jc(0,c[i>>2]|0,32)|0;p=y;j=jc(0,c[g>>2]|0,32)|0;r=qc(j|0,y|0,o|0,p|0)|0;p=lc(s|0,t|0,r|0,y|0)|0;r=y;t=jc(0,c[b>>2]|0,32)|0;s=y;o=d+48|0;j=jc(0,c[o>>2]|0,32)|0;u=qc(j|0,y|0,t|0,s|0)|0;s=lc(p|0,r|0,u|0,y|0)|0;u=y;r=b+48|0;p=jc(0,c[r>>2]|0,32)|0;t=y;j=jc(0,c[d>>2]|0,32)|0;v=qc(j|0,y|0,p|0,t|0)|0;t=lc(s|0,u|0,v|0,y|0)|0;v=a+48|0;c[v>>2]=t;c[v+4>>2]=y;v=jc(0,c[h>>2]|0,32)|0;t=y;u=jc(0,c[m>>2]|0,32)|0;s=qc(u|0,y|0,v|0,t|0)|0;t=y;v=jc(0,c[i>>2]|0,32)|0;u=y;p=jc(0,c[n>>2]|0,32)|0;j=qc(p|0,y|0,v|0,u|0)|0;u=lc(j|0,y|0,s|0,t|0)|0;t=y;s=jc(0,c[l>>2]|0,32)|0;j=y;v=jc(0,c[k>>2]|0,32)|0;p=qc(v|0,y|0,s|0,j|0)|0;j=lc(u|0,t|0,p|0,y|0)|0;p=y;t=jc(0,c[q>>2]|0,32)|0;u=y;s=jc(0,c[g>>2]|0,32)|0;v=qc(s|0,y|0,t|0,u|0)|0;u=lc(j|0,p|0,v|0,y|0)|0;v=y;p=jc(0,c[f>>2]|0,32)|0;j=y;t=jc(0,c[o>>2]|0,32)|0;s=qc(t|0,y|0,p|0,j|0)|0;j=lc(u|0,v|0,s|0,y|0)|0;s=y;v=jc(0,c[r>>2]|0,32)|0;u=y;p=jc(0,c[e>>2]|0,32)|0;t=qc(p|0,y|0,v|0,u|0)|0;u=lc(j|0,s|0,t|0,y|0)|0;t=y;s=jc(0,c[b>>2]|0,32)|0;j=y;v=d+56|0;p=jc(0,c[v>>2]|0,32)|0;w=qc(p|0,y|0,s|0,j|0)|0;j=lc(u|0,t|0,w|0,y|0)|0;w=y;t=b+56|0;u=jc(0,c[t>>2]|0,32)|0;s=y;p=jc(0,c[d>>2]|0,32)|0;x=qc(p|0,y|0,u|0,s|0)|0;s=lc(j|0,w|0,x|0,y|0)|0;x=a+56|0;c[x>>2]=s;c[x+4>>2]=y;x=jc(0,c[i>>2]|0,32)|0;s=y;w=jc(0,c[m>>2]|0,32)|0;j=qc(w|0,y|0,x|0,s|0)|0;s=y;x=jc(0,c[h>>2]|0,32)|0;w=y;u=jc(0,c[k>>2]|0,32)|0;p=qc(u|0,y|0,x|0,w|0)|0;w=y;x=jc(0,c[q>>2]|0,32)|0;u=y;z=jc(0,c[n>>2]|0,32)|0;A=qc(z|0,y|0,x|0,u|0)|0;u=lc(A|0,y|0,p|0,w|0)|0;w=y;p=jc(0,c[f>>2]|0,32)|0;A=y;x=jc(0,c[v>>2]|0,32)|0;z=qc(x|0,y|0,p|0,A|0)|0;A=lc(u|0,w|0,z|0,y|0)|0;z=y;w=jc(0,c[t>>2]|0,32)|0;u=y;p=jc(0,c[e>>2]|0,32)|0;x=qc(p|0,y|0,w|0,u|0)|0;u=lc(A|0,z|0,x|0,y|0)|0;x=oc(u|0,y|0,1)|0;u=lc(x|0,y|0,j|0,s|0)|0;s=y;j=jc(0,c[l>>2]|0,32)|0;x=y;z=jc(0,c[o>>2]|0,32)|0;A=qc(z|0,y|0,j|0,x|0)|0;x=lc(u|0,s|0,A|0,y|0)|0;A=y;s=jc(0,c[r>>2]|0,32)|0;u=y;j=jc(0,c[g>>2]|0,32)|0;z=qc(j|0,y|0,s|0,u|0)|0;u=lc(x|0,A|0,z|0,y|0)|0;z=y;A=jc(0,c[b>>2]|0,32)|0;x=y;s=d+64|0;j=jc(0,c[s>>2]|0,32)|0;w=qc(j|0,y|0,A|0,x|0)|0;x=lc(u|0,z|0,w|0,y|0)|0;w=y;z=b+64|0;u=jc(0,c[z>>2]|0,32)|0;A=y;j=jc(0,c[d>>2]|0,32)|0;p=qc(j|0,y|0,u|0,A|0)|0;A=lc(x|0,w|0,p|0,y|0)|0;p=a+64|0;c[p>>2]=A;c[p+4>>2]=y;p=jc(0,c[i>>2]|0,32)|0;A=y;w=jc(0,c[k>>2]|0,32)|0;x=qc(w|0,y|0,p|0,A|0)|0;A=y;p=jc(0,c[q>>2]|0,32)|0;w=y;u=jc(0,c[m>>2]|0,32)|0;j=qc(u|0,y|0,p|0,w|0)|0;w=lc(j|0,y|0,x|0,A|0)|0;A=y;x=jc(0,c[h>>2]|0,32)|0;j=y;p=jc(0,c[o>>2]|0,32)|0;u=qc(p|0,y|0,x|0,j|0)|0;j=lc(w|0,A|0,u|0,y|0)|0;u=y;A=jc(0,c[r>>2]|0,32)|0;w=y;x=jc(0,c[n>>2]|0,32)|0;p=qc(x|0,y|0,A|0,w|0)|0;w=lc(j|0,u|0,p|0,y|0)|0;p=y;u=jc(0,c[l>>2]|0,32)|0;j=y;A=jc(0,c[v>>2]|0,32)|0;x=qc(A|0,y|0,u|0,j|0)|0;j=lc(w|0,p|0,x|0,y|0)|0;x=y;p=jc(0,c[t>>2]|0,32)|0;w=y;u=jc(0,c[g>>2]|0,32)|0;A=qc(u|0,y|0,p|0,w|0)|0;w=lc(j|0,x|0,A|0,y|0)|0;A=y;x=jc(0,c[f>>2]|0,32)|0;j=y;p=jc(0,c[s>>2]|0,32)|0;u=qc(p|0,y|0,x|0,j|0)|0;j=lc(w|0,A|0,u|0,y|0)|0;u=y;A=jc(0,c[z>>2]|0,32)|0;w=y;x=jc(0,c[e>>2]|0,32)|0;p=qc(x|0,y|0,A|0,w|0)|0;w=lc(j|0,u|0,p|0,y|0)|0;p=y;u=jc(0,c[b>>2]|0,32)|0;j=y;A=d+72|0;x=jc(0,c[A>>2]|0,32)|0;B=qc(x|0,y|0,u|0,j|0)|0;j=lc(w|0,p|0,B|0,y|0)|0;B=y;p=b+72|0;b=jc(0,c[p>>2]|0,32)|0;w=y;u=jc(0,c[d>>2]|0,32)|0;d=qc(u|0,y|0,b|0,w|0)|0;w=lc(j|0,B|0,d|0,y|0)|0;d=a+72|0;c[d>>2]=w;c[d+4>>2]=y;d=jc(0,c[q>>2]|0,32)|0;w=y;B=jc(0,c[k>>2]|0,32)|0;j=qc(B|0,y|0,d|0,w|0)|0;w=y;d=jc(0,c[h>>2]|0,32)|0;B=y;b=jc(0,c[v>>2]|0,32)|0;u=qc(b|0,y|0,d|0,B|0)|0;B=lc(u|0,y|0,j|0,w|0)|0;w=y;j=jc(0,c[t>>2]|0,32)|0;u=y;d=jc(0,c[n>>2]|0,32)|0;b=qc(d|0,y|0,j|0,u|0)|0;u=lc(B|0,w|0,b|0,y|0)|0;b=y;w=jc(0,c[f>>2]|0,32)|0;f=y;B=jc(0,c[A>>2]|0,32)|0;j=qc(B|0,y|0,w|0,f|0)|0;f=lc(u|0,b|0,j|0,y|0)|0;j=y;b=jc(0,c[p>>2]|0,32)|0;u=y;w=jc(0,c[e>>2]|0,32)|0;e=qc(w|0,y|0,b|0,u|0)|0;u=lc(f|0,j|0,e|0,y|0)|0;e=oc(u|0,y|0,1)|0;u=y;j=jc(0,c[i>>2]|0,32)|0;f=y;b=jc(0,c[o>>2]|0,32)|0;w=qc(b|0,y|0,j|0,f|0)|0;f=lc(e|0,u|0,w|0,y|0)|0;w=y;u=jc(0,c[r>>2]|0,32)|0;e=y;j=jc(0,c[m>>2]|0,32)|0;b=qc(j|0,y|0,u|0,e|0)|0;e=lc(f|0,w|0,b|0,y|0)|0;b=y;w=jc(0,c[l>>2]|0,32)|0;f=y;u=jc(0,c[s>>2]|0,32)|0;j=qc(u|0,y|0,w|0,f|0)|0;f=lc(e|0,b|0,j|0,y|0)|0;j=y;b=jc(0,c[z>>2]|0,32)|0;e=y;w=jc(0,c[g>>2]|0,32)|0;u=qc(w|0,y|0,b|0,e|0)|0;e=lc(f|0,j|0,u|0,y|0)|0;u=a+80|0;c[u>>2]=e;c[u+4>>2]=y;u=jc(0,c[q>>2]|0,32)|0;e=y;j=jc(0,c[o>>2]|0,32)|0;f=qc(j|0,y|0,u|0,e|0)|0;e=y;u=jc(0,c[r>>2]|0,32)|0;j=y;b=jc(0,c[k>>2]|0,32)|0;w=qc(b|0,y|0,u|0,j|0)|0;j=lc(w|0,y|0,f|0,e|0)|0;e=y;f=jc(0,c[i>>2]|0,32)|0;w=y;u=jc(0,c[v>>2]|0,32)|0;b=qc(u|0,y|0,f|0,w|0)|0;w=lc(j|0,e|0,b|0,y|0)|0;b=y;e=jc(0,c[t>>2]|0,32)|0;j=y;f=jc(0,c[m>>2]|0,32)|0;u=qc(f|0,y|0,e|0,j|0)|0;j=lc(w|0,b|0,u|0,y|0)|0;u=y;b=jc(0,c[h>>2]|0,32)|0;w=y;e=jc(0,c[s>>2]|0,32)|0;f=qc(e|0,y|0,b|0,w|0)|0;w=lc(j|0,u|0,f|0,y|0)|0;f=y;u=jc(0,c[z>>2]|0,32)|0;j=y;b=jc(0,c[n>>2]|0,32)|0;e=qc(b|0,y|0,u|0,j|0)|0;j=lc(w|0,f|0,e|0,y|0)|0;e=y;f=jc(0,c[l>>2]|0,32)|0;l=y;w=jc(0,c[A>>2]|0,32)|0;u=qc(w|0,y|0,f|0,l|0)|0;l=lc(j|0,e|0,u|0,y|0)|0;u=y;e=jc(0,c[p>>2]|0,32)|0;j=y;f=jc(0,c[g>>2]|0,32)|0;g=qc(f|0,y|0,e|0,j|0)|0;j=lc(l|0,u|0,g|0,y|0)|0;g=a+88|0;c[g>>2]=j;c[g+4>>2]=y;g=jc(0,c[r>>2]|0,32)|0;j=y;u=jc(0,c[o>>2]|0,32)|0;l=qc(u|0,y|0,g|0,j|0)|0;j=y;g=jc(0,c[q>>2]|0,32)|0;u=y;e=jc(0,c[v>>2]|0,32)|0;f=qc(e|0,y|0,g|0,u|0)|0;u=y;g=jc(0,c[t>>2]|0,32)|0;e=y;w=jc(0,c[k>>2]|0,32)|0;b=qc(w|0,y|0,g|0,e|0)|0;e=lc(b|0,y|0,f|0,u|0)|0;u=y;f=jc(0,c[h>>2]|0,32)|0;h=y;b=jc(0,c[A>>2]|0,32)|0;g=qc(b|0,y|0,f|0,h|0)|0;h=lc(e|0,u|0,g|0,y|0)|0;g=y;u=jc(0,c[p>>2]|0,32)|0;e=y;f=jc(0,c[n>>2]|0,32)|0;n=qc(f|0,y|0,u|0,e|0)|0;e=lc(h|0,g|0,n|0,y|0)|0;n=oc(e|0,y|0,1)|0;e=lc(n|0,y|0,l|0,j|0)|0;j=y;l=jc(0,c[i>>2]|0,32)|0;n=y;g=jc(0,c[s>>2]|0,32)|0;h=qc(g|0,y|0,l|0,n|0)|0;n=lc(e|0,j|0,h|0,y|0)|0;h=y;j=jc(0,c[z>>2]|0,32)|0;e=y;l=jc(0,c[m>>2]|0,32)|0;g=qc(l|0,y|0,j|0,e|0)|0;e=lc(n|0,h|0,g|0,y|0)|0;g=a+96|0;c[g>>2]=e;c[g+4>>2]=y;g=jc(0,c[r>>2]|0,32)|0;e=y;h=jc(0,c[v>>2]|0,32)|0;n=qc(h|0,y|0,g|0,e|0)|0;e=y;g=jc(0,c[t>>2]|0,32)|0;h=y;j=jc(0,c[o>>2]|0,32)|0;l=qc(j|0,y|0,g|0,h|0)|0;h=lc(l|0,y|0,n|0,e|0)|0;e=y;n=jc(0,c[q>>2]|0,32)|0;l=y;g=jc(0,c[s>>2]|0,32)|0;j=qc(g|0,y|0,n|0,l|0)|0;l=lc(h|0,e|0,j|0,y|0)|0;j=y;e=jc(0,c[z>>2]|0,32)|0;h=y;n=jc(0,c[k>>2]|0,32)|0;g=qc(n|0,y|0,e|0,h|0)|0;h=lc(l|0,j|0,g|0,y|0)|0;g=y;j=jc(0,c[i>>2]|0,32)|0;i=y;l=jc(0,c[A>>2]|0,32)|0;e=qc(l|0,y|0,j|0,i|0)|0;i=lc(h|0,g|0,e|0,y|0)|0;e=y;g=jc(0,c[p>>2]|0,32)|0;h=y;j=jc(0,c[m>>2]|0,32)|0;m=qc(j|0,y|0,g|0,h|0)|0;h=lc(i|0,e|0,m|0,y|0)|0;m=a+104|0;c[m>>2]=h;c[m+4>>2]=y;m=jc(0,c[t>>2]|0,32)|0;h=y;e=jc(0,c[v>>2]|0,32)|0;i=qc(e|0,y|0,m|0,h|0)|0;h=y;m=jc(0,c[q>>2]|0,32)|0;q=y;e=jc(0,c[A>>2]|0,32)|0;g=qc(e|0,y|0,m|0,q|0)|0;q=lc(g|0,y|0,i|0,h|0)|0;h=y;i=jc(0,c[p>>2]|0,32)|0;g=y;m=jc(0,c[k>>2]|0,32)|0;k=qc(m|0,y|0,i|0,g|0)|0;g=lc(q|0,h|0,k|0,y|0)|0;k=oc(g|0,y|0,1)|0;g=y;h=jc(0,c[r>>2]|0,32)|0;q=y;i=jc(0,c[s>>2]|0,32)|0;m=qc(i|0,y|0,h|0,q|0)|0;q=lc(k|0,g|0,m|0,y|0)|0;m=y;g=jc(0,c[z>>2]|0,32)|0;k=y;h=jc(0,c[o>>2]|0,32)|0;i=qc(h|0,y|0,g|0,k|0)|0;k=lc(q|0,m|0,i|0,y|0)|0;i=a+112|0;c[i>>2]=k;c[i+4>>2]=y;i=jc(0,c[t>>2]|0,32)|0;k=y;m=jc(0,c[s>>2]|0,32)|0;q=qc(m|0,y|0,i|0,k|0)|0;k=y;i=jc(0,c[z>>2]|0,32)|0;m=y;g=jc(0,c[v>>2]|0,32)|0;h=qc(g|0,y|0,i|0,m|0)|0;m=lc(h|0,y|0,q|0,k|0)|0;k=y;q=jc(0,c[r>>2]|0,32)|0;r=y;h=jc(0,c[A>>2]|0,32)|0;i=qc(h|0,y|0,q|0,r|0)|0;r=lc(m|0,k|0,i|0,y|0)|0;i=y;k=jc(0,c[p>>2]|0,32)|0;m=y;q=jc(0,c[o>>2]|0,32)|0;o=qc(q|0,y|0,k|0,m|0)|0;m=lc(r|0,i|0,o|0,y|0)|0;o=a+120|0;c[o>>2]=m;c[o+4>>2]=y;o=jc(0,c[z>>2]|0,32)|0;m=y;i=jc(0,c[s>>2]|0,32)|0;r=qc(i|0,y|0,o|0,m|0)|0;m=y;o=jc(0,c[t>>2]|0,32)|0;t=y;i=jc(0,c[A>>2]|0,32)|0;k=qc(i|0,y|0,o|0,t|0)|0;t=y;o=jc(0,c[p>>2]|0,32)|0;i=y;q=jc(0,c[v>>2]|0,32)|0;v=qc(q|0,y|0,o|0,i|0)|0;i=lc(v|0,y|0,k|0,t|0)|0;t=oc(i|0,y|0,1)|0;i=lc(t|0,y|0,r|0,m|0)|0;m=a+128|0;c[m>>2]=i;c[m+4>>2]=y;m=jc(0,c[z>>2]|0,32)|0;z=y;i=jc(0,c[A>>2]|0,32)|0;r=qc(i|0,y|0,m|0,z|0)|0;z=y;m=jc(0,c[p>>2]|0,32)|0;i=y;t=jc(0,c[s>>2]|0,32)|0;s=qc(t|0,y|0,m|0,i|0)|0;i=lc(s|0,y|0,r|0,z|0)|0;z=a+136|0;c[z>>2]=i;c[z+4>>2]=y;z=jc(0,c[p>>2]|0,31)|0;p=y;i=jc(0,c[A>>2]|0,32)|0;A=qc(i|0,y|0,z|0,p|0)|0;p=a+144|0;c[p>>2]=A;c[p+4>>2]=y;return}function Ea(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0;b=a+144|0;d=c[b>>2]|0;e=c[b+4>>2]|0;b=a+64|0;f=b;g=c[f>>2]|0;h=c[f+4>>2]|0;f=qc(d|0,e|0,18,0)|0;i=y;j=lc(g|0,h|0,d|0,e|0)|0;e=lc(j|0,y|0,f|0,i|0)|0;i=b;c[i>>2]=e;c[i+4>>2]=y;i=a+136|0;e=c[i>>2]|0;b=c[i+4>>2]|0;i=a+56|0;f=i;j=c[f>>2]|0;d=c[f+4>>2]|0;f=qc(e|0,b|0,18,0)|0;h=y;g=lc(j|0,d|0,e|0,b|0)|0;b=lc(g|0,y|0,f|0,h|0)|0;h=i;c[h>>2]=b;c[h+4>>2]=y;h=a+128|0;b=c[h>>2]|0;i=c[h+4>>2]|0;h=a+48|0;f=h;g=c[f>>2]|0;e=c[f+4>>2]|0;f=qc(b|0,i|0,18,0)|0;d=y;j=lc(g|0,e|0,b|0,i|0)|0;i=lc(j|0,y|0,f|0,d|0)|0;d=h;c[d>>2]=i;c[d+4>>2]=y;d=a+120|0;i=c[d>>2]|0;h=c[d+4>>2]|0;d=a+40|0;f=d;j=c[f>>2]|0;b=c[f+4>>2]|0;f=qc(i|0,h|0,18,0)|0;e=y;g=lc(j|0,b|0,i|0,h|0)|0;h=lc(g|0,y|0,f|0,e|0)|0;e=d;c[e>>2]=h;c[e+4>>2]=y;e=a+112|0;h=c[e>>2]|0;d=c[e+4>>2]|0;e=a+32|0;f=e;g=c[f>>2]|0;i=c[f+4>>2]|0;f=qc(h|0,d|0,18,0)|0;b=y;j=lc(g|0,i|0,h|0,d|0)|0;d=lc(j|0,y|0,f|0,b|0)|0;b=e;c[b>>2]=d;c[b+4>>2]=y;b=a+104|0;d=c[b>>2]|0;e=c[b+4>>2]|0;b=a+24|0;f=b;j=c[f>>2]|0;h=c[f+4>>2]|0;f=qc(d|0,e|0,18,0)|0;i=y;g=lc(j|0,h|0,d|0,e|0)|0;e=lc(g|0,y|0,f|0,i|0)|0;i=b;c[i>>2]=e;c[i+4>>2]=y;i=a+96|0;e=c[i>>2]|0;b=c[i+4>>2]|0;i=a+16|0;f=i;g=c[f>>2]|0;d=c[f+4>>2]|0;f=qc(e|0,b|0,18,0)|0;h=y;j=lc(g|0,d|0,e|0,b|0)|0;b=lc(j|0,y|0,f|0,h|0)|0;h=i;c[h>>2]=b;c[h+4>>2]=y;h=a+88|0;b=c[h>>2]|0;i=c[h+4>>2]|0;h=a+8|0;f=h;j=c[f>>2]|0;e=c[f+4>>2]|0;f=qc(b|0,i|0,18,0)|0;d=y;g=lc(j|0,e|0,b|0,i|0)|0;i=lc(g|0,y|0,f|0,d|0)|0;d=h;c[d>>2]=i;c[d+4>>2]=y;d=a+80|0;i=c[d>>2]|0;h=c[d+4>>2]|0;d=oc(i|0,h|0,4)|0;f=a;g=lc(c[f>>2]|0,c[f+4>>2]|0,d|0,y|0)|0;d=y;f=oc(i|0,h|0,1)|0;b=lc(g|0,d|0,f|0,y|0)|0;f=lc(b|0,y|0,i|0,h|0)|0;h=a;c[h>>2]=f;c[h+4>>2]=y;return}function Fa(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;b=a;d=c[b>>2]|0;e=c[b+4>>2]|0;b=Ga(d,e)|0;f=y;g=oc(b|0,f|0,26)|0;h=kc(d|0,e|0,g|0,y|0)|0;g=y;e=a+8|0;d=e;i=lc(c[d>>2]|0,c[d+4>>2]|0,b|0,f|0)|0;f=y;b=Ha(i,f)|0;d=y;j=oc(b|0,d|0,25)|0;k=kc(i|0,f|0,j|0,y|0)|0;j=y;f=a+16|0;i=f;l=lc(c[i>>2]|0,c[i+4>>2]|0,b|0,d|0)|0;d=y;b=Ga(l,d)|0;i=y;m=oc(b|0,i|0,26)|0;n=kc(l|0,d|0,m|0,y|0)|0;m=f;c[m>>2]=n;c[m+4>>2]=y;m=a+24|0;n=m;f=lc(c[n>>2]|0,c[n+4>>2]|0,b|0,i|0)|0;i=y;b=Ha(f,i)|0;n=y;d=oc(b|0,n|0,25)|0;l=kc(f|0,i|0,d|0,y|0)|0;d=m;c[d>>2]=l;c[d+4>>2]=y;d=a+32|0;l=d;m=lc(c[l>>2]|0,c[l+4>>2]|0,b|0,n|0)|0;n=y;b=Ga(m,n)|0;l=y;i=oc(b|0,l|0,26)|0;f=kc(m|0,n|0,i|0,y|0)|0;i=d;c[i>>2]=f;c[i+4>>2]=y;i=a+40|0;f=i;d=lc(c[f>>2]|0,c[f+4>>2]|0,b|0,l|0)|0;l=y;b=Ha(d,l)|0;f=y;n=oc(b|0,f|0,25)|0;m=kc(d|0,l|0,n|0,y|0)|0;n=i;c[n>>2]=m;c[n+4>>2]=y;n=a+48|0;m=n;i=lc(c[m>>2]|0,c[m+4>>2]|0,b|0,f|0)|0;f=y;b=Ga(i,f)|0;m=y;l=oc(b|0,m|0,26)|0;d=kc(i|0,f|0,l|0,y|0)|0;l=n;c[l>>2]=d;c[l+4>>2]=y;l=a+56|0;d=l;n=lc(c[d>>2]|0,c[d+4>>2]|0,b|0,m|0)|0;m=y;b=Ha(n,m)|0;d=y;f=oc(b|0,d|0,25)|0;i=kc(n|0,m|0,f|0,y|0)|0;f=l;c[f>>2]=i;c[f+4>>2]=y;f=a+64|0;i=f;l=lc(c[i>>2]|0,c[i+4>>2]|0,b|0,d|0)|0;d=y;b=Ga(l,d)|0;i=y;m=oc(b|0,i|0,26)|0;n=kc(l|0,d|0,m|0,y|0)|0;m=f;c[m>>2]=n;c[m+4>>2]=y;m=a+72|0;n=m;f=lc(c[n>>2]|0,c[n+4>>2]|0,b|0,i|0)|0;i=y;b=Ha(f,i)|0;n=y;d=oc(b|0,n|0,25)|0;l=kc(f|0,i|0,d|0,y|0)|0;d=m;c[d>>2]=l;c[d+4>>2]=y;d=qc(b|0,n|0,18,0)|0;l=y;m=lc(h|0,g|0,b|0,n|0)|0;n=lc(m|0,y|0,d|0,l|0)|0;l=y;d=a+80|0;c[d>>2]=0;c[d+4>>2]=0;d=Ga(n,l)|0;m=y;b=oc(d|0,m|0,26)|0;g=kc(n|0,l|0,b|0,y|0)|0;b=a;c[b>>2]=g;c[b+4>>2]=y;b=lc(k|0,j|0,d|0,m|0)|0;m=e;c[m>>2]=b;c[m+4>>2]=y;return}function Ga(a,b){a=a|0;b=b|0;var c=0;c=lc(b>>31>>>6|0,0,a|0,b|0)|0;b=jc(c|0,y|0,26)|0;return b|0}function Ha(a,b){a=a|0;b=b|0;var c=0;c=lc(b>>31>>>7|0,0,a|0,b|0)|0;b=jc(c|0,y|0,25)|0;return b|0}function Ia(a,b){a=a|0;b=b|0;var d=0,e=0;d=l;l=l+160|0;e=d;Ja(e,b);Ea(e);Fa(e);b=a;a=e;e=b+80|0;do{c[b>>2]=c[a>>2];b=b+4|0;a=a+4|0}while((b|0)<(e|0));l=d;return}function Ja(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;d=jc(0,c[b>>2]|0,32)|0;e=y;f=qc(d|0,e|0,d|0,e|0)|0;e=a;c[e>>2]=f;c[e+4>>2]=y;e=jc(0,c[b>>2]|0,31)|0;f=y;d=b+8|0;g=jc(0,c[d>>2]|0,32)|0;h=qc(g|0,y|0,e|0,f|0)|0;f=a+8|0;c[f>>2]=h;c[f+4>>2]=y;f=jc(0,c[d>>2]|0,32)|0;h=y;e=qc(f|0,h|0,f|0,h|0)|0;h=y;f=jc(0,c[b>>2]|0,32)|0;g=y;i=b+16|0;j=jc(0,c[i>>2]|0,32)|0;k=qc(j|0,y|0,f|0,g|0)|0;g=lc(k|0,y|0,e|0,h|0)|0;h=oc(g|0,y|0,1)|0;g=a+16|0;c[g>>2]=h;c[g+4>>2]=y;g=jc(0,c[d>>2]|0,32)|0;h=y;e=jc(0,c[i>>2]|0,32)|0;k=qc(e|0,y|0,g|0,h|0)|0;h=y;g=jc(0,c[b>>2]|0,32)|0;e=y;f=b+24|0;j=jc(0,c[f>>2]|0,32)|0;l=qc(j|0,y|0,g|0,e|0)|0;e=lc(l|0,y|0,k|0,h|0)|0;h=oc(e|0,y|0,1)|0;e=a+24|0;c[e>>2]=h;c[e+4>>2]=y;e=jc(0,c[i>>2]|0,32)|0;h=y;k=qc(e|0,h|0,e|0,h|0)|0;h=y;e=jc(0,c[d>>2]|0,30)|0;l=y;g=jc(0,c[f>>2]|0,32)|0;j=qc(g|0,y|0,e|0,l|0)|0;l=lc(j|0,y|0,k|0,h|0)|0;h=y;k=jc(0,c[b>>2]|0,31)|0;j=y;e=b+32|0;g=jc(0,c[e>>2]|0,32)|0;m=qc(g|0,y|0,k|0,j|0)|0;j=lc(l|0,h|0,m|0,y|0)|0;m=a+32|0;c[m>>2]=j;c[m+4>>2]=y;m=jc(0,c[i>>2]|0,32)|0;j=y;h=jc(0,c[f>>2]|0,32)|0;l=qc(h|0,y|0,m|0,j|0)|0;j=y;m=jc(0,c[d>>2]|0,32)|0;h=y;k=jc(0,c[e>>2]|0,32)|0;g=qc(k|0,y|0,m|0,h|0)|0;h=lc(g|0,y|0,l|0,j|0)|0;j=y;l=jc(0,c[b>>2]|0,32)|0;g=y;m=b+40|0;k=jc(0,c[m>>2]|0,32)|0;n=qc(k|0,y|0,l|0,g|0)|0;g=lc(h|0,j|0,n|0,y|0)|0;n=oc(g|0,y|0,1)|0;g=a+40|0;c[g>>2]=n;c[g+4>>2]=y;g=jc(0,c[f>>2]|0,32)|0;n=y;j=qc(g|0,n|0,g|0,n|0)|0;n=y;g=jc(0,c[i>>2]|0,32)|0;h=y;l=jc(0,c[e>>2]|0,32)|0;k=qc(l|0,y|0,g|0,h|0)|0;h=lc(k|0,y|0,j|0,n|0)|0;n=y;j=jc(0,c[b>>2]|0,32)|0;k=y;g=b+48|0;l=jc(0,c[g>>2]|0,32)|0;o=qc(l|0,y|0,j|0,k|0)|0;k=lc(h|0,n|0,o|0,y|0)|0;o=y;n=jc(0,c[d>>2]|0,31)|0;h=y;j=jc(0,c[m>>2]|0,32)|0;l=qc(j|0,y|0,n|0,h|0)|0;h=lc(k|0,o|0,l|0,y|0)|0;l=oc(h|0,y|0,1)|0;h=a+48|0;c[h>>2]=l;c[h+4>>2]=y;h=jc(0,c[f>>2]|0,32)|0;l=y;o=jc(0,c[e>>2]|0,32)|0;k=qc(o|0,y|0,h|0,l|0)|0;l=y;h=jc(0,c[i>>2]|0,32)|0;o=y;n=jc(0,c[m>>2]|0,32)|0;j=qc(n|0,y|0,h|0,o|0)|0;o=lc(j|0,y|0,k|0,l|0)|0;l=y;k=jc(0,c[d>>2]|0,32)|0;j=y;h=jc(0,c[g>>2]|0,32)|0;n=qc(h|0,y|0,k|0,j|0)|0;j=lc(o|0,l|0,n|0,y|0)|0;n=y;l=jc(0,c[b>>2]|0,32)|0;o=y;k=b+56|0;h=jc(0,c[k>>2]|0,32)|0;p=qc(h|0,y|0,l|0,o|0)|0;o=lc(j|0,n|0,p|0,y|0)|0;p=oc(o|0,y|0,1)|0;o=a+56|0;c[o>>2]=p;c[o+4>>2]=y;o=jc(0,c[e>>2]|0,32)|0;p=y;n=qc(o|0,p|0,o|0,p|0)|0;p=y;o=jc(0,c[i>>2]|0,32)|0;j=y;l=jc(0,c[g>>2]|0,32)|0;h=qc(l|0,y|0,o|0,j|0)|0;j=y;o=jc(0,c[b>>2]|0,32)|0;l=y;q=b+64|0;r=jc(0,c[q>>2]|0,32)|0;s=qc(r|0,y|0,o|0,l|0)|0;l=lc(s|0,y|0,h|0,j|0)|0;j=y;h=jc(0,c[d>>2]|0,32)|0;s=y;o=jc(0,c[k>>2]|0,32)|0;r=qc(o|0,y|0,h|0,s|0)|0;s=y;h=jc(0,c[f>>2]|0,32)|0;o=y;t=jc(0,c[m>>2]|0,32)|0;u=qc(t|0,y|0,h|0,o|0)|0;o=lc(u|0,y|0,r|0,s|0)|0;s=oc(o|0,y|0,1)|0;o=lc(l|0,j|0,s|0,y|0)|0;s=oc(o|0,y|0,1)|0;o=lc(s|0,y|0,n|0,p|0)|0;p=a+64|0;c[p>>2]=o;c[p+4>>2]=y;p=jc(0,c[e>>2]|0,32)|0;o=y;n=jc(0,c[m>>2]|0,32)|0;s=qc(n|0,y|0,p|0,o|0)|0;o=y;p=jc(0,c[f>>2]|0,32)|0;n=y;j=jc(0,c[g>>2]|0,32)|0;l=qc(j|0,y|0,p|0,n|0)|0;n=lc(l|0,y|0,s|0,o|0)|0;o=y;s=jc(0,c[i>>2]|0,32)|0;l=y;p=jc(0,c[k>>2]|0,32)|0;j=qc(p|0,y|0,s|0,l|0)|0;l=lc(n|0,o|0,j|0,y|0)|0;j=y;o=jc(0,c[d>>2]|0,32)|0;n=y;s=jc(0,c[q>>2]|0,32)|0;p=qc(s|0,y|0,o|0,n|0)|0;n=lc(l|0,j|0,p|0,y|0)|0;p=y;j=jc(0,c[b>>2]|0,32)|0;l=y;o=b+72|0;b=jc(0,c[o>>2]|0,32)|0;s=qc(b|0,y|0,j|0,l|0)|0;l=lc(n|0,p|0,s|0,y|0)|0;s=oc(l|0,y|0,1)|0;l=a+72|0;c[l>>2]=s;c[l+4>>2]=y;l=jc(0,c[m>>2]|0,32)|0;s=y;p=qc(l|0,s|0,l|0,s|0)|0;s=y;l=jc(0,c[e>>2]|0,32)|0;n=y;j=jc(0,c[g>>2]|0,32)|0;b=qc(j|0,y|0,l|0,n|0)|0;n=lc(b|0,y|0,p|0,s|0)|0;s=y;p=jc(0,c[i>>2]|0,32)|0;b=y;l=jc(0,c[q>>2]|0,32)|0;j=qc(l|0,y|0,p|0,b|0)|0;b=lc(n|0,s|0,j|0,y|0)|0;j=y;s=jc(0,c[f>>2]|0,32)|0;n=y;p=jc(0,c[k>>2]|0,32)|0;l=qc(p|0,y|0,s|0,n|0)|0;n=y;s=jc(0,c[d>>2]|0,32)|0;d=y;p=jc(0,c[o>>2]|0,32)|0;r=qc(p|0,y|0,s|0,d|0)|0;d=lc(r|0,y|0,l|0,n|0)|0;n=oc(d|0,y|0,1)|0;d=lc(b|0,j|0,n|0,y|0)|0;n=oc(d|0,y|0,1)|0;d=a+80|0;c[d>>2]=n;c[d+4>>2]=y;d=jc(0,c[m>>2]|0,32)|0;n=y;j=jc(0,c[g>>2]|0,32)|0;b=qc(j|0,y|0,d|0,n|0)|0;n=y;d=jc(0,c[e>>2]|0,32)|0;j=y;l=jc(0,c[k>>2]|0,32)|0;r=qc(l|0,y|0,d|0,j|0)|0;j=lc(r|0,y|0,b|0,n|0)|0;n=y;b=jc(0,c[f>>2]|0,32)|0;r=y;d=jc(0,c[q>>2]|0,32)|0;l=qc(d|0,y|0,b|0,r|0)|0;r=lc(j|0,n|0,l|0,y|0)|0;l=y;n=jc(0,c[i>>2]|0,32)|0;i=y;j=jc(0,c[o>>2]|0,32)|0;b=qc(j|0,y|0,n|0,i|0)|0;i=lc(r|0,l|0,b|0,y|0)|0;b=oc(i|0,y|0,1)|0;i=a+88|0;c[i>>2]=b;c[i+4>>2]=y;i=jc(0,c[g>>2]|0,32)|0;b=y;l=qc(i|0,b|0,i|0,b|0)|0;b=y;i=jc(0,c[e>>2]|0,32)|0;r=y;n=jc(0,c[q>>2]|0,32)|0;j=qc(n|0,y|0,i|0,r|0)|0;r=y;i=jc(0,c[m>>2]|0,32)|0;n=y;d=jc(0,c[k>>2]|0,32)|0;s=qc(d|0,y|0,i|0,n|0)|0;n=y;i=jc(0,c[f>>2]|0,32)|0;f=y;d=jc(0,c[o>>2]|0,32)|0;p=qc(d|0,y|0,i|0,f|0)|0;f=lc(p|0,y|0,s|0,n|0)|0;n=oc(f|0,y|0,1)|0;f=lc(n|0,y|0,j|0,r|0)|0;r=oc(f|0,y|0,1)|0;f=lc(r|0,y|0,l|0,b|0)|0;b=a+96|0;c[b>>2]=f;c[b+4>>2]=y;b=jc(0,c[g>>2]|0,32)|0;f=y;l=jc(0,c[k>>2]|0,32)|0;r=qc(l|0,y|0,b|0,f|0)|0;f=y;b=jc(0,c[m>>2]|0,32)|0;l=y;j=jc(0,c[q>>2]|0,32)|0;n=qc(j|0,y|0,b|0,l|0)|0;l=lc(n|0,y|0,r|0,f|0)|0;f=y;r=jc(0,c[e>>2]|0,32)|0;e=y;n=jc(0,c[o>>2]|0,32)|0;b=qc(n|0,y|0,r|0,e|0)|0;e=lc(l|0,f|0,b|0,y|0)|0;b=oc(e|0,y|0,1)|0;e=a+104|0;c[e>>2]=b;c[e+4>>2]=y;e=jc(0,c[k>>2]|0,32)|0;b=y;f=qc(e|0,b|0,e|0,b|0)|0;b=y;e=jc(0,c[g>>2]|0,32)|0;l=y;r=jc(0,c[q>>2]|0,32)|0;n=qc(r|0,y|0,e|0,l|0)|0;l=lc(n|0,y|0,f|0,b|0)|0;b=y;f=jc(0,c[m>>2]|0,31)|0;m=y;n=jc(0,c[o>>2]|0,32)|0;e=qc(n|0,y|0,f|0,m|0)|0;m=lc(l|0,b|0,e|0,y|0)|0;e=oc(m|0,y|0,1)|0;m=a+112|0;c[m>>2]=e;c[m+4>>2]=y;m=jc(0,c[k>>2]|0,32)|0;e=y;b=jc(0,c[q>>2]|0,32)|0;l=qc(b|0,y|0,m|0,e|0)|0;e=y;m=jc(0,c[g>>2]|0,32)|0;g=y;b=jc(0,c[o>>2]|0,32)|0;f=qc(b|0,y|0,m|0,g|0)|0;g=lc(f|0,y|0,l|0,e|0)|0;e=oc(g|0,y|0,1)|0;g=a+120|0;c[g>>2]=e;c[g+4>>2]=y;g=jc(0,c[q>>2]|0,32)|0;e=y;l=qc(g|0,e|0,g|0,e|0)|0;e=y;g=jc(0,c[k>>2]|0,30)|0;k=y;f=jc(0,c[o>>2]|0,32)|0;m=qc(f|0,y|0,g|0,k|0)|0;k=lc(m|0,y|0,l|0,e|0)|0;e=a+128|0;c[e>>2]=k;c[e+4>>2]=y;e=jc(0,c[q>>2]|0,31)|0;q=y;k=jc(0,c[o>>2]|0,32)|0;l=qc(k|0,y|0,e|0,q|0)|0;q=a+136|0;c[q>>2]=l;c[q+4>>2]=y;q=c[o>>2]|0;o=jc(0,q|0,32)|0;l=y;e=jc(0,q|0,31)|0;q=qc(e|0,y|0,o|0,l|0)|0;l=a+144|0;c[l>>2]=q;c[l+4>>2]=y;return}function Ka(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0;f=kc(0,0,d|0,e|0)|0;e=y;d=a;g=c[d>>2]|0;h=c[d+4>>2]|0;d=b;i=(c[d>>2]^g)&f;j=(c[d+4>>2]^h)&e;h=jc(0,i^g|0,32)|0;g=a;c[g>>2]=h;c[g+4>>2]=y;g=b;h=jc(0,c[g>>2]^i|0,32)|0;i=b;c[i>>2]=h;c[i+4>>2]=y;i=a+8|0;h=i;g=c[h>>2]|0;d=c[h+4>>2]|0;h=b+8|0;j=h;k=(c[j>>2]^g)&f;l=(c[j+4>>2]^d)&e;d=jc(0,k^g|0,32)|0;g=i;c[g>>2]=d;c[g+4>>2]=y;g=h;d=jc(0,c[g>>2]^k|0,32)|0;k=h;c[k>>2]=d;c[k+4>>2]=y;k=a+16|0;d=k;h=c[d>>2]|0;g=c[d+4>>2]|0;d=b+16|0;i=d;j=(c[i>>2]^h)&f;l=(c[i+4>>2]^g)&e;g=jc(0,j^h|0,32)|0;h=k;c[h>>2]=g;c[h+4>>2]=y;h=d;g=jc(0,c[h>>2]^j|0,32)|0;j=d;c[j>>2]=g;c[j+4>>2]=y;j=a+24|0;g=j;d=c[g>>2]|0;h=c[g+4>>2]|0;g=b+24|0;k=g;i=(c[k>>2]^d)&f;l=(c[k+4>>2]^h)&e;h=jc(0,i^d|0,32)|0;d=j;c[d>>2]=h;c[d+4>>2]=y;d=g;h=jc(0,c[d>>2]^i|0,32)|0;i=g;c[i>>2]=h;c[i+4>>2]=y;i=a+32|0;h=i;g=c[h>>2]|0;d=c[h+4>>2]|0;h=b+32|0;j=h;k=(c[j>>2]^g)&f;l=(c[j+4>>2]^d)&e;d=jc(0,k^g|0,32)|0;g=i;c[g>>2]=d;c[g+4>>2]=y;g=h;d=jc(0,c[g>>2]^k|0,32)|0;k=h;c[k>>2]=d;c[k+4>>2]=y;k=a+40|0;d=k;h=c[d>>2]|0;g=c[d+4>>2]|0;d=b+40|0;i=d;j=(c[i>>2]^h)&f;l=(c[i+4>>2]^g)&e;g=jc(0,j^h|0,32)|0;h=k;c[h>>2]=g;c[h+4>>2]=y;h=d;g=jc(0,c[h>>2]^j|0,32)|0;j=d;c[j>>2]=g;c[j+4>>2]=y;j=a+48|0;g=j;d=c[g>>2]|0;h=c[g+4>>2]|0;g=b+48|0;k=g;i=(c[k>>2]^d)&f;l=(c[k+4>>2]^h)&e;h=jc(0,i^d|0,32)|0;d=j;c[d>>2]=h;c[d+4>>2]=y;d=g;h=jc(0,c[d>>2]^i|0,32)|0;i=g;c[i>>2]=h;c[i+4>>2]=y;i=a+56|0;h=i;g=c[h>>2]|0;d=c[h+4>>2]|0;h=b+56|0;j=h;k=(c[j>>2]^g)&f;l=(c[j+4>>2]^d)&e;d=jc(0,k^g|0,32)|0;g=i;c[g>>2]=d;c[g+4>>2]=y;g=h;d=jc(0,c[g>>2]^k|0,32)|0;k=h;c[k>>2]=d;c[k+4>>2]=y;k=a+64|0;d=k;h=c[d>>2]|0;g=c[d+4>>2]|0;d=b+64|0;i=d;j=(c[i>>2]^h)&f;l=(c[i+4>>2]^g)&e;g=jc(0,j^h|0,32)|0;h=k;c[h>>2]=g;c[h+4>>2]=y;h=d;g=jc(0,c[h>>2]^j|0,32)|0;j=d;c[j>>2]=g;c[j+4>>2]=y;j=a+72|0;a=j;g=c[a>>2]|0;d=c[a+4>>2]|0;a=b+72|0;b=a;h=(c[b>>2]^g)&f;f=(c[b+4>>2]^d)&e;e=jc(0,h^g|0,32)|0;g=j;c[g>>2]=e;c[g+4>>2]=y;g=a;e=jc(0,c[g>>2]^h|0,32)|0;h=a;c[h>>2]=e;c[h+4>>2]=y;return}function La(a,b,d,e,f,g,h,i,j){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;var k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;k=l;l=l+1232|0;m=k+1144|0;n=k+1064|0;o=k+912|0;p=k+760|0;q=k+608|0;r=k+456|0;s=k+304|0;t=k+152|0;u=k;v=m;w=f;x=v+80|0;do{c[v>>2]=c[w>>2];v=v+4|0;w=w+4|0}while((v|0)<(x|0));Ma(f,g);Na(g,m);v=n;w=h;x=v+80|0;do{c[v>>2]=c[w>>2];v=v+4|0;w=w+4|0}while((v|0)<(x|0));Ma(h,i);Na(i,n);Da(r,h,g);Da(s,f,i);Ea(r);Fa(r);Ea(s);Fa(s);v=n;w=r;x=v+80|0;do{c[v>>2]=c[w>>2];v=v+4|0;w=w+4|0}while((v|0)<(x|0));Ma(r,s);Na(s,n);Ia(u,r);Ia(t,s);Da(s,t,j);Ea(s);Fa(s);v=d;w=u;x=v+80|0;do{c[v>>2]=c[w>>2];v=v+4|0;w=w+4|0}while((v|0)<(x|0));v=e;w=s;x=v+80|0;do{c[v>>2]=c[w>>2];v=v+4|0;w=w+4|0}while((v|0)<(x|0));Ia(p,f);Ia(q,g);Da(a,p,q);Ea(a);Fa(a);Na(q,p);v=o+80|0;x=v+72|0;do{c[v>>2]=0;v=v+4|0}while((v|0)<(x|0));Oa(o,q);Fa(o);Ma(o,p);Da(b,q,o);Ea(b);Fa(b);l=k;return}function Ma(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;d=a;e=b;f=lc(c[e>>2]|0,c[e+4>>2]|0,c[d>>2]|0,c[d+4>>2]|0)|0;d=a;c[d>>2]=f;c[d+4>>2]=y;d=a+8|0;f=d;e=b+8|0;g=lc(c[e>>2]|0,c[e+4>>2]|0,c[f>>2]|0,c[f+4>>2]|0)|0;f=d;c[f>>2]=g;c[f+4>>2]=y;f=a+16|0;g=f;d=b+16|0;e=lc(c[d>>2]|0,c[d+4>>2]|0,c[g>>2]|0,c[g+4>>2]|0)|0;g=f;c[g>>2]=e;c[g+4>>2]=y;g=a+24|0;e=g;f=b+24|0;d=lc(c[f>>2]|0,c[f+4>>2]|0,c[e>>2]|0,c[e+4>>2]|0)|0;e=g;c[e>>2]=d;c[e+4>>2]=y;e=a+32|0;d=e;g=b+32|0;f=lc(c[g>>2]|0,c[g+4>>2]|0,c[d>>2]|0,c[d+4>>2]|0)|0;d=e;c[d>>2]=f;c[d+4>>2]=y;d=a+40|0;f=d;e=b+40|0;g=lc(c[e>>2]|0,c[e+4>>2]|0,c[f>>2]|0,c[f+4>>2]|0)|0;f=d;c[f>>2]=g;c[f+4>>2]=y;f=a+48|0;g=f;d=b+48|0;e=lc(c[d>>2]|0,c[d+4>>2]|0,c[g>>2]|0,c[g+4>>2]|0)|0;g=f;c[g>>2]=e;c[g+4>>2]=y;g=a+56|0;e=g;f=b+56|0;d=lc(c[f>>2]|0,c[f+4>>2]|0,c[e>>2]|0,c[e+4>>2]|0)|0;e=g;c[e>>2]=d;c[e+4>>2]=y;e=a+64|0;d=e;g=b+64|0;f=lc(c[g>>2]|0,c[g+4>>2]|0,c[d>>2]|0,c[d+4>>2]|0)|0;d=e;c[d>>2]=f;c[d+4>>2]=y;d=a+72|0;a=d;f=b+72|0;b=lc(c[f>>2]|0,c[f+4>>2]|0,c[a>>2]|0,c[a+4>>2]|0)|0;a=d;c[a>>2]=b;c[a+4>>2]=y;return}function Na(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;d=b;e=a;f=kc(c[d>>2]|0,c[d+4>>2]|0,c[e>>2]|0,c[e+4>>2]|0)|0;e=a;c[e>>2]=f;c[e+4>>2]=y;e=b+8|0;f=a+8|0;d=f;g=kc(c[e>>2]|0,c[e+4>>2]|0,c[d>>2]|0,c[d+4>>2]|0)|0;d=f;c[d>>2]=g;c[d+4>>2]=y;d=b+16|0;g=a+16|0;f=g;e=kc(c[d>>2]|0,c[d+4>>2]|0,c[f>>2]|0,c[f+4>>2]|0)|0;f=g;c[f>>2]=e;c[f+4>>2]=y;f=b+24|0;e=a+24|0;g=e;d=kc(c[f>>2]|0,c[f+4>>2]|0,c[g>>2]|0,c[g+4>>2]|0)|0;g=e;c[g>>2]=d;c[g+4>>2]=y;g=b+32|0;d=a+32|0;e=d;f=kc(c[g>>2]|0,c[g+4>>2]|0,c[e>>2]|0,c[e+4>>2]|0)|0;e=d;c[e>>2]=f;c[e+4>>2]=y;e=b+40|0;f=a+40|0;d=f;g=kc(c[e>>2]|0,c[e+4>>2]|0,c[d>>2]|0,c[d+4>>2]|0)|0;d=f;c[d>>2]=g;c[d+4>>2]=y;d=b+48|0;g=a+48|0;f=g;e=kc(c[d>>2]|0,c[d+4>>2]|0,c[f>>2]|0,c[f+4>>2]|0)|0;f=g;c[f>>2]=e;c[f+4>>2]=y;f=b+56|0;e=a+56|0;g=e;d=kc(c[f>>2]|0,c[f+4>>2]|0,c[g>>2]|0,c[g+4>>2]|0)|0;g=e;c[g>>2]=d;c[g+4>>2]=y;g=b+64|0;d=a+64|0;e=d;f=kc(c[g>>2]|0,c[g+4>>2]|0,c[e>>2]|0,c[e+4>>2]|0)|0;e=d;c[e>>2]=f;c[e+4>>2]=y;e=b+72|0;b=a+72|0;a=b;f=kc(c[e>>2]|0,c[e+4>>2]|0,c[a>>2]|0,c[a+4>>2]|0)|0;a=b;c[a>>2]=f;c[a+4>>2]=y;return}function Oa(a,b){a=a|0;b=b|0;var d=0,e=0;d=b;e=qc(c[d>>2]|0,c[d+4>>2]|0,121665,0)|0;d=a;c[d>>2]=e;c[d+4>>2]=y;d=b+8|0;e=qc(c[d>>2]|0,c[d+4>>2]|0,121665,0)|0;d=a+8|0;c[d>>2]=e;c[d+4>>2]=y;d=b+16|0;e=qc(c[d>>2]|0,c[d+4>>2]|0,121665,0)|0;d=a+16|0;c[d>>2]=e;c[d+4>>2]=y;d=b+24|0;e=qc(c[d>>2]|0,c[d+4>>2]|0,121665,0)|0;d=a+24|0;c[d>>2]=e;c[d+4>>2]=y;d=b+32|0;e=qc(c[d>>2]|0,c[d+4>>2]|0,121665,0)|0;d=a+32|0;c[d>>2]=e;c[d+4>>2]=y;d=b+40|0;e=qc(c[d>>2]|0,c[d+4>>2]|0,121665,0)|0;d=a+40|0;c[d>>2]=e;c[d+4>>2]=y;d=b+48|0;e=qc(c[d>>2]|0,c[d+4>>2]|0,121665,0)|0;d=a+48|0;c[d>>2]=e;c[d+4>>2]=y;d=b+56|0;e=qc(c[d>>2]|0,c[d+4>>2]|0,121665,0)|0;d=a+56|0;c[d>>2]=e;c[d+4>>2]=y;d=b+64|0;e=qc(c[d>>2]|0,c[d+4>>2]|0,121665,0)|0;d=a+64|0;c[d>>2]=e;c[d+4>>2]=y;d=b+72|0;b=qc(c[d>>2]|0,c[d+4>>2]|0,121665,0)|0;d=a+72|0;c[d>>2]=b;c[d+4>>2]=y;return}function Pa(a){a=a|0;var b=0;b=a;a=b+40|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(a|0));return}function Qa(a){a=a|0;var b=0;c[a>>2]=1;b=a+4|0;a=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(a|0));return}function Ra(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;e=(c[d+4>>2]|0)+(c[b+4>>2]|0)|0;f=(c[d+8>>2]|0)+(c[b+8>>2]|0)|0;g=(c[d+12>>2]|0)+(c[b+12>>2]|0)|0;h=(c[d+16>>2]|0)+(c[b+16>>2]|0)|0;i=(c[d+20>>2]|0)+(c[b+20>>2]|0)|0;j=(c[d+24>>2]|0)+(c[b+24>>2]|0)|0;k=(c[d+28>>2]|0)+(c[b+28>>2]|0)|0;l=(c[d+32>>2]|0)+(c[b+32>>2]|0)|0;m=(c[d+36>>2]|0)+(c[b+36>>2]|0)|0;c[a>>2]=(c[d>>2]|0)+(c[b>>2]|0);c[a+4>>2]=e;c[a+8>>2]=f;c[a+12>>2]=g;c[a+16>>2]=h;c[a+20>>2]=i;c[a+24>>2]=j;c[a+28>>2]=k;c[a+32>>2]=l;c[a+36>>2]=m;return}function Sa(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0;e=c[a>>2]|0;f=a+4|0;g=c[f>>2]|0;h=a+8|0;i=c[h>>2]|0;j=a+12|0;k=c[j>>2]|0;l=a+16|0;m=c[l>>2]|0;n=a+20|0;o=c[n>>2]|0;p=a+24|0;q=c[p>>2]|0;r=a+28|0;s=c[r>>2]|0;t=a+32|0;u=c[t>>2]|0;v=a+36|0;w=c[v>>2]|0;x=0-d|0;d=(c[b+4>>2]^g)&x;y=(c[b+8>>2]^i)&x;z=(c[b+12>>2]^k)&x;A=(c[b+16>>2]^m)&x;B=(c[b+20>>2]^o)&x;C=(c[b+24>>2]^q)&x;D=(c[b+28>>2]^s)&x;E=(c[b+32>>2]^u)&x;F=(c[b+36>>2]^w)&x;c[a>>2]=(c[b>>2]^e)&x^e;c[f>>2]=d^g;c[h>>2]=y^i;c[j>>2]=z^k;c[l>>2]=A^m;c[n>>2]=B^o;c[p>>2]=C^q;c[r>>2]=D^s;c[t>>2]=E^u;c[v>>2]=F^w;return}function Ta(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;d=c[b+4>>2]|0;e=c[b+8>>2]|0;f=c[b+12>>2]|0;g=c[b+16>>2]|0;h=c[b+20>>2]|0;i=c[b+24>>2]|0;j=c[b+28>>2]|0;k=c[b+32>>2]|0;l=c[b+36>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=d;c[a+8>>2]=e;c[a+12>>2]=f;c[a+16>>2]=g;c[a+20>>2]=h;c[a+24>>2]=i;c[a+28>>2]=j;c[a+32>>2]=k;c[a+36>>2]=l;return}function Ua(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0;e=Va(d)|0;f=y;g=Wa(a[d+4>>0]|0,a[d+5>>0]|0,a[d+6>>0]|0)|0;h=oc(g|0,y|0,6)|0;g=y;i=Wa(a[d+7>>0]|0,a[d+8>>0]|0,a[d+9>>0]|0)|0;j=oc(i|0,y|0,5)|0;i=y;k=Wa(a[d+10>>0]|0,a[d+11>>0]|0,a[d+12>>0]|0)|0;l=oc(k|0,y|0,3)|0;k=y;m=Wa(a[d+13>>0]|0,a[d+14>>0]|0,a[d+15>>0]|0)|0;n=oc(m|0,y|0,2)|0;m=y;o=Va(d+16|0)|0;p=y;q=Wa(a[d+20>>0]|0,a[d+21>>0]|0,a[d+22>>0]|0)|0;r=oc(q|0,y|0,7)|0;q=y;s=Wa(a[d+23>>0]|0,a[d+24>>0]|0,a[d+25>>0]|0)|0;t=oc(s|0,y|0,5)|0;s=y;u=Wa(a[d+26>>0]|0,a[d+27>>0]|0,a[d+28>>0]|0)|0;v=oc(u|0,y|0,4)|0;u=y;w=Wa(a[d+29>>0]|0,a[d+30>>0]|0,a[d+31>>0]|0)|0;d=oc(w|0,y|0,2)|0;w=d&33554428;d=lc(w|0,0,16777216,0)|0;x=nc(d|0,y|0,25)|0;d=y;z=kc(0,0,x|0,d|0)|0;A=lc(z&19|0,0,e|0,f|0)|0;f=y;e=oc(x|0,d|0,25)|0;d=y;x=lc(h|0,g|0,16777216,0)|0;z=jc(x|0,y|0,25)|0;x=y;B=lc(j|0,i|0,z|0,x|0)|0;i=y;j=oc(z|0,x|0,25)|0;x=kc(h|0,g|0,j|0,y|0)|0;j=y;g=lc(l|0,k|0,16777216,0)|0;h=jc(g|0,y|0,25)|0;g=y;z=lc(n|0,m|0,h|0,g|0)|0;m=y;n=oc(h|0,g|0,25)|0;g=y;h=lc(o|0,p|0,16777216,0)|0;C=jc(h|0,y|0,25)|0;h=y;D=lc(r|0,q|0,C|0,h|0)|0;q=y;r=oc(C|0,h|0,25)|0;h=kc(o|0,p|0,r|0,y|0)|0;r=y;p=lc(t|0,s|0,16777216,0)|0;o=jc(p|0,y|0,25)|0;p=y;C=lc(v|0,u|0,o|0,p|0)|0;u=y;v=oc(o|0,p|0,25)|0;p=y;o=lc(A|0,f|0,33554432,0)|0;E=jc(o|0,y|0,26)|0;o=y;F=lc(x|0,j|0,E|0,o|0)|0;j=oc(E|0,o|0,26)|0;o=kc(A|0,f|0,j|0,y|0)|0;j=lc(B|0,i|0,33554432,0)|0;f=jc(j|0,y|0,26)|0;j=y;A=lc(l|0,k|0,f|0,j|0)|0;k=kc(A|0,y|0,n|0,g|0)|0;g=oc(f|0,j|0,26)|0;j=kc(B|0,i|0,g|0,y|0)|0;g=lc(z|0,m|0,33554432,0)|0;i=jc(g|0,y|0,26)|0;g=y;B=lc(h|0,r|0,i|0,g|0)|0;r=oc(i|0,g|0,26)|0;g=kc(z|0,m|0,r|0,y|0)|0;r=lc(D|0,q|0,33554432,0)|0;m=jc(r|0,y|0,26)|0;r=y;z=lc(t|0,s|0,m|0,r|0)|0;s=kc(z|0,y|0,v|0,p|0)|0;p=oc(m|0,r|0,26)|0;r=kc(D|0,q|0,p|0,y|0)|0;p=lc(C|0,u|0,33554432,0)|0;q=jc(p|0,y|0,26)|0;p=y;D=lc(w|0,0,q|0,p|0)|0;w=kc(D|0,y|0,e|0,d|0)|0;d=oc(q|0,p|0,26)|0;p=kc(C|0,u|0,d|0,y|0)|0;c[b>>2]=o;c[b+4>>2]=F;c[b+8>>2]=j;c[b+12>>2]=k;c[b+16>>2]=g;c[b+20>>2]=B;c[b+24>>2]=r;c[b+28>>2]=s;c[b+32>>2]=p;c[b+36>>2]=w;return}function Va(a){a=a|0;var b=0,c=0,e=0,f=0,g=0;b=d[a>>0]|0;c=oc(d[a+1>>0]|0|0,0,8)|0;e=y;f=oc(d[a+2>>0]|0|0,0,16)|0;g=e|y;e=oc(d[a+3>>0]|0|0,0,24)|0;y=g|y;return c|b|f|e|0}function Wa(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=oc(b&255|0,0,8)|0;b=y;e=oc(c&255|0,0,16)|0;y=b|y;return d|a&255|e|0}function Xa(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;c=l;l=l+160|0;d=c+120|0;e=c+80|0;f=c+40|0;g=c;cb(d,b);cb(e,d);cb(e,e);_a(e,b,e);_a(d,d,e);cb(f,d);_a(e,e,f);cb(f,e);cb(f,f);cb(f,f);cb(f,f);cb(f,f);_a(e,f,e);cb(f,e);cb(f,f);cb(f,f);cb(f,f);cb(f,f);cb(f,f);cb(f,f);cb(f,f);cb(f,f);cb(f,f);_a(f,f,e);cb(g,f);cb(g,g);cb(g,g);cb(g,g);cb(g,g);cb(g,g);cb(g,g);cb(g,g);cb(g,g);cb(g,g);cb(g,g);cb(g,g);cb(g,g);cb(g,g);cb(g,g);cb(g,g);cb(g,g);cb(g,g);cb(g,g);cb(g,g);_a(f,g,f);cb(f,f);cb(f,f);cb(f,f);cb(f,f);cb(f,f);cb(f,f);cb(f,f);cb(f,f);cb(f,f);cb(f,f);_a(e,f,e);cb(f,e);b=1;do{cb(f,f);b=b+1|0}while((b|0)!=50);_a(f,f,e);cb(g,f);b=1;do{cb(g,g);b=b+1|0}while((b|0)!=100);_a(f,g,f);cb(f,f);g=1;do{cb(f,f);g=g+1|0}while((g|0)!=50);_a(e,f,e);cb(e,e);cb(e,e);cb(e,e);cb(e,e);cb(e,e);_a(a,e,d);l=c;return}function Ya(b){b=b|0;var c=0,d=0;c=l;l=l+32|0;d=c;eb(d,b);l=c;return a[d>>0]&1|0}function Za(a){a=a|0;var b=0,c=0;b=l;l=l+32|0;c=b;eb(c,a);a=qa(c,33460)|0;l=b;return a|0}function _a(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0,Ma=0,Na=0,Oa=0,Pa=0,Qa=0,Ra=0,Sa=0,Ta=0,Ua=0,Va=0,Wa=0,Xa=0,Ya=0,Za=0,_a=0,$a=0,ab=0,bb=0,cb=0,db=0,eb=0,fb=0,gb=0,hb=0,ib=0,jb=0,kb=0,lb=0,mb=0,nb=0,ob=0,pb=0,qb=0,rb=0,sb=0,tb=0,ub=0,vb=0,wb=0,xb=0,yb=0,zb=0,Ab=0,Bb=0,Cb=0,Db=0,Eb=0,Fb=0,Gb=0,Hb=0,Ib=0,Jb=0,Kb=0,Lb=0,Mb=0,Nb=0,Ob=0,Pb=0,Qb=0,Rb=0,Sb=0,Tb=0,Ub=0,Vb=0,Wb=0,Xb=0,Yb=0,Zb=0,_b=0,$b=0,ac=0,bc=0,cc=0,dc=0,ec=0,fc=0,gc=0,hc=0,ic=0,mc=0,nc=0,pc=0,rc=0,sc=0,tc=0,uc=0,vc=0,wc=0,xc=0,yc=0,zc=0,Ac=0,Bc=0,Cc=0,Dc=0,Ec=0,Fc=0,Gc=0,Hc=0,Ic=0,Jc=0,Kc=0,Lc=0,Mc=0,Nc=0,Oc=0,Pc=0,Qc=0,Rc=0,Sc=0,Tc=0,Uc=0,Vc=0,Wc=0,Xc=0,Yc=0;e=c[b>>2]|0;f=c[b+4>>2]|0;g=c[b+8>>2]|0;h=c[b+12>>2]|0;i=c[b+16>>2]|0;j=c[b+20>>2]|0;k=c[b+24>>2]|0;l=c[b+28>>2]|0;m=c[b+32>>2]|0;n=c[b+36>>2]|0;b=c[d>>2]|0;o=c[d+4>>2]|0;p=c[d+8>>2]|0;q=c[d+12>>2]|0;r=c[d+16>>2]|0;s=c[d+20>>2]|0;t=c[d+24>>2]|0;u=c[d+28>>2]|0;v=c[d+32>>2]|0;w=c[d+36>>2]|0;d=o*19|0;x=p*19|0;z=q*19|0;A=r*19|0;B=s*19|0;C=t*19|0;D=u*19|0;E=v*19|0;F=w*19|0;G=f<<1;H=h<<1;I=j<<1;J=l<<1;K=n<<1;L=((e|0)<0)<<31>>31;M=((b|0)<0)<<31>>31;N=qc(b|0,M|0,e|0,L|0)|0;O=y;P=((o|0)<0)<<31>>31;Q=qc(o|0,P|0,e|0,L|0)|0;R=y;S=((p|0)<0)<<31>>31;T=qc(p|0,S|0,e|0,L|0)|0;U=y;V=((q|0)<0)<<31>>31;W=qc(q|0,V|0,e|0,L|0)|0;X=y;Y=((r|0)<0)<<31>>31;Z=qc(r|0,Y|0,e|0,L|0)|0;_=y;$=((s|0)<0)<<31>>31;aa=qc(s|0,$|0,e|0,L|0)|0;ba=y;ca=((t|0)<0)<<31>>31;da=qc(t|0,ca|0,e|0,L|0)|0;ea=y;fa=((u|0)<0)<<31>>31;ga=qc(u|0,fa|0,e|0,L|0)|0;ha=y;ia=((v|0)<0)<<31>>31;ja=qc(v|0,ia|0,e|0,L|0)|0;ka=y;la=qc(w|0,((w|0)<0)<<31>>31|0,e|0,L|0)|0;L=y;e=((f|0)<0)<<31>>31;w=qc(b|0,M|0,f|0,e|0)|0;ma=y;na=((G|0)<0)<<31>>31;oa=qc(o|0,P|0,G|0,na|0)|0;pa=y;qa=qc(p|0,S|0,f|0,e|0)|0;ra=y;sa=qc(q|0,V|0,G|0,na|0)|0;ta=y;ua=qc(r|0,Y|0,f|0,e|0)|0;va=y;wa=qc(s|0,$|0,G|0,na|0)|0;xa=y;ya=qc(t|0,ca|0,f|0,e|0)|0;za=y;Aa=qc(u|0,fa|0,G|0,na|0)|0;Ba=y;Ca=qc(v|0,ia|0,f|0,e|0)|0;e=y;f=((F|0)<0)<<31>>31;ia=qc(F|0,f|0,G|0,na|0)|0;na=y;G=((g|0)<0)<<31>>31;v=qc(b|0,M|0,g|0,G|0)|0;Da=y;Ea=qc(o|0,P|0,g|0,G|0)|0;Fa=y;Ga=qc(p|0,S|0,g|0,G|0)|0;Ha=y;Ia=qc(q|0,V|0,g|0,G|0)|0;Ja=y;Ka=qc(r|0,Y|0,g|0,G|0)|0;La=y;Ma=qc(s|0,$|0,g|0,G|0)|0;Na=y;Oa=qc(t|0,ca|0,g|0,G|0)|0;Pa=y;Qa=qc(u|0,fa|0,g|0,G|0)|0;fa=y;u=((E|0)<0)<<31>>31;Ra=qc(E|0,u|0,g|0,G|0)|0;Sa=y;Ta=qc(F|0,f|0,g|0,G|0)|0;G=y;g=((h|0)<0)<<31>>31;Ua=qc(b|0,M|0,h|0,g|0)|0;Va=y;Wa=((H|0)<0)<<31>>31;Xa=qc(o|0,P|0,H|0,Wa|0)|0;Ya=y;Za=qc(p|0,S|0,h|0,g|0)|0;_a=y;$a=qc(q|0,V|0,H|0,Wa|0)|0;ab=y;bb=qc(r|0,Y|0,h|0,g|0)|0;cb=y;db=qc(s|0,$|0,H|0,Wa|0)|0;eb=y;fb=qc(t|0,ca|0,h|0,g|0)|0;ca=y;t=((D|0)<0)<<31>>31;gb=qc(D|0,t|0,H|0,Wa|0)|0;hb=y;ib=qc(E|0,u|0,h|0,g|0)|0;g=y;h=qc(F|0,f|0,H|0,Wa|0)|0;Wa=y;H=((i|0)<0)<<31>>31;jb=qc(b|0,M|0,i|0,H|0)|0;kb=y;lb=qc(o|0,P|0,i|0,H|0)|0;mb=y;nb=qc(p|0,S|0,i|0,H|0)|0;ob=y;pb=qc(q|0,V|0,i|0,H|0)|0;qb=y;rb=qc(r|0,Y|0,i|0,H|0)|0;sb=y;tb=qc(s|0,$|0,i|0,H|0)|0;$=y;s=((C|0)<0)<<31>>31;ub=qc(C|0,s|0,i|0,H|0)|0;vb=y;wb=qc(D|0,t|0,i|0,H|0)|0;xb=y;yb=qc(E|0,u|0,i|0,H|0)|0;zb=y;Ab=qc(F|0,f|0,i|0,H|0)|0;H=y;i=((j|0)<0)<<31>>31;Bb=qc(b|0,M|0,j|0,i|0)|0;Cb=y;Db=((I|0)<0)<<31>>31;Eb=qc(o|0,P|0,I|0,Db|0)|0;Fb=y;Gb=qc(p|0,S|0,j|0,i|0)|0;Hb=y;Ib=qc(q|0,V|0,I|0,Db|0)|0;Jb=y;Kb=qc(r|0,Y|0,j|0,i|0)|0;Y=y;r=((B|0)<0)<<31>>31;Lb=qc(B|0,r|0,I|0,Db|0)|0;Mb=y;Nb=qc(C|0,s|0,j|0,i|0)|0;Ob=y;Pb=qc(D|0,t|0,I|0,Db|0)|0;Qb=y;Rb=qc(E|0,u|0,j|0,i|0)|0;i=y;j=qc(F|0,f|0,I|0,Db|0)|0;Db=y;I=((k|0)<0)<<31>>31;Sb=qc(b|0,M|0,k|0,I|0)|0;Tb=y;Ub=qc(o|0,P|0,k|0,I|0)|0;Vb=y;Wb=qc(p|0,S|0,k|0,I|0)|0;Xb=y;Yb=qc(q|0,V|0,k|0,I|0)|0;V=y;q=((A|0)<0)<<31>>31;Zb=qc(A|0,q|0,k|0,I|0)|0;_b=y;$b=qc(B|0,r|0,k|0,I|0)|0;ac=y;bc=qc(C|0,s|0,k|0,I|0)|0;cc=y;dc=qc(D|0,t|0,k|0,I|0)|0;ec=y;fc=qc(E|0,u|0,k|0,I|0)|0;gc=y;hc=qc(F|0,f|0,k|0,I|0)|0;I=y;k=((l|0)<0)<<31>>31;ic=qc(b|0,M|0,l|0,k|0)|0;mc=y;nc=((J|0)<0)<<31>>31;pc=qc(o|0,P|0,J|0,nc|0)|0;rc=y;sc=qc(p|0,S|0,l|0,k|0)|0;S=y;p=((z|0)<0)<<31>>31;tc=qc(z|0,p|0,J|0,nc|0)|0;uc=y;vc=qc(A|0,q|0,l|0,k|0)|0;wc=y;xc=qc(B|0,r|0,J|0,nc|0)|0;yc=y;zc=qc(C|0,s|0,l|0,k|0)|0;Ac=y;Bc=qc(D|0,t|0,J|0,nc|0)|0;Cc=y;Dc=qc(E|0,u|0,l|0,k|0)|0;k=y;l=qc(F|0,f|0,J|0,nc|0)|0;nc=y;J=((m|0)<0)<<31>>31;Ec=qc(b|0,M|0,m|0,J|0)|0;Fc=y;Gc=qc(o|0,P|0,m|0,J|0)|0;P=y;o=((x|0)<0)<<31>>31;Hc=qc(x|0,o|0,m|0,J|0)|0;Ic=y;Jc=qc(z|0,p|0,m|0,J|0)|0;Kc=y;Lc=qc(A|0,q|0,m|0,J|0)|0;Mc=y;Nc=qc(B|0,r|0,m|0,J|0)|0;Oc=y;Pc=qc(C|0,s|0,m|0,J|0)|0;Qc=y;Rc=qc(D|0,t|0,m|0,J|0)|0;Sc=y;Tc=qc(E|0,u|0,m|0,J|0)|0;Uc=y;Vc=qc(F|0,f|0,m|0,J|0)|0;J=y;m=((n|0)<0)<<31>>31;Wc=qc(b|0,M|0,n|0,m|0)|0;M=y;b=((K|0)<0)<<31>>31;Xc=qc(d|0,((d|0)<0)<<31>>31|0,K|0,b|0)|0;d=y;Yc=qc(x|0,o|0,n|0,m|0)|0;o=y;x=qc(z|0,p|0,K|0,b|0)|0;p=y;z=qc(A|0,q|0,n|0,m|0)|0;q=y;A=qc(B|0,r|0,K|0,b|0)|0;r=y;B=qc(C|0,s|0,n|0,m|0)|0;s=y;C=qc(D|0,t|0,K|0,b|0)|0;t=y;D=qc(E|0,u|0,n|0,m|0)|0;m=y;n=qc(F|0,f|0,K|0,b|0)|0;b=y;K=lc(Xc|0,d|0,N|0,O|0)|0;O=lc(K|0,y|0,Hc|0,Ic|0)|0;Ic=lc(O|0,y|0,tc|0,uc|0)|0;uc=lc(Ic|0,y|0,Zb|0,_b|0)|0;_b=lc(uc|0,y|0,Lb|0,Mb|0)|0;Mb=lc(_b|0,y|0,ub|0,vb|0)|0;vb=lc(Mb|0,y|0,gb|0,hb|0)|0;hb=lc(vb|0,y|0,Ra|0,Sa|0)|0;Sa=lc(hb|0,y|0,ia|0,na|0)|0;na=y;ia=lc(Q|0,R|0,w|0,ma|0)|0;ma=y;w=lc(Xa|0,Ya|0,jb|0,kb|0)|0;kb=lc(w|0,y|0,Ga|0,Ha|0)|0;Ha=lc(kb|0,y|0,sa|0,ta|0)|0;ta=lc(Ha|0,y|0,Z|0,_|0)|0;_=lc(ta|0,y|0,A|0,r|0)|0;r=lc(_|0,y|0,Pc|0,Qc|0)|0;Qc=lc(r|0,y|0,Bc|0,Cc|0)|0;Cc=lc(Qc|0,y|0,fc|0,gc|0)|0;gc=lc(Cc|0,y|0,j|0,Db|0)|0;Db=y;j=lc(Sa|0,na|0,33554432,0)|0;Cc=jc(j|0,y|0,26)|0;j=y;fc=lc(ia|0,ma|0,Yc|0,o|0)|0;o=lc(fc|0,y|0,Jc|0,Kc|0)|0;Kc=lc(o|0,y|0,vc|0,wc|0)|0;wc=lc(Kc|0,y|0,$b|0,ac|0)|0;ac=lc(wc|0,y|0,Nb|0,Ob|0)|0;Ob=lc(ac|0,y|0,wb|0,xb|0)|0;xb=lc(Ob|0,y|0,ib|0,g|0)|0;g=lc(xb|0,y|0,Ta|0,G|0)|0;G=lc(g|0,y|0,Cc|0,j|0)|0;g=y;Ta=oc(Cc|0,j|0,26)|0;j=kc(Sa|0,na|0,Ta|0,y|0)|0;Ta=y;na=lc(gc|0,Db|0,33554432,0)|0;Sa=jc(na|0,y|0,26)|0;na=y;Cc=lc(lb|0,mb|0,Bb|0,Cb|0)|0;Cb=lc(Cc|0,y|0,Za|0,_a|0)|0;_a=lc(Cb|0,y|0,Ia|0,Ja|0)|0;Ja=lc(_a|0,y|0,ua|0,va|0)|0;va=lc(Ja|0,y|0,aa|0,ba|0)|0;ba=lc(va|0,y|0,B|0,s|0)|0;s=lc(ba|0,y|0,Rc|0,Sc|0)|0;Sc=lc(s|0,y|0,Dc|0,k|0)|0;k=lc(Sc|0,y|0,hc|0,I|0)|0;I=lc(k|0,y|0,Sa|0,na|0)|0;k=y;hc=oc(Sa|0,na|0,26)|0;na=kc(gc|0,Db|0,hc|0,y|0)|0;hc=y;Db=lc(G|0,g|0,16777216,0)|0;gc=jc(Db|0,y|0,25)|0;Db=y;Sa=lc(oa|0,pa|0,v|0,Da|0)|0;Da=lc(Sa|0,y|0,T|0,U|0)|0;U=lc(Da|0,y|0,x|0,p|0)|0;p=lc(U|0,y|0,Lc|0,Mc|0)|0;Mc=lc(p|0,y|0,xc|0,yc|0)|0;yc=lc(Mc|0,y|0,bc|0,cc|0)|0;cc=lc(yc|0,y|0,Pb|0,Qb|0)|0;Qb=lc(cc|0,y|0,yb|0,zb|0)|0;zb=lc(Qb|0,y|0,h|0,Wa|0)|0;Wa=lc(zb|0,y|0,gc|0,Db|0)|0;zb=y;h=oc(gc|0,Db|0,25)|0;Db=kc(G|0,g|0,h|0,y|0)|0;h=y;g=lc(I|0,k|0,16777216,0)|0;G=jc(g|0,y|0,25)|0;g=y;gc=lc(Eb|0,Fb|0,Sb|0,Tb|0)|0;Tb=lc(gc|0,y|0,nb|0,ob|0)|0;ob=lc(Tb|0,y|0,$a|0,ab|0)|0;ab=lc(ob|0,y|0,Ka|0,La|0)|0;La=lc(ab|0,y|0,wa|0,xa|0)|0;xa=lc(La|0,y|0,da|0,ea|0)|0;ea=lc(xa|0,y|0,C|0,t|0)|0;t=lc(ea|0,y|0,Tc|0,Uc|0)|0;Uc=lc(t|0,y|0,l|0,nc|0)|0;nc=lc(Uc|0,y|0,G|0,g|0)|0;Uc=y;l=oc(G|0,g|0,25)|0;g=kc(I|0,k|0,l|0,y|0)|0;l=y;k=lc(Wa|0,zb|0,33554432,0)|0;I=jc(k|0,y|0,26)|0;k=y;G=lc(Ea|0,Fa|0,Ua|0,Va|0)|0;Va=lc(G|0,y|0,qa|0,ra|0)|0;ra=lc(Va|0,y|0,W|0,X|0)|0;X=lc(ra|0,y|0,z|0,q|0)|0;q=lc(X|0,y|0,Nc|0,Oc|0)|0;Oc=lc(q|0,y|0,zc|0,Ac|0)|0;Ac=lc(Oc|0,y|0,dc|0,ec|0)|0;ec=lc(Ac|0,y|0,Rb|0,i|0)|0;i=lc(ec|0,y|0,Ab|0,H|0)|0;H=lc(i|0,y|0,I|0,k|0)|0;i=y;Ab=oc(I|0,k|0,26)|0;k=kc(Wa|0,zb|0,Ab|0,y|0)|0;Ab=lc(nc|0,Uc|0,33554432,0)|0;zb=jc(Ab|0,y|0,26)|0;Ab=y;Wa=lc(Ub|0,Vb|0,ic|0,mc|0)|0;mc=lc(Wa|0,y|0,Gb|0,Hb|0)|0;Hb=lc(mc|0,y|0,pb|0,qb|0)|0;qb=lc(Hb|0,y|0,bb|0,cb|0)|0;cb=lc(qb|0,y|0,Ma|0,Na|0)|0;Na=lc(cb|0,y|0,ya|0,za|0)|0;za=lc(Na|0,y|0,ga|0,ha|0)|0;ha=lc(za|0,y|0,D|0,m|0)|0;m=lc(ha|0,y|0,Vc|0,J|0)|0;J=lc(m|0,y|0,zb|0,Ab|0)|0;m=y;Vc=oc(zb|0,Ab|0,26)|0;Ab=kc(nc|0,Uc|0,Vc|0,y|0)|0;Vc=lc(H|0,i|0,16777216,0)|0;Uc=jc(Vc|0,y|0,25)|0;Vc=y;nc=lc(Uc|0,Vc|0,na|0,hc|0)|0;hc=y;na=oc(Uc|0,Vc|0,25)|0;Vc=kc(H|0,i|0,na|0,y|0)|0;na=lc(J|0,m|0,16777216,0)|0;i=jc(na|0,y|0,25)|0;na=y;H=lc(pc|0,rc|0,Ec|0,Fc|0)|0;Fc=lc(H|0,y|0,Wb|0,Xb|0)|0;Xb=lc(Fc|0,y|0,Ib|0,Jb|0)|0;Jb=lc(Xb|0,y|0,rb|0,sb|0)|0;sb=lc(Jb|0,y|0,db|0,eb|0)|0;eb=lc(sb|0,y|0,Oa|0,Pa|0)|0;Pa=lc(eb|0,y|0,Aa|0,Ba|0)|0;Ba=lc(Pa|0,y|0,ja|0,ka|0)|0;ka=lc(Ba|0,y|0,n|0,b|0)|0;b=lc(ka|0,y|0,i|0,na|0)|0;ka=y;n=oc(i|0,na|0,25)|0;na=kc(J|0,m|0,n|0,y|0)|0;n=lc(nc|0,hc|0,33554432,0)|0;m=jc(n|0,y|0,26)|0;n=y;J=lc(g|0,l|0,m|0,n|0)|0;l=oc(m|0,n|0,26)|0;n=kc(nc|0,hc|0,l|0,y|0)|0;l=lc(b|0,ka|0,33554432,0)|0;hc=jc(l|0,y|0,26)|0;l=y;nc=lc(Gc|0,P|0,Wc|0,M|0)|0;M=lc(nc|0,y|0,sc|0,S|0)|0;S=lc(M|0,y|0,Yb|0,V|0)|0;V=lc(S|0,y|0,Kb|0,Y|0)|0;Y=lc(V|0,y|0,tb|0,$|0)|0;$=lc(Y|0,y|0,fb|0,ca|0)|0;ca=lc($|0,y|0,Qa|0,fa|0)|0;fa=lc(ca|0,y|0,Ca|0,e|0)|0;e=lc(fa|0,y|0,la|0,L|0)|0;L=lc(e|0,y|0,hc|0,l|0)|0;e=y;la=oc(hc|0,l|0,26)|0;l=kc(b|0,ka|0,la|0,y|0)|0;la=lc(L|0,e|0,16777216,0)|0;ka=jc(la|0,y|0,25)|0;la=y;b=qc(ka|0,la|0,19,0)|0;hc=lc(b|0,y|0,j|0,Ta|0)|0;Ta=y;j=oc(ka|0,la|0,25)|0;la=kc(L|0,e|0,j|0,y|0)|0;j=lc(hc|0,Ta|0,33554432,0)|0;e=jc(j|0,y|0,26)|0;j=y;L=lc(Db|0,h|0,e|0,j|0)|0;h=oc(e|0,j|0,26)|0;j=kc(hc|0,Ta|0,h|0,y|0)|0;c[a>>2]=j;c[a+4>>2]=L;c[a+8>>2]=k;c[a+12>>2]=Vc;c[a+16>>2]=n;c[a+20>>2]=J;c[a+24>>2]=Ab;c[a+28>>2]=na;c[a+32>>2]=l;c[a+36>>2]=la;return}function $a(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;d=0-(c[b+4>>2]|0)|0;e=0-(c[b+8>>2]|0)|0;f=0-(c[b+12>>2]|0)|0;g=0-(c[b+16>>2]|0)|0;h=0-(c[b+20>>2]|0)|0;i=0-(c[b+24>>2]|0)|0;j=0-(c[b+28>>2]|0)|0;k=0-(c[b+32>>2]|0)|0;l=0-(c[b+36>>2]|0)|0;c[a>>2]=0-(c[b>>2]|0);c[a+4>>2]=d;c[a+8>>2]=e;c[a+12>>2]=f;c[a+16>>2]=g;c[a+20>>2]=h;c[a+24>>2]=i;c[a+28>>2]=j;c[a+32>>2]=k;c[a+36>>2]=l;return}function ab(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0;c=l;l=l+128|0;d=c+80|0;e=c+40|0;f=c;cb(d,b);cb(e,d);cb(e,e);_a(e,b,e);_a(d,d,e);cb(d,d);_a(d,e,d);cb(e,d);cb(e,e);cb(e,e);cb(e,e);cb(e,e);_a(d,e,d);cb(e,d);cb(e,e);cb(e,e);cb(e,e);cb(e,e);cb(e,e);cb(e,e);cb(e,e);cb(e,e);cb(e,e);_a(e,e,d);cb(f,e);cb(f,f);cb(f,f);cb(f,f);cb(f,f);cb(f,f);cb(f,f);cb(f,f);cb(f,f);cb(f,f);cb(f,f);cb(f,f);cb(f,f);cb(f,f);cb(f,f);cb(f,f);cb(f,f);cb(f,f);cb(f,f);cb(f,f);_a(e,f,e);cb(e,e);cb(e,e);cb(e,e);cb(e,e);cb(e,e);cb(e,e);cb(e,e);cb(e,e);cb(e,e);cb(e,e);_a(d,e,d);cb(e,d);g=1;do{cb(e,e);g=g+1|0}while((g|0)!=50);_a(e,e,d);cb(f,e);g=1;do{cb(f,f);g=g+1|0}while((g|0)!=100);_a(e,f,e);cb(e,e);f=1;do{cb(e,e);f=f+1|0}while((f|0)!=50);_a(d,e,d);cb(d,d);cb(d,d);_a(a,d,b);l=c;return}function bb(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0,Ma=0,Na=0,Oa=0,Pa=0,Qa=0,Ra=0,Sa=0,Ta=0,Ua=0,Va=0,Wa=0,Xa=0,Ya=0,Za=0,_a=0,$a=0,ab=0,bb=0,cb=0,db=0,eb=0,fb=0,gb=0,hb=0;d=c[b>>2]|0;e=c[b+4>>2]|0;f=c[b+8>>2]|0;g=c[b+12>>2]|0;h=c[b+16>>2]|0;i=c[b+20>>2]|0;j=c[b+24>>2]|0;k=c[b+28>>2]|0;l=c[b+32>>2]|0;m=c[b+36>>2]|0;b=d<<1;n=e<<1;o=f<<1;p=g<<1;q=h<<1;r=i<<1;s=j<<1;t=k<<1;u=i*38|0;v=j*19|0;w=k*38|0;x=l*19|0;z=m*38|0;A=((d|0)<0)<<31>>31;B=qc(d|0,A|0,d|0,A|0)|0;A=y;d=((b|0)<0)<<31>>31;C=((e|0)<0)<<31>>31;D=qc(b|0,d|0,e|0,C|0)|0;E=y;F=((f|0)<0)<<31>>31;G=qc(f|0,F|0,b|0,d|0)|0;H=y;I=((g|0)<0)<<31>>31;J=qc(g|0,I|0,b|0,d|0)|0;K=y;L=((h|0)<0)<<31>>31;M=qc(h|0,L|0,b|0,d|0)|0;N=y;O=((i|0)<0)<<31>>31;P=qc(i|0,O|0,b|0,d|0)|0;Q=y;R=((j|0)<0)<<31>>31;S=qc(j|0,R|0,b|0,d|0)|0;T=y;U=((k|0)<0)<<31>>31;V=qc(k|0,U|0,b|0,d|0)|0;W=y;X=((l|0)<0)<<31>>31;Y=qc(l|0,X|0,b|0,d|0)|0;Z=y;_=((m|0)<0)<<31>>31;$=qc(m|0,_|0,b|0,d|0)|0;d=y;b=((n|0)<0)<<31>>31;aa=qc(n|0,b|0,e|0,C|0)|0;C=y;e=qc(n|0,b|0,f|0,F|0)|0;ba=y;ca=((p|0)<0)<<31>>31;da=qc(p|0,ca|0,n|0,b|0)|0;ea=y;fa=qc(h|0,L|0,n|0,b|0)|0;ga=y;ha=((r|0)<0)<<31>>31;ia=qc(r|0,ha|0,n|0,b|0)|0;ja=y;ka=qc(j|0,R|0,n|0,b|0)|0;la=y;ma=((t|0)<0)<<31>>31;na=qc(t|0,ma|0,n|0,b|0)|0;oa=y;pa=qc(l|0,X|0,n|0,b|0)|0;qa=y;ra=((z|0)<0)<<31>>31;sa=qc(z|0,ra|0,n|0,b|0)|0;b=y;n=qc(f|0,F|0,f|0,F|0)|0;ta=y;ua=((o|0)<0)<<31>>31;va=qc(o|0,ua|0,g|0,I|0)|0;wa=y;xa=qc(h|0,L|0,o|0,ua|0)|0;ya=y;za=qc(i|0,O|0,o|0,ua|0)|0;Aa=y;Ba=qc(j|0,R|0,o|0,ua|0)|0;Ca=y;Da=qc(k|0,U|0,o|0,ua|0)|0;Ea=y;Fa=((x|0)<0)<<31>>31;Ga=qc(x|0,Fa|0,o|0,ua|0)|0;ua=y;o=qc(z|0,ra|0,f|0,F|0)|0;F=y;f=qc(p|0,ca|0,g|0,I|0)|0;I=y;g=qc(p|0,ca|0,h|0,L|0)|0;Ha=y;Ia=qc(r|0,ha|0,p|0,ca|0)|0;Ja=y;Ka=qc(j|0,R|0,p|0,ca|0)|0;La=y;Ma=((w|0)<0)<<31>>31;Na=qc(w|0,Ma|0,p|0,ca|0)|0;Oa=y;Pa=qc(x|0,Fa|0,p|0,ca|0)|0;Qa=y;Ra=qc(z|0,ra|0,p|0,ca|0)|0;ca=y;p=qc(h|0,L|0,h|0,L|0)|0;Sa=y;Ta=((q|0)<0)<<31>>31;Ua=qc(q|0,Ta|0,i|0,O|0)|0;Va=y;Wa=((v|0)<0)<<31>>31;Xa=qc(v|0,Wa|0,q|0,Ta|0)|0;Ya=y;Za=qc(w|0,Ma|0,h|0,L|0)|0;_a=y;$a=qc(x|0,Fa|0,q|0,Ta|0)|0;Ta=y;q=qc(z|0,ra|0,h|0,L|0)|0;L=y;h=qc(u|0,((u|0)<0)<<31>>31|0,i|0,O|0)|0;O=y;i=qc(v|0,Wa|0,r|0,ha|0)|0;u=y;ab=qc(w|0,Ma|0,r|0,ha|0)|0;bb=y;cb=qc(x|0,Fa|0,r|0,ha|0)|0;db=y;eb=qc(z|0,ra|0,r|0,ha|0)|0;ha=y;r=qc(v|0,Wa|0,j|0,R|0)|0;Wa=y;v=qc(w|0,Ma|0,j|0,R|0)|0;fb=y;gb=qc(x|0,Fa|0,s|0,((s|0)<0)<<31>>31|0)|0;s=y;hb=qc(z|0,ra|0,j|0,R|0)|0;R=y;j=qc(w|0,Ma|0,k|0,U|0)|0;U=y;k=qc(x|0,Fa|0,t|0,ma|0)|0;Ma=y;w=qc(z|0,ra|0,t|0,ma|0)|0;ma=y;t=qc(x|0,Fa|0,l|0,X|0)|0;Fa=y;x=qc(z|0,ra|0,l|0,X|0)|0;X=y;l=qc(z|0,ra|0,m|0,_|0)|0;_=y;m=lc(h|0,O|0,B|0,A|0)|0;A=lc(m|0,y|0,Xa|0,Ya|0)|0;Ya=lc(A|0,y|0,Na|0,Oa|0)|0;Oa=lc(Ya|0,y|0,Ga|0,ua|0)|0;ua=lc(Oa|0,y|0,sa|0,b|0)|0;b=y;sa=lc(i|0,u|0,D|0,E|0)|0;E=lc(sa|0,y|0,Za|0,_a|0)|0;_a=lc(E|0,y|0,Pa|0,Qa|0)|0;Qa=lc(_a|0,y|0,o|0,F|0)|0;F=y;o=lc(G|0,H|0,aa|0,C|0)|0;C=lc(o|0,y|0,r|0,Wa|0)|0;Wa=lc(C|0,y|0,ab|0,bb|0)|0;bb=lc(Wa|0,y|0,$a|0,Ta|0)|0;Ta=lc(bb|0,y|0,Ra|0,ca|0)|0;ca=y;Ra=lc(J|0,K|0,e|0,ba|0)|0;ba=lc(Ra|0,y|0,v|0,fb|0)|0;fb=lc(ba|0,y|0,cb|0,db|0)|0;db=lc(fb|0,y|0,q|0,L|0)|0;L=y;q=lc(da|0,ea|0,n|0,ta|0)|0;ta=lc(q|0,y|0,M|0,N|0)|0;N=lc(ta|0,y|0,j|0,U|0)|0;U=lc(N|0,y|0,gb|0,s|0)|0;s=lc(U|0,y|0,eb|0,ha|0)|0;ha=y;eb=lc(fa|0,ga|0,va|0,wa|0)|0;wa=lc(eb|0,y|0,P|0,Q|0)|0;Q=lc(wa|0,y|0,k|0,Ma|0)|0;Ma=lc(Q|0,y|0,hb|0,R|0)|0;R=y;hb=lc(f|0,I|0,xa|0,ya|0)|0;ya=lc(hb|0,y|0,ia|0,ja|0)|0;ja=lc(ya|0,y|0,S|0,T|0)|0;T=lc(ja|0,y|0,t|0,Fa|0)|0;Fa=lc(T|0,y|0,w|0,ma|0)|0;ma=y;w=lc(za|0,Aa|0,g|0,Ha|0)|0;Ha=lc(w|0,y|0,ka|0,la|0)|0;la=lc(Ha|0,y|0,V|0,W|0)|0;W=lc(la|0,y|0,x|0,X|0)|0;X=y;x=lc(Ba|0,Ca|0,p|0,Sa|0)|0;Sa=lc(x|0,y|0,Ia|0,Ja|0)|0;Ja=lc(Sa|0,y|0,na|0,oa|0)|0;oa=lc(Ja|0,y|0,Y|0,Z|0)|0;Z=lc(oa|0,y|0,l|0,_|0)|0;_=y;l=lc(Ka|0,La|0,Ua|0,Va|0)|0;Va=lc(l|0,y|0,Da|0,Ea|0)|0;Ea=lc(Va|0,y|0,pa|0,qa|0)|0;qa=lc(Ea|0,y|0,$|0,d|0)|0;d=y;$=oc(ua|0,b|0,1)|0;b=y;ua=oc(Qa|0,F|0,1)|0;F=y;Qa=oc(Ta|0,ca|0,1)|0;ca=y;Ta=oc(db|0,L|0,1)|0;L=y;db=oc(s|0,ha|0,1)|0;ha=y;s=oc(Ma|0,R|0,1)|0;R=y;Ma=oc(Fa|0,ma|0,1)|0;ma=y;Fa=oc(W|0,X|0,1)|0;X=y;W=oc(Z|0,_|0,1)|0;_=y;Z=oc(qa|0,d|0,1)|0;d=y;qa=lc($|0,b|0,33554432,0)|0;Ea=jc(qa|0,y|0,26)|0;qa=y;pa=lc(Ea|0,qa|0,ua|0,F|0)|0;F=y;ua=oc(Ea|0,qa|0,26)|0;qa=kc($|0,b|0,ua|0,y|0)|0;ua=y;b=lc(db|0,ha|0,33554432,0)|0;$=jc(b|0,y|0,26)|0;b=y;Ea=lc($|0,b|0,s|0,R|0)|0;R=y;s=oc($|0,b|0,26)|0;b=kc(db|0,ha|0,s|0,y|0)|0;s=y;ha=lc(pa|0,F|0,16777216,0)|0;db=jc(ha|0,y|0,25)|0;ha=y;$=lc(db|0,ha|0,Qa|0,ca|0)|0;ca=y;Qa=oc(db|0,ha|0,25)|0;ha=kc(pa|0,F|0,Qa|0,y|0)|0;Qa=y;F=lc(Ea|0,R|0,16777216,0)|0;pa=jc(F|0,y|0,25)|0;F=y;db=lc(pa|0,F|0,Ma|0,ma|0)|0;ma=y;Ma=oc(pa|0,F|0,25)|0;F=kc(Ea|0,R|0,Ma|0,y|0)|0;Ma=y;R=lc($|0,ca|0,33554432,0)|0;Ea=jc(R|0,y|0,26)|0;R=y;pa=lc(Ea|0,R|0,Ta|0,L|0)|0;L=y;Ta=oc(Ea|0,R|0,26)|0;R=kc($|0,ca|0,Ta|0,y|0)|0;Ta=lc(db|0,ma|0,33554432,0)|0;ca=jc(Ta|0,y|0,26)|0;Ta=y;$=lc(ca|0,Ta|0,Fa|0,X|0)|0;X=y;Fa=oc(ca|0,Ta|0,26)|0;Ta=kc(db|0,ma|0,Fa|0,y|0)|0;Fa=lc(pa|0,L|0,16777216,0)|0;ma=jc(Fa|0,y|0,25)|0;Fa=y;db=lc(ma|0,Fa|0,b|0,s|0)|0;s=y;b=oc(ma|0,Fa|0,25)|0;Fa=kc(pa|0,L|0,b|0,y|0)|0;b=lc($|0,X|0,16777216,0)|0;L=jc(b|0,y|0,25)|0;b=y;pa=lc(L|0,b|0,W|0,_|0)|0;_=y;W=oc(L|0,b|0,25)|0;b=kc($|0,X|0,W|0,y|0)|0;W=lc(db|0,s|0,33554432,0)|0;X=jc(W|0,y|0,26)|0;W=y;$=lc(F|0,Ma|0,X|0,W|0)|0;Ma=oc(X|0,W|0,26)|0;W=kc(db|0,s|0,Ma|0,y|0)|0;Ma=lc(pa|0,_|0,33554432,0)|0;s=jc(Ma|0,y|0,26)|0;Ma=y;db=lc(s|0,Ma|0,Z|0,d|0)|0;d=y;Z=oc(s|0,Ma|0,26)|0;Ma=kc(pa|0,_|0,Z|0,y|0)|0;Z=lc(db|0,d|0,16777216,0)|0;_=jc(Z|0,y|0,25)|0;Z=y;pa=qc(_|0,Z|0,19,0)|0;s=lc(pa|0,y|0,qa|0,ua|0)|0;ua=y;qa=oc(_|0,Z|0,25)|0;Z=kc(db|0,d|0,qa|0,y|0)|0;qa=lc(s|0,ua|0,33554432,0)|0;d=jc(qa|0,y|0,26)|0;qa=y;db=lc(ha|0,Qa|0,d|0,qa|0)|0;Qa=oc(d|0,qa|0,26)|0;qa=kc(s|0,ua|0,Qa|0,y|0)|0;c[a>>2]=qa;c[a+4>>2]=db;c[a+8>>2]=R;c[a+12>>2]=Fa;c[a+16>>2]=W;c[a+20>>2]=$;c[a+24>>2]=Ta;c[a+28>>2]=b;c[a+32>>2]=Ma;c[a+36>>2]=Z;return}function cb(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0,Ma=0,Na=0,Oa=0,Pa=0,Qa=0,Ra=0,Sa=0,Ta=0,Ua=0,Va=0,Wa=0,Xa=0,Ya=0,Za=0,_a=0,$a=0,ab=0,bb=0,cb=0,db=0,eb=0,fb=0,gb=0,hb=0;d=c[b>>2]|0;e=c[b+4>>2]|0;f=c[b+8>>2]|0;g=c[b+12>>2]|0;h=c[b+16>>2]|0;i=c[b+20>>2]|0;j=c[b+24>>2]|0;k=c[b+28>>2]|0;l=c[b+32>>2]|0;m=c[b+36>>2]|0;b=d<<1;n=e<<1;o=f<<1;p=g<<1;q=h<<1;r=i<<1;s=j<<1;t=k<<1;u=i*38|0;v=j*19|0;w=k*38|0;x=l*19|0;z=m*38|0;A=((d|0)<0)<<31>>31;B=qc(d|0,A|0,d|0,A|0)|0;A=y;d=((b|0)<0)<<31>>31;C=((e|0)<0)<<31>>31;D=qc(b|0,d|0,e|0,C|0)|0;E=y;F=((f|0)<0)<<31>>31;G=qc(f|0,F|0,b|0,d|0)|0;H=y;I=((g|0)<0)<<31>>31;J=qc(g|0,I|0,b|0,d|0)|0;K=y;L=((h|0)<0)<<31>>31;M=qc(h|0,L|0,b|0,d|0)|0;N=y;O=((i|0)<0)<<31>>31;P=qc(i|0,O|0,b|0,d|0)|0;Q=y;R=((j|0)<0)<<31>>31;S=qc(j|0,R|0,b|0,d|0)|0;T=y;U=((k|0)<0)<<31>>31;V=qc(k|0,U|0,b|0,d|0)|0;W=y;X=((l|0)<0)<<31>>31;Y=qc(l|0,X|0,b|0,d|0)|0;Z=y;_=((m|0)<0)<<31>>31;$=qc(m|0,_|0,b|0,d|0)|0;d=y;b=((n|0)<0)<<31>>31;aa=qc(n|0,b|0,e|0,C|0)|0;C=y;e=qc(n|0,b|0,f|0,F|0)|0;ba=y;ca=((p|0)<0)<<31>>31;da=qc(p|0,ca|0,n|0,b|0)|0;ea=y;fa=qc(h|0,L|0,n|0,b|0)|0;ga=y;ha=((r|0)<0)<<31>>31;ia=qc(r|0,ha|0,n|0,b|0)|0;ja=y;ka=qc(j|0,R|0,n|0,b|0)|0;la=y;ma=((t|0)<0)<<31>>31;na=qc(t|0,ma|0,n|0,b|0)|0;oa=y;pa=qc(l|0,X|0,n|0,b|0)|0;qa=y;ra=((z|0)<0)<<31>>31;sa=qc(z|0,ra|0,n|0,b|0)|0;b=y;n=qc(f|0,F|0,f|0,F|0)|0;ta=y;ua=((o|0)<0)<<31>>31;va=qc(o|0,ua|0,g|0,I|0)|0;wa=y;xa=qc(h|0,L|0,o|0,ua|0)|0;ya=y;za=qc(i|0,O|0,o|0,ua|0)|0;Aa=y;Ba=qc(j|0,R|0,o|0,ua|0)|0;Ca=y;Da=qc(k|0,U|0,o|0,ua|0)|0;Ea=y;Fa=((x|0)<0)<<31>>31;Ga=qc(x|0,Fa|0,o|0,ua|0)|0;ua=y;o=qc(z|0,ra|0,f|0,F|0)|0;F=y;f=qc(p|0,ca|0,g|0,I|0)|0;I=y;g=qc(p|0,ca|0,h|0,L|0)|0;Ha=y;Ia=qc(r|0,ha|0,p|0,ca|0)|0;Ja=y;Ka=qc(j|0,R|0,p|0,ca|0)|0;La=y;Ma=((w|0)<0)<<31>>31;Na=qc(w|0,Ma|0,p|0,ca|0)|0;Oa=y;Pa=qc(x|0,Fa|0,p|0,ca|0)|0;Qa=y;Ra=qc(z|0,ra|0,p|0,ca|0)|0;ca=y;p=qc(h|0,L|0,h|0,L|0)|0;Sa=y;Ta=((q|0)<0)<<31>>31;Ua=qc(q|0,Ta|0,i|0,O|0)|0;Va=y;Wa=((v|0)<0)<<31>>31;Xa=qc(v|0,Wa|0,q|0,Ta|0)|0;Ya=y;Za=qc(w|0,Ma|0,h|0,L|0)|0;_a=y;$a=qc(x|0,Fa|0,q|0,Ta|0)|0;Ta=y;q=qc(z|0,ra|0,h|0,L|0)|0;L=y;h=qc(u|0,((u|0)<0)<<31>>31|0,i|0,O|0)|0;O=y;i=qc(v|0,Wa|0,r|0,ha|0)|0;u=y;ab=qc(w|0,Ma|0,r|0,ha|0)|0;bb=y;cb=qc(x|0,Fa|0,r|0,ha|0)|0;db=y;eb=qc(z|0,ra|0,r|0,ha|0)|0;ha=y;r=qc(v|0,Wa|0,j|0,R|0)|0;Wa=y;v=qc(w|0,Ma|0,j|0,R|0)|0;fb=y;gb=qc(x|0,Fa|0,s|0,((s|0)<0)<<31>>31|0)|0;s=y;hb=qc(z|0,ra|0,j|0,R|0)|0;R=y;j=qc(w|0,Ma|0,k|0,U|0)|0;U=y;k=qc(x|0,Fa|0,t|0,ma|0)|0;Ma=y;w=qc(z|0,ra|0,t|0,ma|0)|0;ma=y;t=qc(x|0,Fa|0,l|0,X|0)|0;Fa=y;x=qc(z|0,ra|0,l|0,X|0)|0;X=y;l=qc(z|0,ra|0,m|0,_|0)|0;_=y;m=lc(h|0,O|0,B|0,A|0)|0;A=lc(m|0,y|0,Xa|0,Ya|0)|0;Ya=lc(A|0,y|0,Na|0,Oa|0)|0;Oa=lc(Ya|0,y|0,Ga|0,ua|0)|0;ua=lc(Oa|0,y|0,sa|0,b|0)|0;b=y;sa=lc(G|0,H|0,aa|0,C|0)|0;C=y;aa=lc(J|0,K|0,e|0,ba|0)|0;ba=y;e=lc(da|0,ea|0,n|0,ta|0)|0;ta=lc(e|0,y|0,M|0,N|0)|0;N=lc(ta|0,y|0,j|0,U|0)|0;U=lc(N|0,y|0,gb|0,s|0)|0;s=lc(U|0,y|0,eb|0,ha|0)|0;ha=y;eb=lc(ua|0,b|0,33554432,0)|0;U=jc(eb|0,y|0,26)|0;eb=y;gb=lc(i|0,u|0,D|0,E|0)|0;E=lc(gb|0,y|0,Za|0,_a|0)|0;_a=lc(E|0,y|0,Pa|0,Qa|0)|0;Qa=lc(_a|0,y|0,o|0,F|0)|0;F=lc(Qa|0,y|0,U|0,eb|0)|0;Qa=y;o=oc(U|0,eb|0,26)|0;eb=kc(ua|0,b|0,o|0,y|0)|0;o=y;b=lc(s|0,ha|0,33554432,0)|0;ua=jc(b|0,y|0,26)|0;b=y;U=lc(fa|0,ga|0,va|0,wa|0)|0;wa=lc(U|0,y|0,P|0,Q|0)|0;Q=lc(wa|0,y|0,k|0,Ma|0)|0;Ma=lc(Q|0,y|0,hb|0,R|0)|0;R=lc(Ma|0,y|0,ua|0,b|0)|0;Ma=y;hb=oc(ua|0,b|0,26)|0;b=kc(s|0,ha|0,hb|0,y|0)|0;hb=y;ha=lc(F|0,Qa|0,16777216,0)|0;s=jc(ha|0,y|0,25)|0;ha=y;ua=lc(sa|0,C|0,r|0,Wa|0)|0;Wa=lc(ua|0,y|0,ab|0,bb|0)|0;bb=lc(Wa|0,y|0,$a|0,Ta|0)|0;Ta=lc(bb|0,y|0,Ra|0,ca|0)|0;ca=lc(Ta|0,y|0,s|0,ha|0)|0;Ta=y;Ra=oc(s|0,ha|0,25)|0;ha=kc(F|0,Qa|0,Ra|0,y|0)|0;Ra=y;Qa=lc(R|0,Ma|0,16777216,0)|0;F=jc(Qa|0,y|0,25)|0;Qa=y;s=lc(f|0,I|0,xa|0,ya|0)|0;ya=lc(s|0,y|0,ia|0,ja|0)|0;ja=lc(ya|0,y|0,S|0,T|0)|0;T=lc(ja|0,y|0,t|0,Fa|0)|0;Fa=lc(T|0,y|0,w|0,ma|0)|0;ma=lc(Fa|0,y|0,F|0,Qa|0)|0;Fa=y;w=oc(F|0,Qa|0,25)|0;Qa=kc(R|0,Ma|0,w|0,y|0)|0;w=y;Ma=lc(ca|0,Ta|0,33554432,0)|0;R=jc(Ma|0,y|0,26)|0;Ma=y;F=lc(aa|0,ba|0,v|0,fb|0)|0;fb=lc(F|0,y|0,cb|0,db|0)|0;db=lc(fb|0,y|0,q|0,L|0)|0;L=lc(db|0,y|0,R|0,Ma|0)|0;db=y;q=oc(R|0,Ma|0,26)|0;Ma=kc(ca|0,Ta|0,q|0,y|0)|0;q=lc(ma|0,Fa|0,33554432,0)|0;Ta=jc(q|0,y|0,26)|0;q=y;ca=lc(za|0,Aa|0,g|0,Ha|0)|0;Ha=lc(ca|0,y|0,ka|0,la|0)|0;la=lc(Ha|0,y|0,V|0,W|0)|0;W=lc(la|0,y|0,x|0,X|0)|0;X=lc(W|0,y|0,Ta|0,q|0)|0;W=y;x=oc(Ta|0,q|0,26)|0;q=kc(ma|0,Fa|0,x|0,y|0)|0;x=lc(L|0,db|0,16777216,0)|0;Fa=jc(x|0,y|0,25)|0;x=y;ma=lc(Fa|0,x|0,b|0,hb|0)|0;hb=y;b=oc(Fa|0,x|0,25)|0;x=kc(L|0,db|0,b|0,y|0)|0;b=lc(X|0,W|0,16777216,0)|0;db=jc(b|0,y|0,25)|0;b=y;L=lc(Ba|0,Ca|0,p|0,Sa|0)|0;Sa=lc(L|0,y|0,Ia|0,Ja|0)|0;Ja=lc(Sa|0,y|0,na|0,oa|0)|0;oa=lc(Ja|0,y|0,Y|0,Z|0)|0;Z=lc(oa|0,y|0,l|0,_|0)|0;_=lc(Z|0,y|0,db|0,b|0)|0;Z=y;l=oc(db|0,b|0,25)|0;b=kc(X|0,W|0,l|0,y|0)|0;l=lc(ma|0,hb|0,33554432,0)|0;W=jc(l|0,y|0,26)|0;l=y;X=lc(Qa|0,w|0,W|0,l|0)|0;w=oc(W|0,l|0,26)|0;l=kc(ma|0,hb|0,w|0,y|0)|0;w=lc(_|0,Z|0,33554432,0)|0;hb=jc(w|0,y|0,26)|0;w=y;ma=lc(Ka|0,La|0,Ua|0,Va|0)|0;Va=lc(ma|0,y|0,Da|0,Ea|0)|0;Ea=lc(Va|0,y|0,pa|0,qa|0)|0;qa=lc(Ea|0,y|0,$|0,d|0)|0;d=lc(qa|0,y|0,hb|0,w|0)|0;qa=y;$=oc(hb|0,w|0,26)|0;w=kc(_|0,Z|0,$|0,y|0)|0;$=lc(d|0,qa|0,16777216,0)|0;Z=jc($|0,y|0,25)|0;$=y;_=qc(Z|0,$|0,19,0)|0;hb=lc(_|0,y|0,eb|0,o|0)|0;o=y;eb=oc(Z|0,$|0,25)|0;$=kc(d|0,qa|0,eb|0,y|0)|0;eb=lc(hb|0,o|0,33554432,0)|0;qa=jc(eb|0,y|0,26)|0;eb=y;d=lc(ha|0,Ra|0,qa|0,eb|0)|0;Ra=oc(qa|0,eb|0,26)|0;eb=kc(hb|0,o|0,Ra|0,y|0)|0;c[a>>2]=eb;c[a+4>>2]=d;c[a+8>>2]=Ma;c[a+12>>2]=x;c[a+16>>2]=l;c[a+20>>2]=X;c[a+24>>2]=q;c[a+28>>2]=b;c[a+32>>2]=w;c[a+36>>2]=$;return}function db(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;e=(c[b+4>>2]|0)-(c[d+4>>2]|0)|0;f=(c[b+8>>2]|0)-(c[d+8>>2]|0)|0;g=(c[b+12>>2]|0)-(c[d+12>>2]|0)|0;h=(c[b+16>>2]|0)-(c[d+16>>2]|0)|0;i=(c[b+20>>2]|0)-(c[d+20>>2]|0)|0;j=(c[b+24>>2]|0)-(c[d+24>>2]|0)|0;k=(c[b+28>>2]|0)-(c[d+28>>2]|0)|0;l=(c[b+32>>2]|0)-(c[d+32>>2]|0)|0;m=(c[b+36>>2]|0)-(c[d+36>>2]|0)|0;c[a>>2]=(c[b>>2]|0)-(c[d>>2]|0);c[a+4>>2]=e;c[a+8>>2]=f;c[a+12>>2]=g;c[a+16>>2]=h;c[a+20>>2]=i;c[a+24>>2]=j;c[a+28>>2]=k;c[a+32>>2]=l;c[a+36>>2]=m;return}function eb(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;e=c[d>>2]|0;f=c[d+4>>2]|0;g=c[d+8>>2]|0;h=c[d+12>>2]|0;i=c[d+16>>2]|0;j=c[d+20>>2]|0;k=c[d+24>>2]|0;l=c[d+28>>2]|0;m=c[d+32>>2]|0;n=c[d+36>>2]|0;d=(((((((((((((n*19|0)+16777216>>25)+e>>26)+f>>25)+g>>26)+h>>25)+i>>26)+j>>25)+k>>26)+l>>25)+m>>26)+n>>25)*19|0)+e|0;e=d>>26;o=e+f|0;f=d-(e<<26)|0;e=o>>25;d=e+g|0;g=o-(e<<25)|0;e=d>>26;o=e+h|0;h=d-(e<<26)|0;e=o>>25;d=e+i|0;i=o-(e<<25)|0;e=d>>26;o=e+j|0;j=d-(e<<26)|0;e=o>>25;d=e+k|0;k=o-(e<<25)|0;e=d>>26;o=e+l|0;l=d-(e<<26)|0;e=o>>25;d=e+m|0;m=o-(e<<25)|0;e=d>>26;o=e+n|0;n=d-(e<<26)|0;e=o&33554431;a[b>>0]=f;a[b+1>>0]=f>>>8;a[b+2>>0]=f>>>16;a[b+3>>0]=g<<2|f>>>24;a[b+4>>0]=g>>>6;a[b+5>>0]=g>>>14;a[b+6>>0]=h<<3|g>>>22;a[b+7>>0]=h>>>5;a[b+8>>0]=h>>>13;a[b+9>>0]=i<<5|h>>>21;a[b+10>>0]=i>>>3;a[b+11>>0]=i>>>11;a[b+12>>0]=j<<6|i>>>19;a[b+13>>0]=j>>>2;a[b+14>>0]=j>>>10;a[b+15>>0]=j>>>18;a[b+16>>0]=k;a[b+17>>0]=k>>>8;a[b+18>>0]=k>>>16;a[b+19>>0]=l<<1|k>>>24;a[b+20>>0]=l>>>7;a[b+21>>0]=l>>>15;a[b+22>>0]=m<<3|l>>>23;a[b+23>>0]=m>>>5;a[b+24>>0]=m>>>13;a[b+25>>0]=n<<4|m>>>21;a[b+26>>0]=n>>>4;a[b+27>>0]=n>>>12;a[b+28>>0]=n>>>20|e<<6;a[b+29>>0]=o>>>2;a[b+30>>0]=o>>>10;a[b+31>>0]=e>>>18;return}function fb(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0;d=l;l=l+48|0;e=d;f=b+40|0;Ra(a,f,b);g=a+40|0;db(g,f,b);f=a+80|0;_a(f,a,c);_a(g,g,c+40|0);h=a+120|0;_a(h,c+120|0,b+120|0);_a(a,b+80|0,c+80|0);Ra(e,a,a);db(a,f,g);Ra(g,f,g);Ra(f,e,h);db(h,e,h);l=d;return}function gb(b,c,d,e){b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;f=l;l=l+2272|0;g=f+2016|0;h=f+1760|0;i=f+480|0;j=f+320|0;k=f+160|0;m=f;hb(g,c);hb(h,e);sb(i,d);qb(j,d);mb(m,j);fb(j,m,i);mb(k,j);d=i+160|0;sb(d,k);fb(j,m,d);mb(k,j);d=i+320|0;sb(d,k);fb(j,m,d);mb(k,j);d=i+480|0;sb(d,k);fb(j,m,d);mb(k,j);d=i+640|0;sb(d,k);fb(j,m,d);mb(k,j);d=i+800|0;sb(d,k);fb(j,m,d);mb(k,j);d=i+960|0;sb(d,k);fb(j,m,d);mb(k,j);sb(i+1120|0,k);nb(b);d=255;while(1){if(a[g+d>>0]|0){n=d;break}if(a[h+d>>0]|0){n=d;break}m=d+-1|0;if((d|0)>0)d=m;else{n=m;break}}if((n|0)>-1)o=n;else{l=f;return}while(1){ob(j,b);n=a[g+o>>0]|0;if(n<<24>>24<=0){if(n<<24>>24<0){mb(k,j);Ab(j,k,i+((((n<<24>>24)/-2|0)<<24>>24)*160|0)|0)}}else{mb(k,j);fb(j,k,i+(((n&255)>>>1&255)*160|0)|0)}n=a[h+o>>0]|0;if(n<<24>>24<=0){if(n<<24>>24<0){mb(k,j);kb(j,k,712+((((n<<24>>24)/-2|0)<<24>>24)*120|0)|0)}}else{mb(k,j);jb(j,k,712+(((n&255)>>>1&255)*120|0)|0)}lb(b,j);if((o|0)>0)o=o+-1|0;else break}l=f;return}function hb(b,c){b=b|0;c=c|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;e=0;do{a[b+e>>0]=(d[c+(e>>3)>>0]|0)>>>(e&7)&1;e=e+1|0}while((e|0)!=256);f=0;do{e=b+f|0;a:do if(a[e>>0]|0){c=1;do{g=c+f|0;if((g|0)>=256)break a;h=b+g|0;i=a[h>>0]|0;b:do if(i<<24>>24){j=a[e>>0]|0;k=i<<24>>24<<c;l=j+k|0;if((l|0)<16){a[e>>0]=l;a[h>>0]=0;break}l=j-k|0;if((l|0)<=-16)break a;a[e>>0]=l;l=g;while(1){m=b+l|0;if(!(a[m>>0]|0))break;a[m>>0]=0;l=l+1|0;if((l|0)>=256)break b}a[m>>0]=1}while(0);c=c+1|0}while((c|0)<7)}while(0);f=f+1|0}while((f|0)!=256);return}function ib(a,b){a=a|0;b=b|0;var c=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0;c=l;l=l+208|0;e=c+160|0;f=c+120|0;g=c+80|0;h=c+40|0;i=c;j=a+40|0;Ua(j,b);k=a+80|0;Qa(k);cb(e,j);_a(f,e,1672);db(e,e,k);Ra(f,f,k);cb(g,f);_a(g,g,f);cb(a,g);_a(a,a,f);_a(a,a,e);ab(a,a);_a(a,a,g);_a(a,a,e);cb(h,a);_a(h,h,f);db(i,h,e);do if(Za(i)|0){Ra(i,h,e);if(!(Za(i)|0)){_a(a,a,1712);break}else{m=-1;l=c;return m|0}}while(0);i=Ya(a)|0;if((i|0)==((d[b+31>>0]|0)>>>7|0))$a(a,a);_a(a+120|0,a,j);m=0;l=c;return m|0}function jb(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0;d=l;l=l+48|0;e=d;f=b+40|0;Ra(a,f,b);g=a+40|0;db(g,f,b);f=a+80|0;_a(f,a,c);_a(g,g,c+40|0);h=a+120|0;_a(h,c+80|0,b+120|0);c=b+80|0;Ra(e,c,c);db(a,f,g);Ra(g,f,g);Ra(f,e,h);db(h,e,h);l=d;return}function kb(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0;d=l;l=l+48|0;e=d;f=b+40|0;Ra(a,f,b);g=a+40|0;db(g,f,b);f=a+80|0;_a(f,a,c+40|0);_a(g,g,c);h=a+120|0;_a(h,c+80|0,b+120|0);c=b+80|0;Ra(e,c,c);db(a,f,g);Ra(g,f,g);db(f,e,h);Ra(h,e,h);l=d;return}function lb(a,b){a=a|0;b=b|0;var c=0,d=0;c=b+120|0;_a(a,b,c);d=b+80|0;_a(a+40|0,b+40|0,d);_a(a+80|0,d,c);return}function mb(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=b+120|0;_a(a,b,c);d=b+40|0;e=b+80|0;_a(a+40|0,d,e);_a(a+80|0,e,c);_a(a+120|0,b,d);return}function nb(a){a=a|0;Pa(a);Qa(a+40|0);Qa(a+80|0);return}function ob(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0;c=l;l=l+48|0;d=c;cb(a,b);e=a+80|0;f=b+40|0;cb(e,f);g=a+120|0;bb(g,b+80|0);h=a+40|0;Ra(h,b,f);cb(d,h);Ra(h,e,a);db(e,e,a);db(a,d,h);db(g,g,e);l=c;return}function pb(a){a=a|0;Pa(a);Qa(a+40|0);Qa(a+80|0);Pa(a+120|0);return}function qb(a,b){a=a|0;b=b|0;var c=0,d=0;c=l;l=l+128|0;d=c;tb(d,b);ob(a,d);l=c;return}function rb(b,c){b=b|0;c=c|0;var e=0,f=0,g=0,h=0;e=l;l=l+128|0;f=e+80|0;g=e+40|0;h=e;Xa(f,c+80|0);_a(g,c,f);_a(h,c+40|0,f);eb(b,h);h=(Ya(g)|0)<<7;g=b+31|0;a[g>>0]=(d[g>>0]|0)^h;l=e;return}function sb(a,b){a=a|0;b=b|0;var c=0;c=b+40|0;Ra(a,c,b);db(a+40|0,c,b);Ta(a+80|0,b+80|0);_a(a+120|0,b+120|0,1752);return}function tb(a,b){a=a|0;b=b|0;Ta(a,b);Ta(a+40|0,b+40|0);Ta(a+80|0,b+80|0);return}function ub(a){a=a|0;Qa(a);Qa(a+40|0);Pa(a+80|0);return}function vb(b,c){b=b|0;c=c|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;e=l;l=l+464|0;f=e+400|0;g=e+240|0;h=e+120|0;i=e;j=0;do{k=a[c+j>>0]|0;m=j<<1;a[f+m>>0]=k&15;a[f+(m|1)>>0]=(k&255)>>>4;j=j+1|0}while((j|0)!=32);n=0;o=0;do{j=f+o|0;c=(d[j>>0]|0)+n|0;n=(c<<24)+134217728>>28;a[j>>0]=c-(n<<4);o=o+1|0}while((o|0)!=63);o=f+63|0;a[o>>0]=(d[o>>0]|0)+n;pb(b);n=1;do{wb(i,(n|0)/2|0,a[f+n>>0]|0);jb(g,b,i);mb(b,g);n=n+2|0}while((n|0)<64);qb(g,b);lb(h,g);ob(g,h);lb(h,g);ob(g,h);lb(h,g);ob(g,h);mb(b,g);h=0;do{wb(i,(h|0)/2|0,a[f+h>>0]|0);jb(g,b,i);mb(b,g);h=h+2|0}while((h|0)<64);l=e;return}function wb(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0;d=l;l=l+128|0;e=d;f=xb(c)|0;g=c<<24>>24;c=g-((g&0-(f&255))<<1)&255;ub(a);zb(a,1792+(b*960|0)|0,yb(c,1)|0);zb(a,1792+(b*960|0)+120|0,yb(c,2)|0);zb(a,1792+(b*960|0)+240|0,yb(c,3)|0);zb(a,1792+(b*960|0)+360|0,yb(c,4)|0);zb(a,1792+(b*960|0)+480|0,yb(c,5)|0);zb(a,1792+(b*960|0)+600|0,yb(c,6)|0);zb(a,1792+(b*960|0)+720|0,yb(c,7)|0);zb(a,1792+(b*960|0)+840|0,yb(c,8)|0);Ta(e,a+40|0);Ta(e+40|0,a);$a(e+80|0,a+80|0);zb(a,e,f);l=d;return}function xb(a){a=a|0;var b=0;b=a<<24>>24;a=nc(b|0,((b|0)<0)<<31>>31|0,63)|0;return a&255|0}function yb(a,b){a=a|0;b=b|0;return (((b^a)&255)+-1|0)>>>31&255|0}function zb(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;d=c&255;Sa(a,b,d);Sa(a+40|0,b+40|0,d);Sa(a+80|0,b+80|0,d);return}function Ab(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0;d=l;l=l+48|0;e=d;f=b+40|0;Ra(a,f,b);g=a+40|0;db(g,f,b);f=a+80|0;_a(f,a,c+40|0);_a(g,g,c);h=a+120|0;_a(h,c+120|0,b+120|0);_a(a,b+80|0,c+80|0);Ra(e,a,a);db(a,f,g);Ra(g,f,g);db(f,e,h);Ra(h,e,h);l=d;return}function Bb(b,c){b=b|0;c=c|0;var e=0,f=0,g=0,h=0;e=l;l=l+128|0;f=e+80|0;g=e+40|0;h=e;Xa(f,c+80|0);_a(g,c,f);_a(h,c+40|0,f);eb(b,h);h=(Ya(g)|0)<<7;g=b+31|0;a[g>>0]=(d[g>>0]|0)^h;l=e;return}function Cb(b,e,f,g,h,i){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;var j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;j=l;l=l+480|0;k=j+440|0;m=j+408|0;n=j+376|0;o=j+312|0;p=j+280|0;q=j+120|0;r=j;if((!(h>>>0<0|(h|0)==0&g>>>0<64)?(d[f+63>>0]|0)<=31:0)?(ib(q,i)|0)==0:0){s=k;t=i;i=s+32|0;do{a[s>>0]=a[t>>0]|0;s=s+1|0;t=t+1|0}while((s|0)<(i|0));s=m;t=f;i=s+32|0;do{a[s>>0]=a[t>>0]|0;s=s+1|0;t=t+1|0}while((s|0)<(i|0));s=n;t=f+32|0;i=s+32|0;do{a[s>>0]=a[t>>0]|0;s=s+1|0;t=t+1|0}while((s|0)<(i|0));tc(b|0,f|0,g|0)|0;s=b+32|0;t=k;i=s+32|0;do{a[s>>0]=a[t>>0]|0;s=s+1|0;t=t+1|0}while((s|0)<(i|0));ta(o,b,g,h)|0;Gb(o);gb(r,o,q,n);Bb(p,r);if(!(qa(p,m)|0)){m=lc(g|0,h|0,-64,-1)|0;h=y;tc(b|0,b+64|0,m|0)|0;s=b+g+-64|0;i=s+64|0;do{a[s>>0]=0;s=s+1|0}while((s|0)<(i|0));s=e;c[s>>2]=m;c[s+4>>2]=h;u=0;l=j;return u|0}}h=e;c[h>>2]=-1;c[h+4>>2]=-1;mc(b|0,0,g|0)|0;u=-1;l=j;return u|0}function Db(b,c,d,e){b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0,Ma=0,Na=0,Oa=0,Pa=0,Qa=0,Ra=0,Sa=0,Ta=0,Ua=0,Va=0,Wa=0,Xa=0,Ya=0,Za=0,_a=0,$a=0,ab=0,bb=0,cb=0,db=0,eb=0,fb=0,gb=0,hb=0,ib=0,jb=0,kb=0,lb=0,mb=0,nb=0,ob=0,pb=0,qb=0,rb=0,sb=0,tb=0,ub=0,vb=0,wb=0,xb=0,yb=0,zb=0,Ab=0,Bb=0,Cb=0,Db=0,Gb=0,Hb=0,Ib=0,Jb=0,Kb=0,Lb=0,Mb=0,Nb=0,Ob=0,Pb=0,Qb=0,Rb=0,Sb=0,Tb=0,Ub=0,Vb=0,Wb=0,Xb=0,Yb=0,Zb=0,_b=0,$b=0,ac=0,bc=0,cc=0,dc=0,ec=0,fc=0,gc=0,hc=0,ic=0,mc=0,pc=0,rc=0,sc=0,tc=0,uc=0,vc=0,wc=0,xc=0,yc=0,zc=0,Ac=0,Bc=0;f=c+2|0;g=Eb(a[c>>0]|0,a[c+1>>0]|0,a[f>>0]|0)|0;h=g&2097151;g=Fb(f)|0;f=nc(g|0,y|0,5)|0;g=f&2097151;f=c+7|0;i=Eb(a[c+5>>0]|0,a[c+6>>0]|0,a[f>>0]|0)|0;j=nc(i|0,y|0,2)|0;i=j&2097151;j=Fb(f)|0;f=nc(j|0,y|0,7)|0;j=f&2097151;f=Fb(c+10|0)|0;k=nc(f|0,y|0,4)|0;f=k&2097151;k=c+15|0;l=Eb(a[c+13>>0]|0,a[c+14>>0]|0,a[k>>0]|0)|0;m=nc(l|0,y|0,1)|0;l=m&2097151;m=Fb(k)|0;k=nc(m|0,y|0,6)|0;m=k&2097151;k=Eb(a[c+18>>0]|0,a[c+19>>0]|0,a[c+20>>0]|0)|0;n=nc(k|0,y|0,3)|0;k=n&2097151;n=c+23|0;o=Eb(a[c+21>>0]|0,a[c+22>>0]|0,a[n>>0]|0)|0;p=o&2097151;o=Fb(n)|0;n=nc(o|0,y|0,5)|0;o=n&2097151;n=c+28|0;q=Eb(a[c+26>>0]|0,a[c+27>>0]|0,a[n>>0]|0)|0;c=nc(q|0,y|0,2)|0;q=c&2097151;c=Fb(n)|0;n=nc(c|0,y|0,7)|0;c=y;r=d+2|0;s=Eb(a[d>>0]|0,a[d+1>>0]|0,a[r>>0]|0)|0;t=s&2097151;s=Fb(r)|0;r=nc(s|0,y|0,5)|0;s=r&2097151;r=d+7|0;u=Eb(a[d+5>>0]|0,a[d+6>>0]|0,a[r>>0]|0)|0;v=nc(u|0,y|0,2)|0;u=v&2097151;v=Fb(r)|0;r=nc(v|0,y|0,7)|0;v=r&2097151;r=Fb(d+10|0)|0;w=nc(r|0,y|0,4)|0;r=w&2097151;w=d+15|0;x=Eb(a[d+13>>0]|0,a[d+14>>0]|0,a[w>>0]|0)|0;z=nc(x|0,y|0,1)|0;x=z&2097151;z=Fb(w)|0;w=nc(z|0,y|0,6)|0;z=w&2097151;w=Eb(a[d+18>>0]|0,a[d+19>>0]|0,a[d+20>>0]|0)|0;A=nc(w|0,y|0,3)|0;w=A&2097151;A=d+23|0;B=Eb(a[d+21>>0]|0,a[d+22>>0]|0,a[A>>0]|0)|0;C=B&2097151;B=Fb(A)|0;A=nc(B|0,y|0,5)|0;B=A&2097151;A=d+28|0;D=Eb(a[d+26>>0]|0,a[d+27>>0]|0,a[A>>0]|0)|0;d=nc(D|0,y|0,2)|0;D=d&2097151;d=Fb(A)|0;A=nc(d|0,y|0,7)|0;d=y;E=e+2|0;F=Eb(a[e>>0]|0,a[e+1>>0]|0,a[E>>0]|0)|0;G=Fb(E)|0;E=nc(G|0,y|0,5)|0;G=e+7|0;H=Eb(a[e+5>>0]|0,a[e+6>>0]|0,a[G>>0]|0)|0;I=nc(H|0,y|0,2)|0;H=Fb(G)|0;G=nc(H|0,y|0,7)|0;H=Fb(e+10|0)|0;J=nc(H|0,y|0,4)|0;H=e+15|0;K=Eb(a[e+13>>0]|0,a[e+14>>0]|0,a[H>>0]|0)|0;L=nc(K|0,y|0,1)|0;K=Fb(H)|0;H=nc(K|0,y|0,6)|0;K=Eb(a[e+18>>0]|0,a[e+19>>0]|0,a[e+20>>0]|0)|0;M=nc(K|0,y|0,3)|0;K=e+23|0;N=Eb(a[e+21>>0]|0,a[e+22>>0]|0,a[K>>0]|0)|0;O=Fb(K)|0;K=nc(O|0,y|0,5)|0;O=e+28|0;P=Eb(a[e+26>>0]|0,a[e+27>>0]|0,a[O>>0]|0)|0;e=nc(P|0,y|0,2)|0;P=Fb(O)|0;O=nc(P|0,y|0,7)|0;P=y;Q=qc(t|0,0,h|0,0)|0;R=lc(F&2097151|0,0,Q|0,y|0)|0;Q=y;F=qc(s|0,0,h|0,0)|0;S=y;T=qc(t|0,0,g|0,0)|0;U=y;V=qc(u|0,0,h|0,0)|0;W=y;X=qc(s|0,0,g|0,0)|0;Y=y;Z=qc(t|0,0,i|0,0)|0;_=lc(X|0,Y|0,Z|0,y|0)|0;Z=lc(_|0,y|0,V|0,W|0)|0;W=lc(Z|0,y|0,I&2097151|0,0)|0;I=y;Z=qc(v|0,0,h|0,0)|0;V=y;_=qc(u|0,0,g|0,0)|0;Y=y;X=qc(s|0,0,i|0,0)|0;$=y;aa=qc(t|0,0,j|0,0)|0;ba=y;ca=qc(r|0,0,h|0,0)|0;da=y;ea=qc(v|0,0,g|0,0)|0;fa=y;ga=qc(u|0,0,i|0,0)|0;ha=y;ia=qc(s|0,0,j|0,0)|0;ja=y;ka=qc(t|0,0,f|0,0)|0;la=lc(ia|0,ja|0,ka|0,y|0)|0;ka=lc(la|0,y|0,ga|0,ha|0)|0;ha=lc(ka|0,y|0,ea|0,fa|0)|0;fa=lc(ha|0,y|0,ca|0,da|0)|0;da=lc(fa|0,y|0,J&2097151|0,0)|0;J=y;fa=qc(x|0,0,h|0,0)|0;ca=y;ha=qc(r|0,0,g|0,0)|0;ea=y;ka=qc(v|0,0,i|0,0)|0;ga=y;la=qc(u|0,0,j|0,0)|0;ja=y;ia=qc(s|0,0,f|0,0)|0;ma=y;na=qc(t|0,0,l|0,0)|0;oa=y;pa=qc(z|0,0,h|0,0)|0;qa=y;ra=qc(x|0,0,g|0,0)|0;sa=y;ta=qc(r|0,0,i|0,0)|0;ua=y;va=qc(v|0,0,j|0,0)|0;wa=y;xa=qc(u|0,0,f|0,0)|0;ya=y;za=qc(s|0,0,l|0,0)|0;Aa=y;Ba=qc(t|0,0,m|0,0)|0;Ca=lc(za|0,Aa|0,Ba|0,y|0)|0;Ba=lc(Ca|0,y|0,xa|0,ya|0)|0;ya=lc(Ba|0,y|0,va|0,wa|0)|0;wa=lc(ya|0,y|0,ta|0,ua|0)|0;ua=lc(wa|0,y|0,ra|0,sa|0)|0;sa=lc(ua|0,y|0,pa|0,qa|0)|0;qa=lc(sa|0,y|0,H&2097151|0,0)|0;H=y;sa=qc(w|0,0,h|0,0)|0;pa=y;ua=qc(z|0,0,g|0,0)|0;ra=y;wa=qc(x|0,0,i|0,0)|0;ta=y;ya=qc(r|0,0,j|0,0)|0;va=y;Ba=qc(v|0,0,f|0,0)|0;xa=y;Ca=qc(u|0,0,l|0,0)|0;Aa=y;za=qc(s|0,0,m|0,0)|0;Da=y;Ea=qc(t|0,0,k|0,0)|0;Fa=y;Ga=qc(C|0,0,h|0,0)|0;Ha=y;Ia=qc(w|0,0,g|0,0)|0;Ja=y;Ka=qc(z|0,0,i|0,0)|0;La=y;Ma=qc(x|0,0,j|0,0)|0;Na=y;Oa=qc(r|0,0,f|0,0)|0;Pa=y;Qa=qc(v|0,0,l|0,0)|0;Ra=y;Sa=qc(u|0,0,m|0,0)|0;Ta=y;Ua=qc(s|0,0,k|0,0)|0;Va=y;Wa=qc(t|0,0,p|0,0)|0;Xa=lc(Ua|0,Va|0,Wa|0,y|0)|0;Wa=lc(Xa|0,y|0,Sa|0,Ta|0)|0;Ta=lc(Wa|0,y|0,Qa|0,Ra|0)|0;Ra=lc(Ta|0,y|0,Oa|0,Pa|0)|0;Pa=lc(Ra|0,y|0,Ma|0,Na|0)|0;Na=lc(Pa|0,y|0,Ka|0,La|0)|0;La=lc(Na|0,y|0,Ia|0,Ja|0)|0;Ja=lc(La|0,y|0,Ga|0,Ha|0)|0;Ha=lc(Ja|0,y|0,N&2097151|0,0)|0;N=y;Ja=qc(B|0,0,h|0,0)|0;Ga=y;La=qc(C|0,0,g|0,0)|0;Ia=y;Na=qc(w|0,0,i|0,0)|0;Ka=y;Pa=qc(z|0,0,j|0,0)|0;Ma=y;Ra=qc(x|0,0,f|0,0)|0;Oa=y;Ta=qc(r|0,0,l|0,0)|0;Qa=y;Wa=qc(v|0,0,m|0,0)|0;Sa=y;Xa=qc(u|0,0,k|0,0)|0;Va=y;Ua=qc(s|0,0,p|0,0)|0;Ya=y;Za=qc(t|0,0,o|0,0)|0;_a=y;$a=qc(D|0,0,h|0,0)|0;ab=y;bb=qc(B|0,0,g|0,0)|0;cb=y;db=qc(C|0,0,i|0,0)|0;eb=y;fb=qc(w|0,0,j|0,0)|0;gb=y;hb=qc(z|0,0,f|0,0)|0;ib=y;jb=qc(x|0,0,l|0,0)|0;kb=y;lb=qc(r|0,0,m|0,0)|0;mb=y;nb=qc(v|0,0,k|0,0)|0;ob=y;pb=qc(u|0,0,p|0,0)|0;qb=y;rb=qc(s|0,0,o|0,0)|0;sb=y;tb=qc(t|0,0,q|0,0)|0;ub=lc(rb|0,sb|0,tb|0,y|0)|0;tb=lc(ub|0,y|0,pb|0,qb|0)|0;qb=lc(tb|0,y|0,nb|0,ob|0)|0;ob=lc(qb|0,y|0,lb|0,mb|0)|0;mb=lc(ob|0,y|0,jb|0,kb|0)|0;kb=lc(mb|0,y|0,hb|0,ib|0)|0;ib=lc(kb|0,y|0,fb|0,gb|0)|0;gb=lc(ib|0,y|0,db|0,eb|0)|0;eb=lc(gb|0,y|0,bb|0,cb|0)|0;cb=lc(eb|0,y|0,$a|0,ab|0)|0;ab=lc(cb|0,y|0,e&2097151|0,0)|0;e=y;cb=qc(A|0,d|0,h|0,0)|0;h=y;$a=qc(D|0,0,g|0,0)|0;eb=y;bb=qc(B|0,0,i|0,0)|0;gb=y;db=qc(C|0,0,j|0,0)|0;ib=y;fb=qc(w|0,0,f|0,0)|0;kb=y;hb=qc(z|0,0,l|0,0)|0;mb=y;jb=qc(x|0,0,m|0,0)|0;ob=y;lb=qc(r|0,0,k|0,0)|0;qb=y;nb=qc(v|0,0,p|0,0)|0;tb=y;pb=qc(u|0,0,o|0,0)|0;ub=y;sb=qc(s|0,0,q|0,0)|0;rb=y;vb=qc(t|0,0,n|0,c|0)|0;t=y;wb=qc(A|0,d|0,g|0,0)|0;g=y;xb=qc(D|0,0,i|0,0)|0;yb=y;zb=qc(B|0,0,j|0,0)|0;Ab=y;Bb=qc(C|0,0,f|0,0)|0;Cb=y;Db=qc(w|0,0,l|0,0)|0;Gb=y;Hb=qc(z|0,0,m|0,0)|0;Ib=y;Jb=qc(x|0,0,k|0,0)|0;Kb=y;Lb=qc(r|0,0,p|0,0)|0;Mb=y;Nb=qc(v|0,0,o|0,0)|0;Ob=y;Pb=qc(u|0,0,q|0,0)|0;Qb=y;Rb=qc(s|0,0,n|0,c|0)|0;s=lc(Pb|0,Qb|0,Rb|0,y|0)|0;Rb=lc(s|0,y|0,Nb|0,Ob|0)|0;Ob=lc(Rb|0,y|0,Lb|0,Mb|0)|0;Mb=lc(Ob|0,y|0,Jb|0,Kb|0)|0;Kb=lc(Mb|0,y|0,Hb|0,Ib|0)|0;Ib=lc(Kb|0,y|0,Db|0,Gb|0)|0;Gb=lc(Ib|0,y|0,Bb|0,Cb|0)|0;Cb=lc(Gb|0,y|0,zb|0,Ab|0)|0;Ab=lc(Cb|0,y|0,xb|0,yb|0)|0;yb=lc(Ab|0,y|0,wb|0,g|0)|0;g=y;wb=qc(A|0,d|0,i|0,0)|0;i=y;Ab=qc(D|0,0,j|0,0)|0;xb=y;Cb=qc(B|0,0,f|0,0)|0;zb=y;Gb=qc(C|0,0,l|0,0)|0;Bb=y;Ib=qc(w|0,0,m|0,0)|0;Db=y;Kb=qc(z|0,0,k|0,0)|0;Hb=y;Mb=qc(x|0,0,p|0,0)|0;Jb=y;Ob=qc(r|0,0,o|0,0)|0;Lb=y;Rb=qc(v|0,0,q|0,0)|0;Nb=y;s=qc(u|0,0,n|0,c|0)|0;u=y;Qb=qc(A|0,d|0,j|0,0)|0;j=y;Pb=qc(D|0,0,f|0,0)|0;Sb=y;Tb=qc(B|0,0,l|0,0)|0;Ub=y;Vb=qc(C|0,0,m|0,0)|0;Wb=y;Xb=qc(w|0,0,k|0,0)|0;Yb=y;Zb=qc(z|0,0,p|0,0)|0;_b=y;$b=qc(x|0,0,o|0,0)|0;ac=y;bc=qc(r|0,0,q|0,0)|0;cc=y;dc=qc(v|0,0,n|0,c|0)|0;v=lc(bc|0,cc|0,dc|0,y|0)|0;dc=lc(v|0,y|0,$b|0,ac|0)|0;ac=lc(dc|0,y|0,Zb|0,_b|0)|0;_b=lc(ac|0,y|0,Xb|0,Yb|0)|0;Yb=lc(_b|0,y|0,Vb|0,Wb|0)|0;Wb=lc(Yb|0,y|0,Tb|0,Ub|0)|0;Ub=lc(Wb|0,y|0,Pb|0,Sb|0)|0;Sb=lc(Ub|0,y|0,Qb|0,j|0)|0;j=y;Qb=qc(A|0,d|0,f|0,0)|0;f=y;Ub=qc(D|0,0,l|0,0)|0;Pb=y;Wb=qc(B|0,0,m|0,0)|0;Tb=y;Yb=qc(C|0,0,k|0,0)|0;Vb=y;_b=qc(w|0,0,p|0,0)|0;Xb=y;ac=qc(z|0,0,o|0,0)|0;Zb=y;dc=qc(x|0,0,q|0,0)|0;$b=y;v=qc(r|0,0,n|0,c|0)|0;r=y;cc=qc(A|0,d|0,l|0,0)|0;l=y;bc=qc(D|0,0,m|0,0)|0;ec=y;fc=qc(B|0,0,k|0,0)|0;gc=y;hc=qc(C|0,0,p|0,0)|0;ic=y;mc=qc(w|0,0,o|0,0)|0;pc=y;rc=qc(z|0,0,q|0,0)|0;sc=y;tc=qc(x|0,0,n|0,c|0)|0;x=lc(rc|0,sc|0,tc|0,y|0)|0;tc=lc(x|0,y|0,mc|0,pc|0)|0;pc=lc(tc|0,y|0,hc|0,ic|0)|0;ic=lc(pc|0,y|0,fc|0,gc|0)|0;gc=lc(ic|0,y|0,bc|0,ec|0)|0;ec=lc(gc|0,y|0,cc|0,l|0)|0;l=y;cc=qc(A|0,d|0,m|0,0)|0;m=y;gc=qc(D|0,0,k|0,0)|0;bc=y;ic=qc(B|0,0,p|0,0)|0;fc=y;pc=qc(C|0,0,o|0,0)|0;hc=y;tc=qc(w|0,0,q|0,0)|0;mc=y;x=qc(z|0,0,n|0,c|0)|0;z=y;sc=qc(A|0,d|0,k|0,0)|0;k=y;rc=qc(D|0,0,p|0,0)|0;uc=y;vc=qc(B|0,0,o|0,0)|0;wc=y;xc=qc(C|0,0,q|0,0)|0;yc=y;zc=qc(w|0,0,n|0,c|0)|0;w=lc(xc|0,yc|0,zc|0,y|0)|0;zc=lc(w|0,y|0,vc|0,wc|0)|0;wc=lc(zc|0,y|0,rc|0,uc|0)|0;uc=lc(wc|0,y|0,sc|0,k|0)|0;k=y;sc=qc(A|0,d|0,p|0,0)|0;p=y;wc=qc(D|0,0,o|0,0)|0;rc=y;zc=qc(B|0,0,q|0,0)|0;vc=y;w=qc(C|0,0,n|0,c|0)|0;C=y;yc=qc(A|0,d|0,o|0,0)|0;o=y;xc=qc(D|0,0,q|0,0)|0;Ac=y;Bc=qc(B|0,0,n|0,c|0)|0;B=lc(xc|0,Ac|0,Bc|0,y|0)|0;Bc=lc(B|0,y|0,yc|0,o|0)|0;o=y;yc=qc(A|0,d|0,q|0,0)|0;q=y;B=qc(D|0,0,n|0,c|0)|0;D=lc(yc|0,q|0,B|0,y|0)|0;B=y;q=qc(A|0,d|0,n|0,c|0)|0;c=y;n=lc(R|0,Q|0,1048576,0)|0;d=nc(n|0,y|0,21)|0;n=y;A=lc(F|0,S|0,T|0,U|0)|0;U=lc(A|0,y|0,E&2097151|0,0)|0;E=lc(U|0,y|0,d|0,n|0)|0;U=y;A=oc(d|0,n|0,21)|0;n=kc(R|0,Q|0,A|0,y|0)|0;A=y;Q=lc(W|0,I|0,1048576,0)|0;R=nc(Q|0,y|0,21)|0;Q=y;d=lc(X|0,$|0,aa|0,ba|0)|0;ba=lc(d|0,y|0,_|0,Y|0)|0;Y=lc(ba|0,y|0,Z|0,V|0)|0;V=lc(Y|0,y|0,G&2097151|0,0)|0;G=lc(V|0,y|0,R|0,Q|0)|0;V=y;Y=oc(R|0,Q|0,21)|0;Q=y;R=lc(da|0,J|0,1048576,0)|0;Z=jc(R|0,y|0,21)|0;R=y;ba=lc(ia|0,ma|0,na|0,oa|0)|0;oa=lc(ba|0,y|0,la|0,ja|0)|0;ja=lc(oa|0,y|0,ka|0,ga|0)|0;ga=lc(ja|0,y|0,ha|0,ea|0)|0;ea=lc(ga|0,y|0,fa|0,ca|0)|0;ca=lc(ea|0,y|0,L&2097151|0,0)|0;L=lc(ca|0,y|0,Z|0,R|0)|0;ca=y;ea=oc(Z|0,R|0,21)|0;R=y;Z=lc(qa|0,H|0,1048576,0)|0;fa=jc(Z|0,y|0,21)|0;Z=y;ga=lc(za|0,Da|0,Ea|0,Fa|0)|0;Fa=lc(ga|0,y|0,Ca|0,Aa|0)|0;Aa=lc(Fa|0,y|0,Ba|0,xa|0)|0;xa=lc(Aa|0,y|0,ya|0,va|0)|0;va=lc(xa|0,y|0,wa|0,ta|0)|0;ta=lc(va|0,y|0,ua|0,ra|0)|0;ra=lc(ta|0,y|0,sa|0,pa|0)|0;pa=lc(ra|0,y|0,M&2097151|0,0)|0;M=lc(pa|0,y|0,fa|0,Z|0)|0;pa=y;ra=oc(fa|0,Z|0,21)|0;Z=y;fa=lc(Ha|0,N|0,1048576,0)|0;sa=jc(fa|0,y|0,21)|0;fa=y;ta=lc(Ua|0,Ya|0,Za|0,_a|0)|0;_a=lc(ta|0,y|0,Xa|0,Va|0)|0;Va=lc(_a|0,y|0,Wa|0,Sa|0)|0;Sa=lc(Va|0,y|0,Ta|0,Qa|0)|0;Qa=lc(Sa|0,y|0,Ra|0,Oa|0)|0;Oa=lc(Qa|0,y|0,Pa|0,Ma|0)|0;Ma=lc(Oa|0,y|0,Na|0,Ka|0)|0;Ka=lc(Ma|0,y|0,La|0,Ia|0)|0;Ia=lc(Ka|0,y|0,Ja|0,Ga|0)|0;Ga=lc(Ia|0,y|0,K&2097151|0,0)|0;K=lc(Ga|0,y|0,sa|0,fa|0)|0;Ga=y;Ia=oc(sa|0,fa|0,21)|0;fa=y;sa=lc(ab|0,e|0,1048576,0)|0;Ja=jc(sa|0,y|0,21)|0;sa=y;Ka=lc(sb|0,rb|0,vb|0,t|0)|0;t=lc(Ka|0,y|0,pb|0,ub|0)|0;ub=lc(t|0,y|0,nb|0,tb|0)|0;tb=lc(ub|0,y|0,lb|0,qb|0)|0;qb=lc(tb|0,y|0,jb|0,ob|0)|0;ob=lc(qb|0,y|0,hb|0,mb|0)|0;mb=lc(ob|0,y|0,fb|0,kb|0)|0;kb=lc(mb|0,y|0,db|0,ib|0)|0;ib=lc(kb|0,y|0,bb|0,gb|0)|0;gb=lc(ib|0,y|0,cb|0,h|0)|0;h=lc(gb|0,y|0,$a|0,eb|0)|0;eb=lc(h|0,y|0,O|0,P|0)|0;P=lc(eb|0,y|0,Ja|0,sa|0)|0;eb=y;O=oc(Ja|0,sa|0,21)|0;sa=y;Ja=lc(yb|0,g|0,1048576,0)|0;h=jc(Ja|0,y|0,21)|0;Ja=y;$a=lc(Rb|0,Nb|0,s|0,u|0)|0;u=lc($a|0,y|0,Ob|0,Lb|0)|0;Lb=lc(u|0,y|0,Mb|0,Jb|0)|0;Jb=lc(Lb|0,y|0,Kb|0,Hb|0)|0;Hb=lc(Jb|0,y|0,Ib|0,Db|0)|0;Db=lc(Hb|0,y|0,Gb|0,Bb|0)|0;Bb=lc(Db|0,y|0,Cb|0,zb|0)|0;zb=lc(Bb|0,y|0,Ab|0,xb|0)|0;xb=lc(zb|0,y|0,wb|0,i|0)|0;i=lc(xb|0,y|0,h|0,Ja|0)|0;xb=y;wb=oc(h|0,Ja|0,21)|0;Ja=y;h=lc(Sb|0,j|0,1048576,0)|0;zb=jc(h|0,y|0,21)|0;h=y;Ab=lc(dc|0,$b|0,v|0,r|0)|0;r=lc(Ab|0,y|0,ac|0,Zb|0)|0;Zb=lc(r|0,y|0,_b|0,Xb|0)|0;Xb=lc(Zb|0,y|0,Yb|0,Vb|0)|0;Vb=lc(Xb|0,y|0,Wb|0,Tb|0)|0;Tb=lc(Vb|0,y|0,Ub|0,Pb|0)|0;Pb=lc(Tb|0,y|0,Qb|0,f|0)|0;f=lc(Pb|0,y|0,zb|0,h|0)|0;Pb=y;Qb=oc(zb|0,h|0,21)|0;h=y;zb=lc(ec|0,l|0,1048576,0)|0;Tb=jc(zb|0,y|0,21)|0;zb=y;Ub=lc(tc|0,mc|0,x|0,z|0)|0;z=lc(Ub|0,y|0,pc|0,hc|0)|0;hc=lc(z|0,y|0,ic|0,fc|0)|0;fc=lc(hc|0,y|0,gc|0,bc|0)|0;bc=lc(fc|0,y|0,cc|0,m|0)|0;m=lc(bc|0,y|0,Tb|0,zb|0)|0;bc=y;cc=oc(Tb|0,zb|0,21)|0;zb=y;Tb=lc(uc|0,k|0,1048576,0)|0;fc=jc(Tb|0,y|0,21)|0;Tb=y;gc=lc(zc|0,vc|0,w|0,C|0)|0;C=lc(gc|0,y|0,wc|0,rc|0)|0;rc=lc(C|0,y|0,sc|0,p|0)|0;p=lc(rc|0,y|0,fc|0,Tb|0)|0;rc=y;sc=oc(fc|0,Tb|0,21)|0;Tb=kc(uc|0,k|0,sc|0,y|0)|0;sc=y;k=lc(Bc|0,o|0,1048576,0)|0;uc=nc(k|0,y|0,21)|0;k=y;fc=lc(D|0,B|0,uc|0,k|0)|0;B=y;D=oc(uc|0,k|0,21)|0;k=kc(Bc|0,o|0,D|0,y|0)|0;D=y;o=lc(q|0,c|0,1048576,0)|0;Bc=nc(o|0,y|0,21)|0;o=y;uc=oc(Bc|0,o|0,21)|0;C=kc(q|0,c|0,uc|0,y|0)|0;uc=y;c=lc(E|0,U|0,1048576,0)|0;q=nc(c|0,y|0,21)|0;c=y;wc=oc(q|0,c|0,21)|0;gc=kc(E|0,U|0,wc|0,y|0)|0;wc=y;U=lc(G|0,V|0,1048576,0)|0;E=jc(U|0,y|0,21)|0;U=y;w=oc(E|0,U|0,21)|0;vc=kc(G|0,V|0,w|0,y|0)|0;w=y;V=lc(L|0,ca|0,1048576,0)|0;G=jc(V|0,y|0,21)|0;V=y;zc=oc(G|0,V|0,21)|0;hc=y;ic=lc(M|0,pa|0,1048576,0)|0;z=jc(ic|0,y|0,21)|0;ic=y;pc=oc(z|0,ic|0,21)|0;Ub=y;x=lc(K|0,Ga|0,1048576,0)|0;mc=jc(x|0,y|0,21)|0;x=y;tc=oc(mc|0,x|0,21)|0;Vb=y;Wb=lc(P|0,eb|0,1048576,0)|0;Xb=jc(Wb|0,y|0,21)|0;Wb=y;Yb=oc(Xb|0,Wb|0,21)|0;Zb=y;_b=lc(i|0,xb|0,1048576,0)|0;r=jc(_b|0,y|0,21)|0;_b=y;ac=oc(r|0,_b|0,21)|0;Ab=y;v=lc(f|0,Pb|0,1048576,0)|0;$b=jc(v|0,y|0,21)|0;v=y;dc=oc($b|0,v|0,21)|0;Bb=y;Cb=lc(m|0,bc|0,1048576,0)|0;Db=jc(Cb|0,y|0,21)|0;Cb=y;Gb=lc(Db|0,Cb|0,Tb|0,sc|0)|0;sc=y;Tb=oc(Db|0,Cb|0,21)|0;Cb=kc(m|0,bc|0,Tb|0,y|0)|0;Tb=y;bc=lc(p|0,rc|0,1048576,0)|0;m=jc(bc|0,y|0,21)|0;bc=y;Db=lc(m|0,bc|0,k|0,D|0)|0;D=y;k=oc(m|0,bc|0,21)|0;bc=kc(p|0,rc|0,k|0,y|0)|0;k=y;rc=lc(fc|0,B|0,1048576,0)|0;p=nc(rc|0,y|0,21)|0;rc=y;m=lc(p|0,rc|0,C|0,uc|0)|0;uc=y;C=oc(p|0,rc|0,21)|0;rc=kc(fc|0,B|0,C|0,y|0)|0;C=y;B=qc(Bc|0,o|0,666643,0)|0;fc=y;p=qc(Bc|0,o|0,470296,0)|0;Hb=y;Ib=qc(Bc|0,o|0,654183,0)|0;Jb=y;Kb=qc(Bc|0,o|0,-997805,-1)|0;Lb=y;Mb=qc(Bc|0,o|0,136657,0)|0;u=y;Ob=qc(Bc|0,o|0,-683901,-1)|0;o=lc(ec|0,l|0,Ob|0,y|0)|0;Ob=kc(o|0,y|0,cc|0,zb|0)|0;zb=lc(Ob|0,y|0,$b|0,v|0)|0;v=y;$b=qc(m|0,uc|0,666643,0)|0;Ob=y;cc=qc(m|0,uc|0,470296,0)|0;o=y;l=qc(m|0,uc|0,654183,0)|0;ec=y;Bc=qc(m|0,uc|0,-997805,-1)|0;$a=y;s=qc(m|0,uc|0,136657,0)|0;Nb=y;Rb=qc(m|0,uc|0,-683901,-1)|0;uc=y;m=qc(rc|0,C|0,666643,0)|0;gb=y;cb=qc(rc|0,C|0,470296,0)|0;ib=y;bb=qc(rc|0,C|0,654183,0)|0;kb=y;db=qc(rc|0,C|0,-997805,-1)|0;mb=y;fb=qc(rc|0,C|0,136657,0)|0;ob=y;hb=qc(rc|0,C|0,-683901,-1)|0;C=y;rc=lc(Sb|0,j|0,Kb|0,Lb|0)|0;Lb=lc(rc|0,y|0,s|0,Nb|0)|0;Nb=lc(Lb|0,y|0,hb|0,C|0)|0;C=kc(Nb|0,y|0,Qb|0,h|0)|0;h=lc(C|0,y|0,r|0,_b|0)|0;_b=y;r=qc(Db|0,D|0,666643,0)|0;C=y;Qb=qc(Db|0,D|0,470296,0)|0;Nb=y;hb=qc(Db|0,D|0,654183,0)|0;Lb=y;s=qc(Db|0,D|0,-997805,-1)|0;rc=y;Kb=qc(Db|0,D|0,136657,0)|0;j=y;Sb=qc(Db|0,D|0,-683901,-1)|0;D=y;Db=qc(bc|0,k|0,666643,0)|0;qb=y;jb=qc(bc|0,k|0,470296,0)|0;tb=y;lb=qc(bc|0,k|0,654183,0)|0;ub=y;nb=qc(bc|0,k|0,-997805,-1)|0;t=y;pb=qc(bc|0,k|0,136657,0)|0;Ka=y;vb=qc(bc|0,k|0,-683901,-1)|0;k=y;bc=lc(l|0,ec|0,p|0,Hb|0)|0;Hb=lc(bc|0,y|0,yb|0,g|0)|0;g=lc(Hb|0,y|0,db|0,mb|0)|0;mb=lc(g|0,y|0,Kb|0,j|0)|0;j=lc(mb|0,y|0,vb|0,k|0)|0;k=kc(j|0,y|0,wb|0,Ja|0)|0;Ja=lc(k|0,y|0,Xb|0,Wb|0)|0;Wb=y;Xb=qc(Gb|0,sc|0,666643,0)|0;k=lc(qa|0,H|0,Xb|0,y|0)|0;Xb=lc(k|0,y|0,G|0,V|0)|0;V=kc(Xb|0,y|0,ra|0,Z|0)|0;Z=y;ra=qc(Gb|0,sc|0,470296,0)|0;Xb=y;G=qc(Gb|0,sc|0,654183,0)|0;k=y;H=lc(jb|0,tb|0,r|0,C|0)|0;C=lc(H|0,y|0,G|0,k|0)|0;k=lc(C|0,y|0,z|0,ic|0)|0;ic=lc(k|0,y|0,Ha|0,N|0)|0;N=kc(ic|0,y|0,Ia|0,fa|0)|0;fa=y;Ia=qc(Gb|0,sc|0,-997805,-1)|0;ic=y;Ha=qc(Gb|0,sc|0,136657,0)|0;k=y;z=lc(cb|0,ib|0,$b|0,Ob|0)|0;Ob=lc(z|0,y|0,hb|0,Lb|0)|0;Lb=lc(Ob|0,y|0,nb|0,t|0)|0;t=lc(Lb|0,y|0,Ha|0,k|0)|0;k=lc(t|0,y|0,mc|0,x|0)|0;x=lc(k|0,y|0,ab|0,e|0)|0;e=kc(x|0,y|0,O|0,sa|0)|0;sa=y;O=qc(Gb|0,sc|0,-683901,-1)|0;sc=y;Gb=lc(V|0,Z|0,1048576,0)|0;x=jc(Gb|0,y|0,21)|0;Gb=y;ab=lc(ra|0,Xb|0,Db|0,qb|0)|0;qb=lc(ab|0,y|0,M|0,pa|0)|0;pa=lc(qb|0,y|0,x|0,Gb|0)|0;qb=kc(pa|0,y|0,pc|0,Ub|0)|0;Ub=y;pc=oc(x|0,Gb|0,21)|0;Gb=y;x=lc(N|0,fa|0,1048576,0)|0;pa=jc(x|0,y|0,21)|0;x=y;M=lc(Qb|0,Nb|0,m|0,gb|0)|0;gb=lc(M|0,y|0,lb|0,ub|0)|0;ub=lc(gb|0,y|0,Ia|0,ic|0)|0;ic=lc(ub|0,y|0,K|0,Ga|0)|0;Ga=kc(ic|0,y|0,tc|0,Vb|0)|0;Vb=lc(Ga|0,y|0,pa|0,x|0)|0;Ga=y;tc=oc(pa|0,x|0,21)|0;x=y;pa=lc(e|0,sa|0,1048576,0)|0;ic=jc(pa|0,y|0,21)|0;pa=y;K=lc(cc|0,o|0,B|0,fc|0)|0;fc=lc(K|0,y|0,bb|0,kb|0)|0;kb=lc(fc|0,y|0,s|0,rc|0)|0;rc=lc(kb|0,y|0,pb|0,Ka|0)|0;Ka=lc(rc|0,y|0,O|0,sc|0)|0;sc=lc(Ka|0,y|0,P|0,eb|0)|0;eb=kc(sc|0,y|0,Yb|0,Zb|0)|0;Zb=lc(eb|0,y|0,ic|0,pa|0)|0;eb=y;Yb=oc(ic|0,pa|0,21)|0;pa=y;ic=lc(Ja|0,Wb|0,1048576,0)|0;sc=jc(ic|0,y|0,21)|0;ic=y;P=lc(Bc|0,$a|0,Ib|0,Jb|0)|0;Jb=lc(P|0,y|0,fb|0,ob|0)|0;ob=lc(Jb|0,y|0,Sb|0,D|0)|0;D=lc(ob|0,y|0,i|0,xb|0)|0;xb=kc(D|0,y|0,ac|0,Ab|0)|0;Ab=lc(xb|0,y|0,sc|0,ic|0)|0;xb=y;ac=oc(sc|0,ic|0,21)|0;ic=kc(Ja|0,Wb|0,ac|0,y|0)|0;ac=y;Wb=lc(h|0,_b|0,1048576,0)|0;Ja=jc(Wb|0,y|0,21)|0;Wb=y;sc=lc(Rb|0,uc|0,Mb|0,u|0)|0;u=lc(sc|0,y|0,f|0,Pb|0)|0;Pb=kc(u|0,y|0,dc|0,Bb|0)|0;Bb=lc(Pb|0,y|0,Ja|0,Wb|0)|0;Pb=y;dc=oc(Ja|0,Wb|0,21)|0;Wb=kc(h|0,_b|0,dc|0,y|0)|0;dc=y;_b=lc(zb|0,v|0,1048576,0)|0;h=jc(_b|0,y|0,21)|0;_b=y;Ja=lc(h|0,_b|0,Cb|0,Tb|0)|0;Tb=y;Cb=oc(h|0,_b|0,21)|0;_b=kc(zb|0,v|0,Cb|0,y|0)|0;Cb=y;v=lc(qb|0,Ub|0,1048576,0)|0;zb=jc(v|0,y|0,21)|0;v=y;h=oc(zb|0,v|0,21)|0;u=y;f=lc(Vb|0,Ga|0,1048576,0)|0;sc=jc(f|0,y|0,21)|0;f=y;Mb=oc(sc|0,f|0,21)|0;uc=y;Rb=lc(Zb|0,eb|0,1048576,0)|0;D=jc(Rb|0,y|0,21)|0;Rb=y;i=lc(D|0,Rb|0,ic|0,ac|0)|0;ac=y;ic=oc(D|0,Rb|0,21)|0;Rb=kc(Zb|0,eb|0,ic|0,y|0)|0;ic=y;eb=lc(Ab|0,xb|0,1048576,0)|0;Zb=jc(eb|0,y|0,21)|0;eb=y;D=lc(Zb|0,eb|0,Wb|0,dc|0)|0;dc=y;Wb=oc(Zb|0,eb|0,21)|0;eb=kc(Ab|0,xb|0,Wb|0,y|0)|0;Wb=y;xb=lc(Bb|0,Pb|0,1048576,0)|0;Ab=jc(xb|0,y|0,21)|0;xb=y;Zb=lc(Ab|0,xb|0,_b|0,Cb|0)|0;Cb=y;_b=oc(Ab|0,xb|0,21)|0;xb=kc(Bb|0,Pb|0,_b|0,y|0)|0;_b=y;Pb=qc(Ja|0,Tb|0,666643,0)|0;Bb=y;Ab=qc(Ja|0,Tb|0,470296,0)|0;ob=y;Sb=qc(Ja|0,Tb|0,654183,0)|0;Jb=y;fb=qc(Ja|0,Tb|0,-997805,-1)|0;P=y;Ib=qc(Ja|0,Tb|0,136657,0)|0;$a=y;Bc=qc(Ja|0,Tb|0,-683901,-1)|0;Tb=lc(sc|0,f|0,Bc|0,y|0)|0;Bc=lc(Tb|0,y|0,e|0,sa|0)|0;sa=kc(Bc|0,y|0,Yb|0,pa|0)|0;pa=y;Yb=qc(Zb|0,Cb|0,666643,0)|0;Bc=y;e=qc(Zb|0,Cb|0,470296,0)|0;Tb=y;f=qc(Zb|0,Cb|0,654183,0)|0;sc=y;Ja=qc(Zb|0,Cb|0,-997805,-1)|0;Ka=y;O=qc(Zb|0,Cb|0,136657,0)|0;rc=y;pb=qc(Zb|0,Cb|0,-683901,-1)|0;Cb=y;Zb=qc(xb|0,_b|0,666643,0)|0;kb=lc(vc|0,w|0,Zb|0,y|0)|0;Zb=y;w=qc(xb|0,_b|0,470296,0)|0;vc=y;s=qc(xb|0,_b|0,654183,0)|0;fc=y;bb=qc(xb|0,_b|0,-997805,-1)|0;K=y;B=qc(xb|0,_b|0,136657,0)|0;o=y;cc=qc(xb|0,_b|0,-683901,-1)|0;_b=y;xb=lc(O|0,rc|0,fb|0,P|0)|0;P=lc(xb|0,y|0,cc|0,_b|0)|0;_b=lc(P|0,y|0,zb|0,v|0)|0;v=lc(_b|0,y|0,N|0,fa|0)|0;fa=kc(v|0,y|0,tc|0,x|0)|0;x=y;tc=qc(D|0,dc|0,666643,0)|0;v=y;N=qc(D|0,dc|0,470296,0)|0;_b=lc(kb|0,Zb|0,N|0,y|0)|0;N=y;Zb=qc(D|0,dc|0,654183,0)|0;kb=y;zb=qc(D|0,dc|0,-997805,-1)|0;P=y;cc=qc(D|0,dc|0,136657,0)|0;xb=y;fb=qc(D|0,dc|0,-683901,-1)|0;dc=y;D=qc(eb|0,Wb|0,666643,0)|0;rc=y;O=qc(eb|0,Wb|0,470296,0)|0;ub=y;Ia=qc(eb|0,Wb|0,654183,0)|0;gb=y;lb=qc(eb|0,Wb|0,-997805,-1)|0;M=y;m=qc(eb|0,Wb|0,136657,0)|0;Nb=y;Qb=qc(eb|0,Wb|0,-683901,-1)|0;Wb=y;eb=lc(f|0,sc|0,Ab|0,ob|0)|0;ob=lc(eb|0,y|0,bb|0,K|0)|0;K=lc(ob|0,y|0,V|0,Z|0)|0;Z=kc(K|0,y|0,pc|0,Gb|0)|0;Gb=lc(Z|0,y|0,cc|0,xb|0)|0;xb=lc(Gb|0,y|0,Qb|0,Wb|0)|0;Wb=y;Qb=qc(i|0,ac|0,666643,0)|0;Gb=lc(Qb|0,y|0,n|0,A|0)|0;A=y;n=qc(i|0,ac|0,470296,0)|0;Qb=y;cc=qc(i|0,ac|0,654183,0)|0;Z=y;pc=lc(W|0,I|0,q|0,c|0)|0;c=kc(pc|0,y|0,Y|0,Q|0)|0;Q=lc(c|0,y|0,tc|0,v|0)|0;v=lc(Q|0,y|0,cc|0,Z|0)|0;Z=lc(v|0,y|0,O|0,ub|0)|0;ub=y;O=qc(i|0,ac|0,-997805,-1)|0;v=y;cc=qc(i|0,ac|0,136657,0)|0;Q=y;tc=lc(E|0,U|0,da|0,J|0)|0;J=kc(tc|0,y|0,ea|0,R|0)|0;R=lc(J|0,y|0,Yb|0,Bc|0)|0;Bc=lc(R|0,y|0,w|0,vc|0)|0;vc=lc(Bc|0,y|0,Zb|0,kb|0)|0;kb=lc(vc|0,y|0,cc|0,Q|0)|0;Q=lc(kb|0,y|0,lb|0,M|0)|0;M=y;lb=qc(i|0,ac|0,-683901,-1)|0;ac=y;i=lc(Gb|0,A|0,1048576,0)|0;kb=jc(i|0,y|0,21)|0;i=y;cc=lc(gc|0,wc|0,n|0,Qb|0)|0;Qb=lc(cc|0,y|0,D|0,rc|0)|0;rc=lc(Qb|0,y|0,kb|0,i|0)|0;Qb=y;D=oc(kb|0,i|0,21)|0;i=kc(Gb|0,A|0,D|0,y|0)|0;D=y;A=lc(Z|0,ub|0,1048576,0)|0;Gb=jc(A|0,y|0,21)|0;A=y;kb=lc(_b|0,N|0,O|0,v|0)|0;v=lc(kb|0,y|0,Ia|0,gb|0)|0;gb=lc(v|0,y|0,Gb|0,A|0)|0;v=y;Ia=oc(Gb|0,A|0,21)|0;A=y;Gb=lc(Q|0,M|0,1048576,0)|0;kb=jc(Gb|0,y|0,21)|0;Gb=y;O=lc(L|0,ca|0,Pb|0,Bb|0)|0;Bb=kc(O|0,y|0,zc|0,hc|0)|0;hc=lc(Bb|0,y|0,e|0,Tb|0)|0;Tb=lc(hc|0,y|0,s|0,fc|0)|0;fc=lc(Tb|0,y|0,zb|0,P|0)|0;P=lc(fc|0,y|0,lb|0,ac|0)|0;ac=lc(P|0,y|0,m|0,Nb|0)|0;Nb=lc(ac|0,y|0,kb|0,Gb|0)|0;ac=y;m=oc(kb|0,Gb|0,21)|0;Gb=y;kb=lc(xb|0,Wb|0,1048576,0)|0;P=jc(kb|0,y|0,21)|0;kb=y;lb=lc(Ja|0,Ka|0,Sb|0,Jb|0)|0;Jb=lc(lb|0,y|0,B|0,o|0)|0;o=lc(Jb|0,y|0,qb|0,Ub|0)|0;Ub=kc(o|0,y|0,h|0,u|0)|0;u=lc(Ub|0,y|0,fb|0,dc|0)|0;dc=lc(u|0,y|0,P|0,kb|0)|0;u=y;fb=oc(P|0,kb|0,21)|0;kb=kc(xb|0,Wb|0,fb|0,y|0)|0;fb=y;Wb=lc(fa|0,x|0,1048576,0)|0;xb=jc(Wb|0,y|0,21)|0;Wb=y;P=lc(pb|0,Cb|0,Ib|0,$a|0)|0;$a=lc(P|0,y|0,Vb|0,Ga|0)|0;Ga=kc($a|0,y|0,Mb|0,uc|0)|0;uc=lc(Ga|0,y|0,xb|0,Wb|0)|0;Ga=y;Mb=oc(xb|0,Wb|0,21)|0;Wb=kc(fa|0,x|0,Mb|0,y|0)|0;Mb=y;x=lc(sa|0,pa|0,1048576,0)|0;fa=jc(x|0,y|0,21)|0;x=y;xb=lc(Rb|0,ic|0,fa|0,x|0)|0;ic=y;Rb=oc(fa|0,x|0,21)|0;x=y;fa=lc(rc|0,Qb|0,1048576,0)|0;$a=jc(fa|0,y|0,21)|0;fa=y;Vb=oc($a|0,fa|0,21)|0;P=y;Ib=lc(gb|0,v|0,1048576,0)|0;Cb=jc(Ib|0,y|0,21)|0;Ib=y;pb=oc(Cb|0,Ib|0,21)|0;Ub=y;h=lc(Nb|0,ac|0,1048576,0)|0;o=jc(h|0,y|0,21)|0;h=y;qb=lc(kb|0,fb|0,o|0,h|0)|0;fb=y;kb=oc(o|0,h|0,21)|0;h=y;o=lc(dc|0,u|0,1048576,0)|0;Jb=jc(o|0,y|0,21)|0;o=y;B=lc(Wb|0,Mb|0,Jb|0,o|0)|0;Mb=y;Wb=oc(Jb|0,o|0,21)|0;o=kc(dc|0,u|0,Wb|0,y|0)|0;Wb=y;u=lc(uc|0,Ga|0,1048576,0)|0;dc=jc(u|0,y|0,21)|0;u=y;Jb=oc(dc|0,u|0,21)|0;lb=kc(uc|0,Ga|0,Jb|0,y|0)|0;Jb=y;Ga=lc(xb|0,ic|0,1048576,0)|0;uc=jc(Ga|0,y|0,21)|0;Ga=y;Sb=oc(uc|0,Ga|0,21)|0;Ka=kc(xb|0,ic|0,Sb|0,y|0)|0;Sb=y;ic=qc(uc|0,Ga|0,666643,0)|0;xb=lc(i|0,D|0,ic|0,y|0)|0;ic=y;D=qc(uc|0,Ga|0,470296,0)|0;i=y;Ja=qc(uc|0,Ga|0,654183,0)|0;fc=y;zb=qc(uc|0,Ga|0,-997805,-1)|0;Tb=y;s=qc(uc|0,Ga|0,136657,0)|0;hc=y;e=qc(uc|0,Ga|0,-683901,-1)|0;Ga=y;uc=jc(xb|0,ic|0,21)|0;Bb=y;zc=lc(D|0,i|0,rc|0,Qb|0)|0;Qb=kc(zc|0,y|0,Vb|0,P|0)|0;P=lc(Qb|0,y|0,uc|0,Bb|0)|0;Qb=y;Vb=oc(uc|0,Bb|0,21)|0;Bb=kc(xb|0,ic|0,Vb|0,y|0)|0;Vb=y;ic=jc(P|0,Qb|0,21)|0;xb=y;uc=lc(Ja|0,fc|0,Z|0,ub|0)|0;ub=kc(uc|0,y|0,Ia|0,A|0)|0;A=lc(ub|0,y|0,$a|0,fa|0)|0;fa=lc(A|0,y|0,ic|0,xb|0)|0;A=y;$a=oc(ic|0,xb|0,21)|0;xb=kc(P|0,Qb|0,$a|0,y|0)|0;$a=y;Qb=jc(fa|0,A|0,21)|0;P=y;ic=lc(gb|0,v|0,zb|0,Tb|0)|0;Tb=kc(ic|0,y|0,pb|0,Ub|0)|0;Ub=lc(Tb|0,y|0,Qb|0,P|0)|0;Tb=y;pb=oc(Qb|0,P|0,21)|0;P=kc(fa|0,A|0,pb|0,y|0)|0;pb=y;A=jc(Ub|0,Tb|0,21)|0;fa=y;Qb=lc(s|0,hc|0,Q|0,M|0)|0;M=kc(Qb|0,y|0,m|0,Gb|0)|0;Gb=lc(M|0,y|0,Cb|0,Ib|0)|0;Ib=lc(Gb|0,y|0,A|0,fa|0)|0;Gb=y;Cb=oc(A|0,fa|0,21)|0;fa=kc(Ub|0,Tb|0,Cb|0,y|0)|0;Cb=y;Tb=jc(Ib|0,Gb|0,21)|0;Ub=y;A=lc(Nb|0,ac|0,e|0,Ga|0)|0;Ga=kc(A|0,y|0,kb|0,h|0)|0;h=lc(Ga|0,y|0,Tb|0,Ub|0)|0;Ga=y;kb=oc(Tb|0,Ub|0,21)|0;Ub=kc(Ib|0,Gb|0,kb|0,y|0)|0;kb=y;Gb=jc(h|0,Ga|0,21)|0;Ib=y;Tb=lc(qb|0,fb|0,Gb|0,Ib|0)|0;fb=y;qb=oc(Gb|0,Ib|0,21)|0;Ib=kc(h|0,Ga|0,qb|0,y|0)|0;qb=y;Ga=jc(Tb|0,fb|0,21)|0;h=y;Gb=lc(Ga|0,h|0,o|0,Wb|0)|0;Wb=y;o=oc(Ga|0,h|0,21)|0;h=kc(Tb|0,fb|0,o|0,y|0)|0;o=y;fb=jc(Gb|0,Wb|0,21)|0;Tb=y;Ga=lc(B|0,Mb|0,fb|0,Tb|0)|0;Mb=y;B=oc(fb|0,Tb|0,21)|0;Tb=kc(Gb|0,Wb|0,B|0,y|0)|0;B=y;Wb=jc(Ga|0,Mb|0,21)|0;Gb=y;fb=lc(Wb|0,Gb|0,lb|0,Jb|0)|0;Jb=y;lb=oc(Wb|0,Gb|0,21)|0;Gb=kc(Ga|0,Mb|0,lb|0,y|0)|0;lb=y;Mb=jc(fb|0,Jb|0,21)|0;Ga=y;Wb=lc(sa|0,pa|0,dc|0,u|0)|0;u=kc(Wb|0,y|0,Rb|0,x|0)|0;x=lc(u|0,y|0,Mb|0,Ga|0)|0;u=y;Rb=oc(Mb|0,Ga|0,21)|0;Ga=kc(fb|0,Jb|0,Rb|0,y|0)|0;Rb=y;Jb=jc(x|0,u|0,21)|0;fb=y;Mb=lc(Jb|0,fb|0,Ka|0,Sb|0)|0;Sb=y;Ka=oc(Jb|0,fb|0,21)|0;fb=kc(x|0,u|0,Ka|0,y|0)|0;Ka=y;u=jc(Mb|0,Sb|0,21)|0;x=y;Jb=oc(u|0,x|0,21)|0;Wb=kc(Mb|0,Sb|0,Jb|0,y|0)|0;Jb=y;Sb=qc(u|0,x|0,666643,0)|0;Mb=lc(Sb|0,y|0,Bb|0,Vb|0)|0;Vb=y;Bb=qc(u|0,x|0,470296,0)|0;Sb=lc(xb|0,$a|0,Bb|0,y|0)|0;Bb=y;$a=qc(u|0,x|0,654183,0)|0;xb=lc(P|0,pb|0,$a|0,y|0)|0;$a=y;pb=qc(u|0,x|0,-997805,-1)|0;P=lc(fa|0,Cb|0,pb|0,y|0)|0;pb=y;Cb=qc(u|0,x|0,136657,0)|0;fa=lc(Ub|0,kb|0,Cb|0,y|0)|0;Cb=y;kb=qc(u|0,x|0,-683901,-1)|0;x=lc(Ib|0,qb|0,kb|0,y|0)|0;kb=y;qb=jc(Mb|0,Vb|0,21)|0;Ib=y;u=lc(Sb|0,Bb|0,qb|0,Ib|0)|0;Bb=y;Sb=oc(qb|0,Ib|0,21)|0;Ib=kc(Mb|0,Vb|0,Sb|0,y|0)|0;Sb=y;Vb=jc(u|0,Bb|0,21)|0;Mb=y;qb=lc(xb|0,$a|0,Vb|0,Mb|0)|0;$a=y;xb=oc(Vb|0,Mb|0,21)|0;Mb=kc(u|0,Bb|0,xb|0,y|0)|0;xb=y;Bb=jc(qb|0,$a|0,21)|0;u=y;Vb=lc(P|0,pb|0,Bb|0,u|0)|0;pb=y;P=oc(Bb|0,u|0,21)|0;u=kc(qb|0,$a|0,P|0,y|0)|0;P=y;$a=jc(Vb|0,pb|0,21)|0;qb=y;Bb=lc(fa|0,Cb|0,$a|0,qb|0)|0;Cb=y;fa=oc($a|0,qb|0,21)|0;qb=kc(Vb|0,pb|0,fa|0,y|0)|0;fa=y;pb=jc(Bb|0,Cb|0,21)|0;Vb=y;$a=lc(x|0,kb|0,pb|0,Vb|0)|0;kb=y;x=oc(pb|0,Vb|0,21)|0;Vb=kc(Bb|0,Cb|0,x|0,y|0)|0;x=y;Cb=jc($a|0,kb|0,21)|0;Bb=y;pb=lc(Cb|0,Bb|0,h|0,o|0)|0;o=y;h=oc(Cb|0,Bb|0,21)|0;Bb=kc($a|0,kb|0,h|0,y|0)|0;h=y;kb=jc(pb|0,o|0,21)|0;$a=y;Cb=lc(kb|0,$a|0,Tb|0,B|0)|0;B=y;Tb=oc(kb|0,$a|0,21)|0;$a=kc(pb|0,o|0,Tb|0,y|0)|0;Tb=y;o=jc(Cb|0,B|0,21)|0;pb=y;kb=lc(o|0,pb|0,Gb|0,lb|0)|0;lb=y;Gb=oc(o|0,pb|0,21)|0;pb=kc(Cb|0,B|0,Gb|0,y|0)|0;Gb=y;B=jc(kb|0,lb|0,21)|0;Cb=y;o=lc(B|0,Cb|0,Ga|0,Rb|0)|0;Rb=y;Ga=oc(B|0,Cb|0,21)|0;Cb=kc(kb|0,lb|0,Ga|0,y|0)|0;Ga=y;lb=jc(o|0,Rb|0,21)|0;kb=y;B=lc(lb|0,kb|0,fb|0,Ka|0)|0;Ka=y;fb=oc(lb|0,kb|0,21)|0;kb=kc(o|0,Rb|0,fb|0,y|0)|0;fb=y;Rb=jc(B|0,Ka|0,21)|0;o=y;lb=lc(Rb|0,o|0,Wb|0,Jb|0)|0;Jb=y;Wb=oc(Rb|0,o|0,21)|0;o=kc(B|0,Ka|0,Wb|0,y|0)|0;Wb=y;a[b>>0]=Ib;Ka=nc(Ib|0,Sb|0,8)|0;a[b+1>>0]=Ka;Ka=nc(Ib|0,Sb|0,16)|0;Sb=y;Sb=oc(Mb|0,xb|0,5)|0;a[b+2>>0]=Sb|Ka;Ka=nc(Mb|0,xb|0,3)|0;a[b+3>>0]=Ka;Ka=nc(Mb|0,xb|0,11)|0;a[b+4>>0]=Ka;Ka=nc(Mb|0,xb|0,19)|0;xb=y;xb=oc(u|0,P|0,2)|0;a[b+5>>0]=xb|Ka;Ka=nc(u|0,P|0,6)|0;a[b+6>>0]=Ka;Ka=nc(u|0,P|0,14)|0;P=y;P=oc(qb|0,fa|0,7)|0;a[b+7>>0]=P|Ka;Ka=nc(qb|0,fa|0,1)|0;a[b+8>>0]=Ka;Ka=nc(qb|0,fa|0,9)|0;a[b+9>>0]=Ka;Ka=nc(qb|0,fa|0,17)|0;fa=y;fa=oc(Vb|0,x|0,4)|0;a[b+10>>0]=fa|Ka;Ka=nc(Vb|0,x|0,4)|0;a[b+11>>0]=Ka;Ka=nc(Vb|0,x|0,12)|0;a[b+12>>0]=Ka;Ka=nc(Vb|0,x|0,20)|0;x=y;x=oc(Bb|0,h|0,1)|0;a[b+13>>0]=x|Ka;Ka=nc(Bb|0,h|0,7)|0;a[b+14>>0]=Ka;Ka=nc(Bb|0,h|0,15)|0;h=y;h=oc($a|0,Tb|0,6)|0;a[b+15>>0]=h|Ka;Ka=nc($a|0,Tb|0,2)|0;a[b+16>>0]=Ka;Ka=nc($a|0,Tb|0,10)|0;a[b+17>>0]=Ka;Ka=nc($a|0,Tb|0,18)|0;Tb=y;Tb=oc(pb|0,Gb|0,3)|0;a[b+18>>0]=Tb|Ka;Ka=nc(pb|0,Gb|0,5)|0;a[b+19>>0]=Ka;Ka=nc(pb|0,Gb|0,13)|0;a[b+20>>0]=Ka;a[b+21>>0]=Cb;Ka=nc(Cb|0,Ga|0,8)|0;a[b+22>>0]=Ka;Ka=nc(Cb|0,Ga|0,16)|0;Ga=y;Ga=oc(kb|0,fb|0,5)|0;a[b+23>>0]=Ga|Ka;Ka=nc(kb|0,fb|0,3)|0;a[b+24>>0]=Ka;Ka=nc(kb|0,fb|0,11)|0;a[b+25>>0]=Ka;Ka=nc(kb|0,fb|0,19)|0;fb=y;fb=oc(o|0,Wb|0,2)|0;a[b+26>>0]=fb|Ka;Ka=nc(o|0,Wb|0,6)|0;a[b+27>>0]=Ka;Ka=nc(o|0,Wb|0,14)|0;Wb=y;Wb=oc(lb|0,Jb|0,7)|0;a[b+28>>0]=Ka|Wb;Wb=nc(lb|0,Jb|0,1)|0;a[b+29>>0]=Wb;Wb=nc(lb|0,Jb|0,9)|0;a[b+30>>0]=Wb;Wb=nc(lb|0,Jb|0,17)|0;a[b+31>>0]=Wb;return}function Eb(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=oc(b&255|0,0,8)|0;b=y;e=oc(c&255|0,0,16)|0;y=b|y;return d|a&255|e|0}function Fb(a){a=a|0;var b=0,c=0,e=0,f=0,g=0;b=d[a>>0]|0;c=oc(d[a+1>>0]|0|0,0,8)|0;e=y;f=oc(d[a+2>>0]|0|0,0,16)|0;g=e|y;e=oc(d[a+3>>0]|0|0,0,24)|0;y=g|y;return c|b|f|e|0}function Gb(b){b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0;c=b+1|0;d=b+2|0;e=Hb(a[b>>0]|0,a[c>>0]|0,a[d>>0]|0)|0;f=Ib(d)|0;g=nc(f|0,y|0,5)|0;f=b+5|0;h=b+6|0;i=b+7|0;j=Hb(a[f>>0]|0,a[h>>0]|0,a[i>>0]|0)|0;k=nc(j|0,y|0,2)|0;j=Ib(i)|0;l=nc(j|0,y|0,7)|0;j=b+10|0;m=Ib(j)|0;n=nc(m|0,y|0,4)|0;m=b+13|0;o=b+14|0;p=b+15|0;q=Hb(a[m>>0]|0,a[o>>0]|0,a[p>>0]|0)|0;r=nc(q|0,y|0,1)|0;q=Ib(p)|0;s=nc(q|0,y|0,6)|0;q=b+18|0;t=b+19|0;u=b+20|0;v=Hb(a[q>>0]|0,a[t>>0]|0,a[u>>0]|0)|0;w=nc(v|0,y|0,3)|0;v=b+21|0;x=b+22|0;z=b+23|0;A=Hb(a[v>>0]|0,a[x>>0]|0,a[z>>0]|0)|0;B=Ib(z)|0;C=nc(B|0,y|0,5)|0;B=b+26|0;D=b+27|0;E=b+28|0;F=Hb(a[B>>0]|0,a[D>>0]|0,a[E>>0]|0)|0;G=nc(F|0,y|0,2)|0;F=Ib(E)|0;H=nc(F|0,y|0,7)|0;F=b+31|0;I=Ib(F)|0;J=nc(I|0,y|0,4)|0;I=b+36|0;K=Hb(a[b+34>>0]|0,a[b+35>>0]|0,a[I>>0]|0)|0;L=nc(K|0,y|0,1)|0;K=Ib(I)|0;I=nc(K|0,y|0,6)|0;K=Hb(a[b+39>>0]|0,a[b+40>>0]|0,a[b+41>>0]|0)|0;M=nc(K|0,y|0,3)|0;K=b+44|0;N=Hb(a[b+42>>0]|0,a[b+43>>0]|0,a[K>>0]|0)|0;O=Ib(K)|0;K=nc(O|0,y|0,5)|0;O=b+49|0;P=Hb(a[b+47>>0]|0,a[b+48>>0]|0,a[O>>0]|0)|0;Q=nc(P|0,y|0,2)|0;P=Q&2097151;Q=Ib(O)|0;O=nc(Q|0,y|0,7)|0;Q=O&2097151;O=Ib(b+52|0)|0;R=nc(O|0,y|0,4)|0;O=R&2097151;R=b+57|0;S=Hb(a[b+55>>0]|0,a[b+56>>0]|0,a[R>>0]|0)|0;T=nc(S|0,y|0,1)|0;S=T&2097151;T=Ib(R)|0;R=nc(T|0,y|0,6)|0;T=R&2097151;R=Ib(b+60|0)|0;U=nc(R|0,y|0,3)|0;R=y;V=qc(U|0,R|0,666643,0)|0;W=y;X=qc(U|0,R|0,470296,0)|0;Y=y;Z=qc(U|0,R|0,654183,0)|0;_=y;$=qc(U|0,R|0,-997805,-1)|0;aa=y;ba=qc(U|0,R|0,136657,0)|0;ca=lc(ba|0,y|0,M&2097151|0,0)|0;M=y;ba=qc(U|0,R|0,-683901,-1)|0;R=lc(ba|0,y|0,N&2097151|0,0)|0;N=y;ba=qc(T|0,0,666643,0)|0;U=y;da=qc(T|0,0,470296,0)|0;ea=y;fa=qc(T|0,0,654183,0)|0;ga=y;ha=qc(T|0,0,-997805,-1)|0;ia=y;ja=qc(T|0,0,136657,0)|0;ka=y;la=qc(T|0,0,-683901,-1)|0;T=lc(ca|0,M|0,la|0,y|0)|0;la=y;M=qc(S|0,0,666643,0)|0;ca=y;ma=qc(S|0,0,470296,0)|0;na=y;oa=qc(S|0,0,654183,0)|0;pa=y;qa=qc(S|0,0,-997805,-1)|0;ra=y;sa=qc(S|0,0,136657,0)|0;ta=y;ua=qc(S|0,0,-683901,-1)|0;S=lc(ua|0,y|0,I&2097151|0,0)|0;I=lc(S|0,y|0,$|0,aa|0)|0;aa=lc(I|0,y|0,ja|0,ka|0)|0;ka=y;ja=qc(O|0,0,666643,0)|0;I=y;$=qc(O|0,0,470296,0)|0;S=y;ua=qc(O|0,0,654183,0)|0;va=y;wa=qc(O|0,0,-997805,-1)|0;xa=y;ya=qc(O|0,0,136657,0)|0;za=y;Aa=qc(O|0,0,-683901,-1)|0;O=y;Ba=qc(Q|0,0,666643,0)|0;Ca=y;Da=qc(Q|0,0,470296,0)|0;Ea=y;Fa=qc(Q|0,0,654183,0)|0;Ga=y;Ha=qc(Q|0,0,-997805,-1)|0;Ia=y;Ja=qc(Q|0,0,136657,0)|0;Ka=y;La=qc(Q|0,0,-683901,-1)|0;Q=lc(La|0,y|0,J&2097151|0,0)|0;J=lc(Q|0,y|0,ya|0,za|0)|0;za=lc(J|0,y|0,qa|0,ra|0)|0;ra=lc(za|0,y|0,X|0,Y|0)|0;Y=lc(ra|0,y|0,fa|0,ga|0)|0;ga=y;fa=qc(P|0,0,666643,0)|0;ra=lc(fa|0,y|0,s&2097151|0,0)|0;s=y;fa=qc(P|0,0,470296,0)|0;X=y;za=qc(P|0,0,654183,0)|0;qa=lc(za|0,y|0,A&2097151|0,0)|0;A=lc(qa|0,y|0,Da|0,Ea|0)|0;Ea=lc(A|0,y|0,ja|0,I|0)|0;I=y;ja=qc(P|0,0,-997805,-1)|0;A=y;Da=qc(P|0,0,136657,0)|0;qa=lc(Da|0,y|0,G&2097151|0,0)|0;G=lc(qa|0,y|0,Ha|0,Ia|0)|0;Ia=lc(G|0,y|0,ua|0,va|0)|0;va=lc(Ia|0,y|0,ma|0,na|0)|0;na=lc(va|0,y|0,ba|0,U|0)|0;U=y;ba=qc(P|0,0,-683901,-1)|0;P=y;va=lc(ra|0,s|0,1048576,0)|0;ma=nc(va|0,y|0,21)|0;va=y;Ia=lc(fa|0,X|0,w&2097151|0,0)|0;w=lc(Ia|0,y|0,Ba|0,Ca|0)|0;Ca=lc(w|0,y|0,ma|0,va|0)|0;w=y;Ba=oc(ma|0,va|0,21)|0;va=kc(ra|0,s|0,Ba|0,y|0)|0;Ba=y;s=lc(Ea|0,I|0,1048576,0)|0;ra=nc(s|0,y|0,21)|0;s=y;ma=lc(ja|0,A|0,C&2097151|0,0)|0;C=lc(ma|0,y|0,Fa|0,Ga|0)|0;Ga=lc(C|0,y|0,$|0,S|0)|0;S=lc(Ga|0,y|0,M|0,ca|0)|0;ca=lc(S|0,y|0,ra|0,s|0)|0;S=y;M=oc(ra|0,s|0,21)|0;s=y;ra=lc(na|0,U|0,1048576,0)|0;Ga=jc(ra|0,y|0,21)|0;ra=y;$=lc(ba|0,P|0,H&2097151|0,0)|0;H=lc($|0,y|0,Ja|0,Ka|0)|0;Ka=lc(H|0,y|0,wa|0,xa|0)|0;xa=lc(Ka|0,y|0,oa|0,pa|0)|0;pa=lc(xa|0,y|0,V|0,W|0)|0;W=lc(pa|0,y|0,da|0,ea|0)|0;ea=lc(W|0,y|0,Ga|0,ra|0)|0;W=y;da=oc(Ga|0,ra|0,21)|0;ra=y;Ga=lc(Y|0,ga|0,1048576,0)|0;pa=jc(Ga|0,y|0,21)|0;Ga=y;V=lc(Aa|0,O|0,L&2097151|0,0)|0;L=lc(V|0,y|0,sa|0,ta|0)|0;ta=lc(L|0,y|0,Z|0,_|0)|0;_=lc(ta|0,y|0,ha|0,ia|0)|0;ia=lc(_|0,y|0,pa|0,Ga|0)|0;_=y;ha=oc(pa|0,Ga|0,21)|0;Ga=kc(Y|0,ga|0,ha|0,y|0)|0;ha=y;ga=lc(aa|0,ka|0,1048576,0)|0;Y=jc(ga|0,y|0,21)|0;ga=y;pa=lc(T|0,la|0,Y|0,ga|0)|0;la=y;T=oc(Y|0,ga|0,21)|0;ga=kc(aa|0,ka|0,T|0,y|0)|0;T=y;ka=lc(R|0,N|0,1048576,0)|0;aa=jc(ka|0,y|0,21)|0;ka=y;Y=lc(aa|0,ka|0,K&2097151|0,0)|0;K=y;ta=oc(aa|0,ka|0,21)|0;ka=kc(R|0,N|0,ta|0,y|0)|0;ta=y;N=lc(Ca|0,w|0,1048576,0)|0;R=nc(N|0,y|0,21)|0;N=y;aa=oc(R|0,N|0,21)|0;Z=kc(Ca|0,w|0,aa|0,y|0)|0;aa=y;w=lc(ca|0,S|0,1048576,0)|0;Ca=jc(w|0,y|0,21)|0;w=y;L=oc(Ca|0,w|0,21)|0;sa=y;V=lc(ea|0,W|0,1048576,0)|0;O=jc(V|0,y|0,21)|0;V=y;Aa=lc(O|0,V|0,Ga|0,ha|0)|0;ha=y;Ga=oc(O|0,V|0,21)|0;V=kc(ea|0,W|0,Ga|0,y|0)|0;Ga=y;W=lc(ia|0,_|0,1048576,0)|0;ea=jc(W|0,y|0,21)|0;W=y;O=lc(ea|0,W|0,ga|0,T|0)|0;T=y;ga=oc(ea|0,W|0,21)|0;W=kc(ia|0,_|0,ga|0,y|0)|0;ga=y;_=lc(pa|0,la|0,1048576,0)|0;ia=jc(_|0,y|0,21)|0;_=y;ea=lc(ia|0,_|0,ka|0,ta|0)|0;ta=y;ka=oc(ia|0,_|0,21)|0;_=kc(pa|0,la|0,ka|0,y|0)|0;ka=y;la=qc(Y|0,K|0,666643,0)|0;pa=lc(la|0,y|0,r&2097151|0,0)|0;r=y;la=qc(Y|0,K|0,470296,0)|0;ia=lc(va|0,Ba|0,la|0,y|0)|0;la=y;Ba=qc(Y|0,K|0,654183,0)|0;va=lc(Z|0,aa|0,Ba|0,y|0)|0;Ba=y;aa=qc(Y|0,K|0,-997805,-1)|0;Z=y;xa=qc(Y|0,K|0,136657,0)|0;oa=y;Ka=qc(Y|0,K|0,-683901,-1)|0;K=lc(Ka|0,y|0,na|0,U|0)|0;U=lc(K|0,y|0,Ca|0,w|0)|0;w=kc(U|0,y|0,da|0,ra|0)|0;ra=y;da=qc(ea|0,ta|0,666643,0)|0;U=lc(da|0,y|0,n&2097151|0,0)|0;n=y;da=qc(ea|0,ta|0,470296,0)|0;Ca=lc(pa|0,r|0,da|0,y|0)|0;da=y;r=qc(ea|0,ta|0,654183,0)|0;pa=lc(ia|0,la|0,r|0,y|0)|0;r=y;la=qc(ea|0,ta|0,-997805,-1)|0;ia=lc(va|0,Ba|0,la|0,y|0)|0;la=y;Ba=qc(ea|0,ta|0,136657,0)|0;va=y;K=qc(ea|0,ta|0,-683901,-1)|0;ta=y;ea=qc(_|0,ka|0,666643,0)|0;na=lc(ea|0,y|0,l&2097151|0,0)|0;l=y;ea=qc(_|0,ka|0,470296,0)|0;Ka=lc(U|0,n|0,ea|0,y|0)|0;ea=y;n=qc(_|0,ka|0,654183,0)|0;U=lc(Ca|0,da|0,n|0,y|0)|0;n=y;da=qc(_|0,ka|0,-997805,-1)|0;Ca=lc(pa|0,r|0,da|0,y|0)|0;da=y;r=qc(_|0,ka|0,136657,0)|0;pa=lc(ia|0,la|0,r|0,y|0)|0;r=y;la=qc(_|0,ka|0,-683901,-1)|0;ka=y;_=lc(R|0,N|0,Ea|0,I|0)|0;I=kc(_|0,y|0,M|0,s|0)|0;s=lc(I|0,y|0,aa|0,Z|0)|0;Z=lc(s|0,y|0,Ba|0,va|0)|0;va=lc(Z|0,y|0,la|0,ka|0)|0;ka=y;la=qc(O|0,T|0,666643,0)|0;Z=lc(la|0,y|0,k&2097151|0,0)|0;k=y;la=qc(O|0,T|0,470296,0)|0;Ba=lc(na|0,l|0,la|0,y|0)|0;la=y;l=qc(O|0,T|0,654183,0)|0;na=lc(Ka|0,ea|0,l|0,y|0)|0;l=y;ea=qc(O|0,T|0,-997805,-1)|0;Ka=lc(U|0,n|0,ea|0,y|0)|0;ea=y;n=qc(O|0,T|0,136657,0)|0;U=lc(Ca|0,da|0,n|0,y|0)|0;n=y;da=qc(O|0,T|0,-683901,-1)|0;T=lc(pa|0,r|0,da|0,y|0)|0;da=y;r=qc(W|0,ga|0,666643,0)|0;pa=y;O=qc(W|0,ga|0,470296,0)|0;Ca=y;s=qc(W|0,ga|0,654183,0)|0;aa=y;I=qc(W|0,ga|0,-997805,-1)|0;M=y;_=qc(W|0,ga|0,136657,0)|0;Ea=y;N=qc(W|0,ga|0,-683901,-1)|0;ga=lc(U|0,n|0,N|0,y|0)|0;N=y;n=qc(Aa|0,ha|0,666643,0)|0;U=lc(n|0,y|0,e&2097151|0,0)|0;e=y;n=qc(Aa|0,ha|0,470296,0)|0;W=y;R=qc(Aa|0,ha|0,654183,0)|0;ia=lc(Z|0,k|0,R|0,y|0)|0;R=lc(ia|0,y|0,O|0,Ca|0)|0;Ca=y;O=qc(Aa|0,ha|0,-997805,-1)|0;ia=y;k=qc(Aa|0,ha|0,136657,0)|0;Z=lc(na|0,l|0,k|0,y|0)|0;k=lc(Z|0,y|0,I|0,M|0)|0;M=y;I=qc(Aa|0,ha|0,-683901,-1)|0;ha=y;Aa=lc(U|0,e|0,1048576,0)|0;Z=jc(Aa|0,y|0,21)|0;Aa=y;l=lc(n|0,W|0,g&2097151|0,0)|0;g=lc(l|0,y|0,r|0,pa|0)|0;pa=lc(g|0,y|0,Z|0,Aa|0)|0;g=y;r=oc(Z|0,Aa|0,21)|0;Aa=kc(U|0,e|0,r|0,y|0)|0;r=y;e=lc(R|0,Ca|0,1048576,0)|0;U=jc(e|0,y|0,21)|0;e=y;Z=lc(Ba|0,la|0,O|0,ia|0)|0;ia=lc(Z|0,y|0,s|0,aa|0)|0;aa=lc(ia|0,y|0,U|0,e|0)|0;ia=y;s=oc(U|0,e|0,21)|0;e=y;U=lc(k|0,M|0,1048576,0)|0;Z=jc(U|0,y|0,21)|0;U=y;O=lc(Ka|0,ea|0,I|0,ha|0)|0;ha=lc(O|0,y|0,_|0,Ea|0)|0;Ea=lc(ha|0,y|0,Z|0,U|0)|0;ha=y;_=oc(Z|0,U|0,21)|0;U=y;Z=lc(ga|0,N|0,1048576,0)|0;O=jc(Z|0,y|0,21)|0;Z=y;I=lc(T|0,da|0,O|0,Z|0)|0;da=y;T=oc(O|0,Z|0,21)|0;Z=kc(ga|0,N|0,T|0,y|0)|0;T=y;N=lc(va|0,ka|0,1048576,0)|0;ga=jc(N|0,y|0,21)|0;N=y;O=lc(xa|0,oa|0,ca|0,S|0)|0;S=kc(O|0,y|0,L|0,sa|0)|0;sa=lc(S|0,y|0,K|0,ta|0)|0;ta=lc(sa|0,y|0,ga|0,N|0)|0;sa=y;K=oc(ga|0,N|0,21)|0;N=kc(va|0,ka|0,K|0,y|0)|0;K=y;ka=lc(w|0,ra|0,1048576,0)|0;va=jc(ka|0,y|0,21)|0;ka=y;ga=lc(va|0,ka|0,V|0,Ga|0)|0;Ga=y;V=oc(va|0,ka|0,21)|0;ka=kc(w|0,ra|0,V|0,y|0)|0;V=y;ra=lc(pa|0,g|0,1048576,0)|0;w=jc(ra|0,y|0,21)|0;ra=y;va=oc(w|0,ra|0,21)|0;S=y;L=lc(aa|0,ia|0,1048576,0)|0;O=jc(L|0,y|0,21)|0;L=y;ca=oc(O|0,L|0,21)|0;oa=y;xa=lc(Ea|0,ha|0,1048576,0)|0;ea=jc(xa|0,y|0,21)|0;xa=y;Ka=lc(Z|0,T|0,ea|0,xa|0)|0;T=y;Z=oc(ea|0,xa|0,21)|0;xa=y;ea=lc(I|0,da|0,1048576,0)|0;la=jc(ea|0,y|0,21)|0;ea=y;Ba=lc(N|0,K|0,la|0,ea|0)|0;K=y;N=oc(la|0,ea|0,21)|0;ea=kc(I|0,da|0,N|0,y|0)|0;N=y;da=lc(ta|0,sa|0,1048576,0)|0;I=jc(da|0,y|0,21)|0;da=y;la=lc(ka|0,V|0,I|0,da|0)|0;V=y;ka=oc(I|0,da|0,21)|0;da=kc(ta|0,sa|0,ka|0,y|0)|0;ka=y;sa=lc(ga|0,Ga|0,1048576,0)|0;ta=jc(sa|0,y|0,21)|0;sa=y;I=oc(ta|0,sa|0,21)|0;l=kc(ga|0,Ga|0,I|0,y|0)|0;I=y;Ga=qc(ta|0,sa|0,666643,0)|0;ga=lc(Aa|0,r|0,Ga|0,y|0)|0;Ga=y;r=qc(ta|0,sa|0,470296,0)|0;Aa=y;W=qc(ta|0,sa|0,654183,0)|0;n=y;na=qc(ta|0,sa|0,-997805,-1)|0;Y=y;wa=qc(ta|0,sa|0,136657,0)|0;H=y;Ja=qc(ta|0,sa|0,-683901,-1)|0;sa=y;ta=jc(ga|0,Ga|0,21)|0;$=y;P=lc(r|0,Aa|0,pa|0,g|0)|0;g=kc(P|0,y|0,va|0,S|0)|0;S=lc(g|0,y|0,ta|0,$|0)|0;g=y;va=oc(ta|0,$|0,21)|0;$=kc(ga|0,Ga|0,va|0,y|0)|0;va=y;Ga=jc(S|0,g|0,21)|0;ga=y;ta=lc(W|0,n|0,R|0,Ca|0)|0;Ca=kc(ta|0,y|0,s|0,e|0)|0;e=lc(Ca|0,y|0,w|0,ra|0)|0;ra=lc(e|0,y|0,Ga|0,ga|0)|0;e=y;w=oc(Ga|0,ga|0,21)|0;ga=kc(S|0,g|0,w|0,y|0)|0;w=y;g=jc(ra|0,e|0,21)|0;S=y;Ga=lc(aa|0,ia|0,na|0,Y|0)|0;Y=kc(Ga|0,y|0,ca|0,oa|0)|0;oa=lc(Y|0,y|0,g|0,S|0)|0;Y=y;ca=oc(g|0,S|0,21)|0;S=kc(ra|0,e|0,ca|0,y|0)|0;ca=y;e=jc(oa|0,Y|0,21)|0;ra=y;g=lc(wa|0,H|0,k|0,M|0)|0;M=kc(g|0,y|0,_|0,U|0)|0;U=lc(M|0,y|0,O|0,L|0)|0;L=lc(U|0,y|0,e|0,ra|0)|0;U=y;O=oc(e|0,ra|0,21)|0;ra=kc(oa|0,Y|0,O|0,y|0)|0;O=y;Y=jc(L|0,U|0,21)|0;oa=y;e=lc(Ea|0,ha|0,Ja|0,sa|0)|0;sa=kc(e|0,y|0,Z|0,xa|0)|0;xa=lc(sa|0,y|0,Y|0,oa|0)|0;sa=y;Z=oc(Y|0,oa|0,21)|0;oa=kc(L|0,U|0,Z|0,y|0)|0;Z=y;U=jc(xa|0,sa|0,21)|0;L=y;Y=lc(Ka|0,T|0,U|0,L|0)|0;T=y;Ka=oc(U|0,L|0,21)|0;L=kc(xa|0,sa|0,Ka|0,y|0)|0;Ka=y;sa=jc(Y|0,T|0,21)|0;xa=y;U=lc(sa|0,xa|0,ea|0,N|0)|0;N=y;ea=oc(sa|0,xa|0,21)|0;xa=kc(Y|0,T|0,ea|0,y|0)|0;ea=y;T=jc(U|0,N|0,21)|0;Y=y;sa=lc(Ba|0,K|0,T|0,Y|0)|0;K=y;Ba=oc(T|0,Y|0,21)|0;Y=kc(U|0,N|0,Ba|0,y|0)|0;Ba=y;N=jc(sa|0,K|0,21)|0;U=y;T=lc(N|0,U|0,da|0,ka|0)|0;ka=y;da=oc(N|0,U|0,21)|0;U=kc(sa|0,K|0,da|0,y|0)|0;da=y;K=jc(T|0,ka|0,21)|0;sa=y;N=lc(la|0,V|0,K|0,sa|0)|0;V=y;la=oc(K|0,sa|0,21)|0;sa=kc(T|0,ka|0,la|0,y|0)|0;la=y;ka=jc(N|0,V|0,21)|0;T=y;K=lc(ka|0,T|0,l|0,I|0)|0;I=y;l=oc(ka|0,T|0,21)|0;T=kc(N|0,V|0,l|0,y|0)|0;l=y;V=jc(K|0,I|0,21)|0;N=y;ka=oc(V|0,N|0,21)|0;e=kc(K|0,I|0,ka|0,y|0)|0;ka=y;I=qc(V|0,N|0,666643,0)|0;K=lc(I|0,y|0,$|0,va|0)|0;va=y;$=qc(V|0,N|0,470296,0)|0;I=lc(ga|0,w|0,$|0,y|0)|0;$=y;w=qc(V|0,N|0,654183,0)|0;ga=lc(S|0,ca|0,w|0,y|0)|0;w=y;ca=qc(V|0,N|0,-997805,-1)|0;S=lc(ra|0,O|0,ca|0,y|0)|0;ca=y;O=qc(V|0,N|0,136657,0)|0;ra=lc(oa|0,Z|0,O|0,y|0)|0;O=y;Z=qc(V|0,N|0,-683901,-1)|0;N=lc(L|0,Ka|0,Z|0,y|0)|0;Z=y;Ka=jc(K|0,va|0,21)|0;L=y;V=lc(I|0,$|0,Ka|0,L|0)|0;$=y;I=oc(Ka|0,L|0,21)|0;L=kc(K|0,va|0,I|0,y|0)|0;I=y;va=jc(V|0,$|0,21)|0;K=y;Ka=lc(ga|0,w|0,va|0,K|0)|0;w=y;ga=oc(va|0,K|0,21)|0;K=kc(V|0,$|0,ga|0,y|0)|0;ga=y;$=jc(Ka|0,w|0,21)|0;V=y;va=lc(S|0,ca|0,$|0,V|0)|0;ca=y;S=oc($|0,V|0,21)|0;V=kc(Ka|0,w|0,S|0,y|0)|0;S=y;w=jc(va|0,ca|0,21)|0;Ka=y;$=lc(ra|0,O|0,w|0,Ka|0)|0;O=y;ra=oc(w|0,Ka|0,21)|0;Ka=kc(va|0,ca|0,ra|0,y|0)|0;ra=y;ca=jc($|0,O|0,21)|0;va=y;w=lc(N|0,Z|0,ca|0,va|0)|0;Z=y;N=oc(ca|0,va|0,21)|0;va=kc($|0,O|0,N|0,y|0)|0;N=y;O=jc(w|0,Z|0,21)|0;$=y;ca=lc(O|0,$|0,xa|0,ea|0)|0;ea=y;xa=oc(O|0,$|0,21)|0;$=kc(w|0,Z|0,xa|0,y|0)|0;xa=y;Z=jc(ca|0,ea|0,21)|0;w=y;O=lc(Z|0,w|0,Y|0,Ba|0)|0;Ba=y;Y=oc(Z|0,w|0,21)|0;w=kc(ca|0,ea|0,Y|0,y|0)|0;Y=y;ea=jc(O|0,Ba|0,21)|0;ca=y;Z=lc(ea|0,ca|0,U|0,da|0)|0;da=y;U=oc(ea|0,ca|0,21)|0;ca=kc(O|0,Ba|0,U|0,y|0)|0;U=y;Ba=jc(Z|0,da|0,21)|0;O=y;ea=lc(Ba|0,O|0,sa|0,la|0)|0;la=y;sa=oc(Ba|0,O|0,21)|0;O=kc(Z|0,da|0,sa|0,y|0)|0;sa=y;da=jc(ea|0,la|0,21)|0;Z=y;Ba=lc(da|0,Z|0,T|0,l|0)|0;l=y;T=oc(da|0,Z|0,21)|0;Z=kc(ea|0,la|0,T|0,y|0)|0;T=y;la=jc(Ba|0,l|0,21)|0;ea=y;da=lc(la|0,ea|0,e|0,ka|0)|0;ka=y;e=oc(la|0,ea|0,21)|0;ea=kc(Ba|0,l|0,e|0,y|0)|0;e=y;a[b>>0]=L;l=nc(L|0,I|0,8)|0;a[c>>0]=l;l=nc(L|0,I|0,16)|0;I=y;I=oc(K|0,ga|0,5)|0;a[d>>0]=I|l;l=nc(K|0,ga|0,3)|0;a[b+3>>0]=l;l=nc(K|0,ga|0,11)|0;a[b+4>>0]=l;l=nc(K|0,ga|0,19)|0;ga=y;ga=oc(V|0,S|0,2)|0;a[f>>0]=ga|l;l=nc(V|0,S|0,6)|0;a[h>>0]=l;l=nc(V|0,S|0,14)|0;S=y;S=oc(Ka|0,ra|0,7)|0;a[i>>0]=S|l;l=nc(Ka|0,ra|0,1)|0;a[b+8>>0]=l;l=nc(Ka|0,ra|0,9)|0;a[b+9>>0]=l;l=nc(Ka|0,ra|0,17)|0;ra=y;ra=oc(va|0,N|0,4)|0;a[j>>0]=ra|l;l=nc(va|0,N|0,4)|0;a[b+11>>0]=l;l=nc(va|0,N|0,12)|0;a[b+12>>0]=l;l=nc(va|0,N|0,20)|0;N=y;N=oc($|0,xa|0,1)|0;a[m>>0]=N|l;l=nc($|0,xa|0,7)|0;a[o>>0]=l;l=nc($|0,xa|0,15)|0;xa=y;xa=oc(w|0,Y|0,6)|0;a[p>>0]=xa|l;l=nc(w|0,Y|0,2)|0;a[b+16>>0]=l;l=nc(w|0,Y|0,10)|0;a[b+17>>0]=l;l=nc(w|0,Y|0,18)|0;Y=y;Y=oc(ca|0,U|0,3)|0;a[q>>0]=Y|l;l=nc(ca|0,U|0,5)|0;a[t>>0]=l;l=nc(ca|0,U|0,13)|0;a[u>>0]=l;a[v>>0]=O;v=nc(O|0,sa|0,8)|0;a[x>>0]=v;v=nc(O|0,sa|0,16)|0;sa=y;sa=oc(Z|0,T|0,5)|0;a[z>>0]=sa|v;v=nc(Z|0,T|0,3)|0;a[b+24>>0]=v;v=nc(Z|0,T|0,11)|0;a[b+25>>0]=v;v=nc(Z|0,T|0,19)|0;T=y;T=oc(ea|0,e|0,2)|0;a[B>>0]=T|v;v=nc(ea|0,e|0,6)|0;a[D>>0]=v;v=nc(ea|0,e|0,14)|0;e=y;e=oc(da|0,ka|0,7)|0;a[E>>0]=v|e;e=nc(da|0,ka|0,1)|0;a[b+29>>0]=e;e=nc(da|0,ka|0,9)|0;a[b+30>>0]=e;e=nc(da|0,ka|0,17)|0;a[F>>0]=e;return}function Hb(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=oc(b&255|0,0,8)|0;b=y;e=oc(c&255|0,0,16)|0;y=b|y;return d|a&255|e|0}function Ib(a){a=a|0;var b=0,c=0,e=0,f=0,g=0;b=d[a>>0]|0;c=oc(d[a+1>>0]|0|0,0,8)|0;e=y;f=oc(d[a+2>>0]|0|0,0,16)|0;g=e|y;e=oc(d[a+3>>0]|0|0,0,24)|0;y=g|y;return c|b|f|e|0}function Jb(a){a=a|0;var b=0,d=0,e=0;b=a+128|0;d=8;e=b+64|0;do{c[b>>2]=c[d>>2];b=b+4|0;d=d+4|0}while((b|0)<(e|0));d=a+192|0;c[d>>2]=0;c[d+4>>2]=0;return}function Kb(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0;e=a+192|0;if(!d)return;f=a+128|0;g=c[e>>2]&127;h=b;b=d;while(1){d=128-g|0;i=d>>>0>b>>>0?b:d;sc(a+g|0,h|0,i|0)|0;d=i+g|0;b=b-i|0;if((d|0)==128){Lb(a,f);j=0}else j=d;d=e;k=lc(c[d>>2]|0,c[d+4>>2]|0,i|0,0)|0;d=e;c[d>>2]=k;c[d+4>>2]=y;if(!b)break;else{g=j;h=h+i|0}}return}
function Lb(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0;d=l;l=l+640|0;e=d;f=Mb(a)|0;g=y;h=e;c[h>>2]=f;c[h+4>>2]=g;h=Mb(a+8|0)|0;i=e+8|0;c[i>>2]=h;c[i+4>>2]=y;i=Mb(a+16|0)|0;h=e+16|0;c[h>>2]=i;c[h+4>>2]=y;h=Mb(a+24|0)|0;i=e+24|0;c[i>>2]=h;c[i+4>>2]=y;i=Mb(a+32|0)|0;h=e+32|0;c[h>>2]=i;c[h+4>>2]=y;h=Mb(a+40|0)|0;i=e+40|0;c[i>>2]=h;c[i+4>>2]=y;i=Mb(a+48|0)|0;h=e+48|0;c[h>>2]=i;c[h+4>>2]=y;h=Mb(a+56|0)|0;i=e+56|0;c[i>>2]=h;c[i+4>>2]=y;i=Mb(a+64|0)|0;h=e+64|0;c[h>>2]=i;c[h+4>>2]=y;h=Mb(a+72|0)|0;i=e+72|0;c[i>>2]=h;c[i+4>>2]=y;i=Mb(a+80|0)|0;h=e+80|0;c[h>>2]=i;c[h+4>>2]=y;h=Mb(a+88|0)|0;i=e+88|0;c[i>>2]=h;c[i+4>>2]=y;i=Mb(a+96|0)|0;h=e+96|0;c[h>>2]=i;c[h+4>>2]=y;h=Mb(a+104|0)|0;i=e+104|0;c[i>>2]=h;c[i+4>>2]=y;i=Mb(a+112|0)|0;h=e+112|0;c[h>>2]=i;c[h+4>>2]=y;h=Mb(a+120|0)|0;a=e+120|0;c[a>>2]=h;c[a+4>>2]=y;a=16;h=f;f=g;do{g=e+(a+-2<<3)|0;i=c[g>>2]|0;j=c[g+4>>2]|0;g=oc(i|0,j|0,45)|0;k=y;m=nc(i|0,j|0,19)|0;n=k|y;k=oc(i|0,j|0,3)|0;o=y;p=nc(i|0,j|0,61)|0;q=o|y;o=nc(i|0,j|0,6)|0;j=q^y^n;n=e+(a+-7<<3)|0;q=c[n>>2]|0;i=c[n+4>>2]|0;n=e+(a+-15<<3)|0;r=h;h=c[n>>2]|0;s=f;f=c[n+4>>2]|0;n=oc(h|0,f|0,63)|0;t=y;u=nc(h|0,f|0,1)|0;v=t|y;t=oc(h|0,f|0,56)|0;w=y;x=nc(h|0,f|0,8)|0;z=w|y;w=nc(h|0,f|0,7)|0;A=z^y^v;v=lc(r|0,s|0,q|0,i|0)|0;i=lc(v|0,y|0,(k|p)^o^(g|m)|0,j|0)|0;j=lc(i|0,y|0,(t|x)^w^(n|u)|0,A|0)|0;A=e+(a<<3)|0;c[A>>2]=j;c[A+4>>2]=y;a=a+1|0}while((a|0)!=80);a=b;f=c[a>>2]|0;h=c[a+4>>2]|0;a=b+8|0;A=a;j=c[A>>2]|0;u=c[A+4>>2]|0;A=b+16|0;n=A;w=c[n>>2]|0;x=c[n+4>>2]|0;n=b+24|0;t=n;i=c[t>>2]|0;m=c[t+4>>2]|0;t=b+32|0;g=t;o=c[g>>2]|0;p=c[g+4>>2]|0;g=b+40|0;k=g;v=c[k>>2]|0;q=c[k+4>>2]|0;k=b+48|0;s=k;r=c[s>>2]|0;z=c[s+4>>2]|0;s=b+56|0;B=s;C=c[B>>2]|0;D=c[B+4>>2]|0;B=0;E=o;F=p;G=r;H=v;I=z;J=q;K=C;L=D;M=f;N=h;O=j;P=u;Q=w;R=x;S=i;T=m;do{U=oc(E|0,F|0,50)|0;V=y;W=nc(E|0,F|0,14)|0;X=V|y;V=oc(E|0,F|0,46)|0;Y=y;Z=nc(E|0,F|0,18)|0;_=X^(Y|y);Y=oc(E|0,F|0,23)|0;X=y;$=nc(E|0,F|0,41)|0;aa=_^(X|y);X=72+(B<<3)|0;_=c[X>>2]|0;ba=c[X+4>>2]|0;X=e+(B<<3)|0;ca=c[X>>2]|0;da=c[X+4>>2]|0;X=lc((H^G)&E^G|0,(J^I)&F^I|0,K|0,L|0)|0;ea=lc(X|0,y|0,(U|W)^(V|Z)^(Y|$)|0,aa|0)|0;aa=lc(ea|0,y|0,_|0,ba|0)|0;ba=lc(aa|0,y|0,ca|0,da|0)|0;da=y;ca=oc(M|0,N|0,36)|0;aa=y;_=nc(M|0,N|0,28)|0;ea=aa|y;aa=oc(M|0,N|0,30)|0;$=y;Y=nc(M|0,N|0,34)|0;Z=ea^($|y);$=oc(M|0,N|0,25)|0;ea=y;V=nc(M|0,N|0,39)|0;W=lc((ca|_)^(aa|Y)^($|V)|0,Z^(ea|y)|0,(M|O)&Q|M&O|0,(N|P)&R|N&P|0)|0;ea=y;Z=lc(ba|0,da|0,S|0,T|0)|0;V=y;$=lc(W|0,ea|0,ba|0,da|0)|0;da=y;ba=oc(Z|0,V|0,50)|0;ea=y;W=nc(Z|0,V|0,14)|0;Y=ea|y;ea=oc(Z|0,V|0,46)|0;aa=y;_=nc(Z|0,V|0,18)|0;ca=Y^(aa|y);aa=oc(Z|0,V|0,23)|0;Y=y;U=nc(Z|0,V|0,41)|0;X=ca^(Y|y);Y=B|1;ca=72+(Y<<3)|0;fa=e+(Y<<3)|0;Y=c[fa>>2]|0;ga=c[fa+4>>2]|0;fa=lc(c[ca>>2]|0,c[ca+4>>2]|0,G|0,I|0)|0;ca=lc(fa|0,y|0,Y|0,ga|0)|0;ga=lc(ca|0,y|0,Z&(E^H)^H|0,V&(F^J)^J|0)|0;ca=lc(ga|0,y|0,(ba|W)^(ea|_)^(aa|U)|0,X|0)|0;X=y;U=oc($|0,da|0,36)|0;aa=y;_=nc($|0,da|0,28)|0;ea=aa|y;aa=oc($|0,da|0,30)|0;W=y;ba=nc($|0,da|0,34)|0;ga=ea^(W|y);W=oc($|0,da|0,25)|0;ea=y;Y=nc($|0,da|0,39)|0;fa=lc((U|_)^(aa|ba)^(W|Y)|0,ga^(ea|y)|0,($|M)&O|$&M|0,(da|N)&P|da&N|0)|0;ea=y;ga=lc(ca|0,X|0,Q|0,R|0)|0;Y=y;W=lc(fa|0,ea|0,ca|0,X|0)|0;X=y;ca=oc(ga|0,Y|0,50)|0;ea=y;fa=nc(ga|0,Y|0,14)|0;ba=ea|y;ea=oc(ga|0,Y|0,46)|0;aa=y;_=nc(ga|0,Y|0,18)|0;U=ba^(aa|y);aa=oc(ga|0,Y|0,23)|0;ba=y;ha=nc(ga|0,Y|0,41)|0;ia=U^(ba|y);ba=B|2;U=72+(ba<<3)|0;ja=e+(ba<<3)|0;ba=c[ja>>2]|0;ka=c[ja+4>>2]|0;ja=lc(c[U>>2]|0,c[U+4>>2]|0,H|0,J|0)|0;U=lc(ja|0,y|0,ba|0,ka|0)|0;ka=lc(U|0,y|0,ga&(Z^E)^E|0,Y&(V^F)^F|0)|0;U=lc(ka|0,y|0,(ca|fa)^(ea|_)^(aa|ha)|0,ia|0)|0;ia=y;ha=oc(W|0,X|0,36)|0;aa=y;_=nc(W|0,X|0,28)|0;ea=aa|y;aa=oc(W|0,X|0,30)|0;fa=y;ca=nc(W|0,X|0,34)|0;ka=ea^(fa|y);fa=oc(W|0,X|0,25)|0;ea=y;ba=nc(W|0,X|0,39)|0;ja=lc((ha|_)^(aa|ca)^(fa|ba)|0,ka^(ea|y)|0,(W|$)&M|W&$|0,(X|da)&N|X&da|0)|0;ea=y;ka=lc(U|0,ia|0,O|0,P|0)|0;ba=y;fa=lc(ja|0,ea|0,U|0,ia|0)|0;ia=y;U=oc(ka|0,ba|0,50)|0;ea=y;ja=nc(ka|0,ba|0,14)|0;ca=ea|y;ea=oc(ka|0,ba|0,46)|0;aa=y;_=nc(ka|0,ba|0,18)|0;ha=ca^(aa|y);aa=oc(ka|0,ba|0,23)|0;ca=y;la=nc(ka|0,ba|0,41)|0;ma=ha^(ca|y);ca=B|3;ha=72+(ca<<3)|0;na=e+(ca<<3)|0;ca=c[na>>2]|0;oa=c[na+4>>2]|0;na=lc(c[ha>>2]|0,c[ha+4>>2]|0,E|0,F|0)|0;ha=lc(na|0,y|0,ca|0,oa|0)|0;oa=lc(ha|0,y|0,ka&(ga^Z)^Z|0,ba&(Y^V)^V|0)|0;ha=lc(oa|0,y|0,(U|ja)^(ea|_)^(aa|la)|0,ma|0)|0;ma=y;la=oc(fa|0,ia|0,36)|0;aa=y;_=nc(fa|0,ia|0,28)|0;ea=aa|y;aa=oc(fa|0,ia|0,30)|0;ja=y;U=nc(fa|0,ia|0,34)|0;oa=ea^(ja|y);ja=oc(fa|0,ia|0,25)|0;ea=y;ca=nc(fa|0,ia|0,39)|0;na=lc((la|_)^(aa|U)^(ja|ca)|0,oa^(ea|y)|0,(fa|W)&$|fa&W|0,(ia|X)&da|ia&X|0)|0;ea=y;oa=lc(ha|0,ma|0,M|0,N|0)|0;ca=y;ja=lc(na|0,ea|0,ha|0,ma|0)|0;ma=y;ha=oc(oa|0,ca|0,50)|0;ea=y;na=nc(oa|0,ca|0,14)|0;U=ea|y;ea=oc(oa|0,ca|0,46)|0;aa=y;_=nc(oa|0,ca|0,18)|0;la=U^(aa|y);aa=oc(oa|0,ca|0,23)|0;U=y;pa=nc(oa|0,ca|0,41)|0;qa=la^(U|y);U=B|4;la=72+(U<<3)|0;ra=e+(U<<3)|0;U=c[ra>>2]|0;sa=c[ra+4>>2]|0;ra=lc(c[la>>2]|0,c[la+4>>2]|0,Z|0,V|0)|0;V=lc(ra|0,y|0,U|0,sa|0)|0;sa=lc(V|0,y|0,oa&(ka^ga)^ga|0,ca&(ba^Y)^Y|0)|0;V=lc(sa|0,y|0,(ha|na)^(ea|_)^(aa|pa)|0,qa|0)|0;qa=y;pa=oc(ja|0,ma|0,36)|0;aa=y;_=nc(ja|0,ma|0,28)|0;ea=aa|y;aa=oc(ja|0,ma|0,30)|0;na=y;ha=nc(ja|0,ma|0,34)|0;sa=ea^(na|y);na=oc(ja|0,ma|0,25)|0;ea=y;U=nc(ja|0,ma|0,39)|0;ra=lc((pa|_)^(aa|ha)^(na|U)|0,sa^(ea|y)|0,(ja|fa)&W|ja&fa|0,(ma|ia)&X|ma&ia|0)|0;ea=y;K=lc(V|0,qa|0,$|0,da|0)|0;L=y;S=lc(ra|0,ea|0,V|0,qa|0)|0;T=y;qa=oc(K|0,L|0,50)|0;V=y;ea=nc(K|0,L|0,14)|0;ra=V|y;V=oc(K|0,L|0,46)|0;da=y;$=nc(K|0,L|0,18)|0;sa=ra^(da|y);da=oc(K|0,L|0,23)|0;ra=y;U=nc(K|0,L|0,41)|0;na=sa^(ra|y);ra=B|5;sa=72+(ra<<3)|0;ha=e+(ra<<3)|0;ra=lc(c[ha>>2]|0,c[ha+4>>2]|0,c[sa>>2]|0,c[sa+4>>2]|0)|0;sa=lc(ra|0,y|0,ga|0,Y|0)|0;Y=lc(sa|0,y|0,K&(oa^ka)^ka|0,L&(ca^ba)^ba|0)|0;sa=lc(Y|0,y|0,(qa|ea)^(V|$)^(da|U)|0,na|0)|0;na=y;U=oc(S|0,T|0,36)|0;da=y;$=nc(S|0,T|0,28)|0;V=da|y;da=oc(S|0,T|0,30)|0;ea=y;qa=nc(S|0,T|0,34)|0;Y=V^(ea|y);ea=oc(S|0,T|0,25)|0;V=y;ga=nc(S|0,T|0,39)|0;ra=lc((U|$)^(da|qa)^(ea|ga)|0,Y^(V|y)|0,(S|ja)&fa|S&ja|0,(T|ma)&ia|T&ma|0)|0;V=y;G=lc(sa|0,na|0,W|0,X|0)|0;I=y;Q=lc(ra|0,V|0,sa|0,na|0)|0;R=y;na=oc(G|0,I|0,50)|0;sa=y;V=nc(G|0,I|0,14)|0;ra=sa|y;sa=oc(G|0,I|0,46)|0;X=y;W=nc(G|0,I|0,18)|0;Y=ra^(X|y);X=oc(G|0,I|0,23)|0;ra=y;ga=nc(G|0,I|0,41)|0;ea=Y^(ra|y);ra=B|6;Y=72+(ra<<3)|0;qa=e+(ra<<3)|0;ra=lc(c[qa>>2]|0,c[qa+4>>2]|0,c[Y>>2]|0,c[Y+4>>2]|0)|0;Y=lc(ra|0,y|0,ka|0,ba|0)|0;ba=lc(Y|0,y|0,G&(K^oa)^oa|0,I&(L^ca)^ca|0)|0;Y=lc(ba|0,y|0,(na|V)^(sa|W)^(X|ga)|0,ea|0)|0;ea=y;ga=oc(Q|0,R|0,36)|0;X=y;W=nc(Q|0,R|0,28)|0;sa=X|y;X=oc(Q|0,R|0,30)|0;V=y;na=nc(Q|0,R|0,34)|0;ba=sa^(V|y);V=oc(Q|0,R|0,25)|0;sa=y;ka=nc(Q|0,R|0,39)|0;ra=lc((ga|W)^(X|na)^(V|ka)|0,ba^(sa|y)|0,(Q|S)&ja|Q&S|0,(R|T)&ma|R&T|0)|0;sa=y;H=lc(Y|0,ea|0,fa|0,ia|0)|0;J=y;O=lc(ra|0,sa|0,Y|0,ea|0)|0;P=y;ea=oc(H|0,J|0,50)|0;Y=y;sa=nc(H|0,J|0,14)|0;ra=Y|y;Y=oc(H|0,J|0,46)|0;ia=y;fa=nc(H|0,J|0,18)|0;ba=ra^(ia|y);ia=oc(H|0,J|0,23)|0;ra=y;ka=nc(H|0,J|0,41)|0;V=ba^(ra|y);ra=B|7;ba=72+(ra<<3)|0;na=e+(ra<<3)|0;ra=lc(c[na>>2]|0,c[na+4>>2]|0,c[ba>>2]|0,c[ba+4>>2]|0)|0;ba=lc(ra|0,y|0,oa|0,ca|0)|0;ca=lc(ba|0,y|0,H&(G^K)^K|0,J&(I^L)^L|0)|0;ba=lc(ca|0,y|0,(ea|sa)^(Y|fa)^(ia|ka)|0,V|0)|0;V=y;ka=oc(O|0,P|0,36)|0;ia=y;fa=nc(O|0,P|0,28)|0;Y=ia|y;ia=oc(O|0,P|0,30)|0;sa=y;ea=nc(O|0,P|0,34)|0;ca=Y^(sa|y);sa=oc(O|0,P|0,25)|0;Y=y;oa=nc(O|0,P|0,39)|0;ra=lc((ka|fa)^(ia|ea)^(sa|oa)|0,ca^(Y|y)|0,(O|Q)&S|O&Q|0,(P|R)&T|P&R|0)|0;Y=y;E=lc(ba|0,V|0,ja|0,ma|0)|0;F=y;M=lc(ra|0,Y|0,ba|0,V|0)|0;N=y;B=B+8|0}while((B|0)<80);B=lc(M|0,N|0,f|0,h|0)|0;h=b;c[h>>2]=B;c[h+4>>2]=y;h=lc(O|0,P|0,j|0,u|0)|0;u=a;c[u>>2]=h;c[u+4>>2]=y;u=lc(Q|0,R|0,w|0,x|0)|0;x=A;c[x>>2]=u;c[x+4>>2]=y;x=lc(S|0,T|0,i|0,m|0)|0;m=n;c[m>>2]=x;c[m+4>>2]=y;m=lc(E|0,F|0,o|0,p|0)|0;p=t;c[p>>2]=m;c[p+4>>2]=y;p=lc(H|0,J|0,v|0,q|0)|0;q=g;c[q>>2]=p;c[q+4>>2]=y;q=lc(G|0,I|0,r|0,z|0)|0;z=k;c[z>>2]=q;c[z+4>>2]=y;z=lc(K|0,L|0,C|0,D|0)|0;D=s;c[D>>2]=z;c[D+4>>2]=y;l=d;return}function Mb(a){a=a|0;var b=0,c=0,e=0,f=0,g=0,h=0,i=0;b=oc(d[a>>0]|0|0,0,56)|0;c=y;e=oc(d[a+1>>0]|0|0,0,48)|0;f=y|c;c=oc(d[a+2>>0]|0|0,0,40)|0;g=f|y|(d[a+3>>0]|0);f=oc(d[a+4>>0]|0|0,0,24)|0;h=g|y;g=oc(d[a+5>>0]|0|0,0,16)|0;i=h|y;h=oc(d[a+6>>0]|0|0,0,8)|0;y=i|y;return e|b|c|f|g|h|(d[a+7>>0]|0)|0}function Nb(a,b,c){a=a|0;b=b|0;c=c|0;Ob(a,0,0,b,c);return}function Ob(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;h=b+192|0;i=c[h>>2]&127;j=128>>>e;k=i+1|0;a[b+i>>0]=0-j&d|j;j=b+k|0;if(k>>>0>112){mc(j|0,0,i^127|0)|0;k=b+128|0;Lb(b,k);d=b;l=d+112|0;do{c[d>>2]=0;d=d+4|0}while((d|0)<(l|0));m=k;n=k}else{mc(j|0,0,111-i|0)|0;i=b+128|0;m=i;n=i}i=h;j=nc(c[i>>2]|0,c[i+4>>2]|0,61)|0;Pb(b+112|0,j,y);j=h;h=oc(c[j>>2]|0,c[j+4>>2]|0,3)|0;j=lc(h|0,y|0,e|0,0)|0;Pb(b+120|0,j,y);Lb(b,m);if(!g)return;else o=0;do{m=n+(o<<3)|0;Qb(f+(o<<3)|0,c[m>>2]|0,c[m+4>>2]|0);o=o+1|0}while((o|0)!=(g|0));return}function Pb(b,c,d){b=b|0;c=c|0;d=d|0;var e=0;e=nc(c|0,d|0,56)|0;a[b>>0]=e;e=nc(c|0,d|0,48)|0;a[b+1>>0]=e;e=nc(c|0,d|0,40)|0;a[b+2>>0]=e;a[b+3>>0]=d;e=nc(c|0,d|0,24)|0;a[b+4>>0]=e;e=nc(c|0,d|0,16)|0;a[b+5>>0]=e;e=nc(c|0,d|0,8)|0;a[b+6>>0]=e;a[b+7>>0]=c;return}function Qb(b,c,d){b=b|0;c=c|0;d=d|0;var e=0;e=nc(c|0,d|0,56)|0;a[b>>0]=e;e=nc(c|0,d|0,48)|0;a[b+1>>0]=e;e=nc(c|0,d|0,40)|0;a[b+2>>0]=e;a[b+3>>0]=d;e=nc(c|0,d|0,24)|0;a[b+4>>0]=e;e=nc(c|0,d|0,16)|0;a[b+5>>0]=e;e=nc(c|0,d|0,8)|0;a[b+6>>0]=e;a[b+7>>0]=c;return}function Rb(a,b){a=a|0;b=b|0;Nb(a,b,8);Jb(a);return}function Sb(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0;b=l;l=l+16|0;d=b;do if(a>>>0<245){e=a>>>0<11?16:a+11&-8;f=e>>>3;g=c[8222]|0;h=g>>>f;if(h&3|0){i=(h&1^1)+f|0;j=32928+(i<<1<<2)|0;k=j+8|0;m=c[k>>2]|0;n=m+8|0;o=c[n>>2]|0;if((j|0)==(o|0))c[8222]=g&~(1<<i);else{c[o+12>>2]=j;c[k>>2]=o}o=i<<3;c[m+4>>2]=o|3;i=m+o+4|0;c[i>>2]=c[i>>2]|1;p=n;l=b;return p|0}n=c[8224]|0;if(e>>>0>n>>>0){if(h|0){i=2<<f;o=h<<f&(i|0-i);i=(o&0-o)+-1|0;o=i>>>12&16;f=i>>>o;i=f>>>5&8;h=f>>>i;f=h>>>2&4;m=h>>>f;h=m>>>1&2;k=m>>>h;m=k>>>1&1;j=(i|o|f|h|m)+(k>>>m)|0;m=32928+(j<<1<<2)|0;k=m+8|0;h=c[k>>2]|0;f=h+8|0;o=c[f>>2]|0;if((m|0)==(o|0)){i=g&~(1<<j);c[8222]=i;q=i}else{c[o+12>>2]=m;c[k>>2]=o;q=g}o=(j<<3)-e|0;c[h+4>>2]=e|3;j=h+e|0;c[j+4>>2]=o|1;c[j+o>>2]=o;if(n|0){h=c[8227]|0;k=n>>>3;m=32928+(k<<1<<2)|0;i=1<<k;if(!(q&i)){c[8222]=q|i;r=m;s=m+8|0}else{i=m+8|0;r=c[i>>2]|0;s=i}c[s>>2]=h;c[r+12>>2]=h;c[h+8>>2]=r;c[h+12>>2]=m}c[8224]=o;c[8227]=j;p=f;l=b;return p|0}f=c[8223]|0;if(f){j=(f&0-f)+-1|0;o=j>>>12&16;m=j>>>o;j=m>>>5&8;h=m>>>j;m=h>>>2&4;i=h>>>m;h=i>>>1&2;k=i>>>h;i=k>>>1&1;t=c[33192+((j|o|m|h|i)+(k>>>i)<<2)>>2]|0;i=(c[t+4>>2]&-8)-e|0;k=c[t+16+(((c[t+16>>2]|0)==0&1)<<2)>>2]|0;if(!k){u=t;v=i}else{h=t;t=i;i=k;while(1){k=(c[i+4>>2]&-8)-e|0;m=k>>>0<t>>>0;o=m?k:t;k=m?i:h;i=c[i+16+(((c[i+16>>2]|0)==0&1)<<2)>>2]|0;if(!i){u=k;v=o;break}else{h=k;t=o}}}t=u+e|0;if(u>>>0<t>>>0){h=c[u+24>>2]|0;i=c[u+12>>2]|0;do if((i|0)==(u|0)){o=u+20|0;k=c[o>>2]|0;if(!k){m=u+16|0;j=c[m>>2]|0;if(!j){w=0;break}else{x=j;y=m}}else{x=k;y=o}while(1){o=x+20|0;k=c[o>>2]|0;if(k|0){x=k;y=o;continue}o=x+16|0;k=c[o>>2]|0;if(!k)break;else{x=k;y=o}}c[y>>2]=0;w=x}else{o=c[u+8>>2]|0;c[o+12>>2]=i;c[i+8>>2]=o;w=i}while(0);do if(h|0){i=c[u+28>>2]|0;o=33192+(i<<2)|0;if((u|0)==(c[o>>2]|0)){c[o>>2]=w;if(!w){c[8223]=f&~(1<<i);break}}else{c[h+16+(((c[h+16>>2]|0)!=(u|0)&1)<<2)>>2]=w;if(!w)break}c[w+24>>2]=h;i=c[u+16>>2]|0;if(i|0){c[w+16>>2]=i;c[i+24>>2]=w}i=c[u+20>>2]|0;if(i|0){c[w+20>>2]=i;c[i+24>>2]=w}}while(0);if(v>>>0<16){h=v+e|0;c[u+4>>2]=h|3;f=u+h+4|0;c[f>>2]=c[f>>2]|1}else{c[u+4>>2]=e|3;c[t+4>>2]=v|1;c[t+v>>2]=v;if(n|0){f=c[8227]|0;h=n>>>3;i=32928+(h<<1<<2)|0;o=1<<h;if(!(g&o)){c[8222]=g|o;z=i;A=i+8|0}else{o=i+8|0;z=c[o>>2]|0;A=o}c[A>>2]=f;c[z+12>>2]=f;c[f+8>>2]=z;c[f+12>>2]=i}c[8224]=v;c[8227]=t}p=u+8|0;l=b;return p|0}else B=e}else B=e}else B=e}else if(a>>>0<=4294967231){i=a+11|0;f=i&-8;o=c[8223]|0;if(o){h=0-f|0;k=i>>>8;if(k)if(f>>>0>16777215)C=31;else{i=(k+1048320|0)>>>16&8;m=k<<i;k=(m+520192|0)>>>16&4;j=m<<k;m=(j+245760|0)>>>16&2;D=14-(k|i|m)+(j<<m>>>15)|0;C=f>>>(D+7|0)&1|D<<1}else C=0;D=c[33192+(C<<2)>>2]|0;a:do if(!D){E=0;F=0;G=h;H=57}else{m=0;j=h;i=D;k=f<<((C|0)==31?0:25-(C>>>1)|0);I=0;while(1){J=(c[i+4>>2]&-8)-f|0;if(J>>>0<j>>>0)if(!J){K=i;L=0;M=i;H=61;break a}else{N=i;O=J}else{N=m;O=j}J=c[i+20>>2]|0;i=c[i+16+(k>>>31<<2)>>2]|0;P=(J|0)==0|(J|0)==(i|0)?I:J;J=(i|0)==0;if(J){E=P;F=N;G=O;H=57;break}else{m=N;j=O;k=k<<((J^1)&1);I=P}}}while(0);if((H|0)==57){if((E|0)==0&(F|0)==0){D=2<<C;h=o&(D|0-D);if(!h){B=f;break}D=(h&0-h)+-1|0;h=D>>>12&16;e=D>>>h;D=e>>>5&8;t=e>>>D;e=t>>>2&4;g=t>>>e;t=g>>>1&2;n=g>>>t;g=n>>>1&1;Q=0;R=c[33192+((D|h|e|t|g)+(n>>>g)<<2)>>2]|0}else{Q=F;R=E}if(!R){S=Q;T=G}else{K=Q;L=G;M=R;H=61}}if((H|0)==61)while(1){H=0;g=(c[M+4>>2]&-8)-f|0;n=g>>>0<L>>>0;t=n?g:L;g=n?M:K;M=c[M+16+(((c[M+16>>2]|0)==0&1)<<2)>>2]|0;if(!M){S=g;T=t;break}else{K=g;L=t;H=61}}if((S|0)!=0?T>>>0<((c[8224]|0)-f|0)>>>0:0){t=S+f|0;if(S>>>0>=t>>>0){p=0;l=b;return p|0}g=c[S+24>>2]|0;n=c[S+12>>2]|0;do if((n|0)==(S|0)){e=S+20|0;h=c[e>>2]|0;if(!h){D=S+16|0;I=c[D>>2]|0;if(!I){U=0;break}else{V=I;W=D}}else{V=h;W=e}while(1){e=V+20|0;h=c[e>>2]|0;if(h|0){V=h;W=e;continue}e=V+16|0;h=c[e>>2]|0;if(!h)break;else{V=h;W=e}}c[W>>2]=0;U=V}else{e=c[S+8>>2]|0;c[e+12>>2]=n;c[n+8>>2]=e;U=n}while(0);do if(g){n=c[S+28>>2]|0;e=33192+(n<<2)|0;if((S|0)==(c[e>>2]|0)){c[e>>2]=U;if(!U){e=o&~(1<<n);c[8223]=e;X=e;break}}else{c[g+16+(((c[g+16>>2]|0)!=(S|0)&1)<<2)>>2]=U;if(!U){X=o;break}}c[U+24>>2]=g;e=c[S+16>>2]|0;if(e|0){c[U+16>>2]=e;c[e+24>>2]=U}e=c[S+20>>2]|0;if(e){c[U+20>>2]=e;c[e+24>>2]=U;X=o}else X=o}else X=o;while(0);do if(T>>>0>=16){c[S+4>>2]=f|3;c[t+4>>2]=T|1;c[t+T>>2]=T;o=T>>>3;if(T>>>0<256){g=32928+(o<<1<<2)|0;e=c[8222]|0;n=1<<o;if(!(e&n)){c[8222]=e|n;Y=g;Z=g+8|0}else{n=g+8|0;Y=c[n>>2]|0;Z=n}c[Z>>2]=t;c[Y+12>>2]=t;c[t+8>>2]=Y;c[t+12>>2]=g;break}g=T>>>8;if(g)if(T>>>0>16777215)_=31;else{n=(g+1048320|0)>>>16&8;e=g<<n;g=(e+520192|0)>>>16&4;o=e<<g;e=(o+245760|0)>>>16&2;h=14-(g|n|e)+(o<<e>>>15)|0;_=T>>>(h+7|0)&1|h<<1}else _=0;h=33192+(_<<2)|0;c[t+28>>2]=_;e=t+16|0;c[e+4>>2]=0;c[e>>2]=0;e=1<<_;if(!(X&e)){c[8223]=X|e;c[h>>2]=t;c[t+24>>2]=h;c[t+12>>2]=t;c[t+8>>2]=t;break}e=T<<((_|0)==31?0:25-(_>>>1)|0);o=c[h>>2]|0;while(1){if((c[o+4>>2]&-8|0)==(T|0)){H=97;break}$=o+16+(e>>>31<<2)|0;h=c[$>>2]|0;if(!h){H=96;break}else{e=e<<1;o=h}}if((H|0)==96){c[$>>2]=t;c[t+24>>2]=o;c[t+12>>2]=t;c[t+8>>2]=t;break}else if((H|0)==97){e=o+8|0;h=c[e>>2]|0;c[h+12>>2]=t;c[e>>2]=t;c[t+8>>2]=h;c[t+12>>2]=o;c[t+24>>2]=0;break}}else{h=T+f|0;c[S+4>>2]=h|3;e=S+h+4|0;c[e>>2]=c[e>>2]|1}while(0);p=S+8|0;l=b;return p|0}else B=f}else B=f}else B=-1;while(0);S=c[8224]|0;if(S>>>0>=B>>>0){T=S-B|0;$=c[8227]|0;if(T>>>0>15){_=$+B|0;c[8227]=_;c[8224]=T;c[_+4>>2]=T|1;c[_+T>>2]=T;c[$+4>>2]=B|3}else{c[8224]=0;c[8227]=0;c[$+4>>2]=S|3;T=$+S+4|0;c[T>>2]=c[T>>2]|1}p=$+8|0;l=b;return p|0}$=c[8225]|0;if($>>>0>B>>>0){T=$-B|0;c[8225]=T;S=c[8228]|0;_=S+B|0;c[8228]=_;c[_+4>>2]=T|1;c[S+4>>2]=B|3;p=S+8|0;l=b;return p|0}if(!(c[8340]|0)){c[8342]=4096;c[8341]=4096;c[8343]=-1;c[8344]=-1;c[8345]=0;c[8333]=0;S=d&-16^1431655768;c[d>>2]=S;c[8340]=S;aa=4096}else aa=c[8342]|0;S=B+48|0;d=B+47|0;T=aa+d|0;_=0-aa|0;aa=T&_;if(aa>>>0<=B>>>0){p=0;l=b;return p|0}X=c[8332]|0;if(X|0?(Y=c[8330]|0,Z=Y+aa|0,Z>>>0<=Y>>>0|Z>>>0>X>>>0):0){p=0;l=b;return p|0}b:do if(!(c[8333]&4)){X=c[8228]|0;c:do if(X){Z=33336;while(1){Y=c[Z>>2]|0;if(Y>>>0<=X>>>0?(ba=Z+4|0,(Y+(c[ba>>2]|0)|0)>>>0>X>>>0):0)break;Y=c[Z+8>>2]|0;if(!Y){H=118;break c}else Z=Y}o=T-$&_;if(o>>>0<2147483647){Y=rc(o|0)|0;if((Y|0)==((c[Z>>2]|0)+(c[ba>>2]|0)|0))if((Y|0)==(-1|0))ca=o;else{da=o;ea=Y;H=135;break b}else{fa=Y;ga=o;H=126}}else ca=0}else H=118;while(0);do if((H|0)==118){X=rc(0)|0;if((X|0)!=(-1|0)?(f=X,o=c[8341]|0,Y=o+-1|0,U=((Y&f|0)==0?0:(Y+f&0-o)-f|0)+aa|0,f=c[8330]|0,o=U+f|0,U>>>0>B>>>0&U>>>0<2147483647):0){Y=c[8332]|0;if(Y|0?o>>>0<=f>>>0|o>>>0>Y>>>0:0){ca=0;break}Y=rc(U|0)|0;if((Y|0)==(X|0)){da=U;ea=X;H=135;break b}else{fa=Y;ga=U;H=126}}else ca=0}while(0);do if((H|0)==126){U=0-ga|0;if(!(S>>>0>ga>>>0&(ga>>>0<2147483647&(fa|0)!=(-1|0))))if((fa|0)==(-1|0)){ca=0;break}else{da=ga;ea=fa;H=135;break b}Y=c[8342]|0;X=d-ga+Y&0-Y;if(X>>>0>=2147483647){da=ga;ea=fa;H=135;break b}if((rc(X|0)|0)==(-1|0)){rc(U|0)|0;ca=0;break}else{da=X+ga|0;ea=fa;H=135;break b}}while(0);c[8333]=c[8333]|4;ha=ca;H=133}else{ha=0;H=133}while(0);if(((H|0)==133?aa>>>0<2147483647:0)?(ca=rc(aa|0)|0,aa=rc(0)|0,fa=aa-ca|0,ga=fa>>>0>(B+40|0)>>>0,!((ca|0)==(-1|0)|ga^1|ca>>>0<aa>>>0&((ca|0)!=(-1|0)&(aa|0)!=(-1|0))^1)):0){da=ga?fa:ha;ea=ca;H=135}if((H|0)==135){ca=(c[8330]|0)+da|0;c[8330]=ca;if(ca>>>0>(c[8331]|0)>>>0)c[8331]=ca;ca=c[8228]|0;do if(ca){ha=33336;while(1){ia=c[ha>>2]|0;ja=ha+4|0;ka=c[ja>>2]|0;if((ea|0)==(ia+ka|0)){H=145;break}fa=c[ha+8>>2]|0;if(!fa)break;else ha=fa}if(((H|0)==145?(c[ha+12>>2]&8|0)==0:0)?ca>>>0<ea>>>0&ca>>>0>=ia>>>0:0){c[ja>>2]=ka+da;fa=ca+8|0;ga=(fa&7|0)==0?0:0-fa&7;fa=ca+ga|0;aa=(c[8225]|0)+(da-ga)|0;c[8228]=fa;c[8225]=aa;c[fa+4>>2]=aa|1;c[fa+aa+4>>2]=40;c[8229]=c[8344];break}if(ea>>>0<(c[8226]|0)>>>0)c[8226]=ea;aa=ea+da|0;fa=33336;while(1){if((c[fa>>2]|0)==(aa|0)){H=153;break}ga=c[fa+8>>2]|0;if(!ga)break;else fa=ga}if((H|0)==153?(c[fa+12>>2]&8|0)==0:0){c[fa>>2]=ea;ha=fa+4|0;c[ha>>2]=(c[ha>>2]|0)+da;ha=ea+8|0;ga=ea+((ha&7|0)==0?0:0-ha&7)|0;ha=aa+8|0;d=aa+((ha&7|0)==0?0:0-ha&7)|0;ha=ga+B|0;S=d-ga-B|0;c[ga+4>>2]=B|3;do if((d|0)!=(ca|0)){if((d|0)==(c[8227]|0)){ba=(c[8224]|0)+S|0;c[8224]=ba;c[8227]=ha;c[ha+4>>2]=ba|1;c[ha+ba>>2]=ba;break}ba=c[d+4>>2]|0;if((ba&3|0)==1){_=ba&-8;$=ba>>>3;d:do if(ba>>>0<256){T=c[d+8>>2]|0;X=c[d+12>>2]|0;if((X|0)==(T|0)){c[8222]=c[8222]&~(1<<$);break}else{c[T+12>>2]=X;c[X+8>>2]=T;break}}else{T=c[d+24>>2]|0;X=c[d+12>>2]|0;do if((X|0)==(d|0)){U=d+16|0;Y=U+4|0;o=c[Y>>2]|0;if(!o){f=c[U>>2]|0;if(!f){la=0;break}else{ma=f;na=U}}else{ma=o;na=Y}while(1){Y=ma+20|0;o=c[Y>>2]|0;if(o|0){ma=o;na=Y;continue}Y=ma+16|0;o=c[Y>>2]|0;if(!o)break;else{ma=o;na=Y}}c[na>>2]=0;la=ma}else{Y=c[d+8>>2]|0;c[Y+12>>2]=X;c[X+8>>2]=Y;la=X}while(0);if(!T)break;X=c[d+28>>2]|0;Y=33192+(X<<2)|0;do if((d|0)!=(c[Y>>2]|0)){c[T+16+(((c[T+16>>2]|0)!=(d|0)&1)<<2)>>2]=la;if(!la)break d}else{c[Y>>2]=la;if(la|0)break;c[8223]=c[8223]&~(1<<X);break d}while(0);c[la+24>>2]=T;X=d+16|0;Y=c[X>>2]|0;if(Y|0){c[la+16>>2]=Y;c[Y+24>>2]=la}Y=c[X+4>>2]|0;if(!Y)break;c[la+20>>2]=Y;c[Y+24>>2]=la}while(0);oa=d+_|0;pa=_+S|0}else{oa=d;pa=S}$=oa+4|0;c[$>>2]=c[$>>2]&-2;c[ha+4>>2]=pa|1;c[ha+pa>>2]=pa;$=pa>>>3;if(pa>>>0<256){ba=32928+($<<1<<2)|0;Z=c[8222]|0;Y=1<<$;if(!(Z&Y)){c[8222]=Z|Y;qa=ba;ra=ba+8|0}else{Y=ba+8|0;qa=c[Y>>2]|0;ra=Y}c[ra>>2]=ha;c[qa+12>>2]=ha;c[ha+8>>2]=qa;c[ha+12>>2]=ba;break}ba=pa>>>8;do if(!ba)sa=0;else{if(pa>>>0>16777215){sa=31;break}Y=(ba+1048320|0)>>>16&8;Z=ba<<Y;$=(Z+520192|0)>>>16&4;X=Z<<$;Z=(X+245760|0)>>>16&2;o=14-($|Y|Z)+(X<<Z>>>15)|0;sa=pa>>>(o+7|0)&1|o<<1}while(0);ba=33192+(sa<<2)|0;c[ha+28>>2]=sa;_=ha+16|0;c[_+4>>2]=0;c[_>>2]=0;_=c[8223]|0;o=1<<sa;if(!(_&o)){c[8223]=_|o;c[ba>>2]=ha;c[ha+24>>2]=ba;c[ha+12>>2]=ha;c[ha+8>>2]=ha;break}o=pa<<((sa|0)==31?0:25-(sa>>>1)|0);_=c[ba>>2]|0;while(1){if((c[_+4>>2]&-8|0)==(pa|0)){H=194;break}ta=_+16+(o>>>31<<2)|0;ba=c[ta>>2]|0;if(!ba){H=193;break}else{o=o<<1;_=ba}}if((H|0)==193){c[ta>>2]=ha;c[ha+24>>2]=_;c[ha+12>>2]=ha;c[ha+8>>2]=ha;break}else if((H|0)==194){o=_+8|0;ba=c[o>>2]|0;c[ba+12>>2]=ha;c[o>>2]=ha;c[ha+8>>2]=ba;c[ha+12>>2]=_;c[ha+24>>2]=0;break}}else{ba=(c[8225]|0)+S|0;c[8225]=ba;c[8228]=ha;c[ha+4>>2]=ba|1}while(0);p=ga+8|0;l=b;return p|0}ha=33336;while(1){S=c[ha>>2]|0;if(S>>>0<=ca>>>0?(ua=S+(c[ha+4>>2]|0)|0,ua>>>0>ca>>>0):0)break;ha=c[ha+8>>2]|0}ha=ua+-47|0;ga=ha+8|0;S=ha+((ga&7|0)==0?0:0-ga&7)|0;ga=ca+16|0;ha=S>>>0<ga>>>0?ca:S;S=ha+8|0;d=ea+8|0;aa=(d&7|0)==0?0:0-d&7;d=ea+aa|0;fa=da+-40-aa|0;c[8228]=d;c[8225]=fa;c[d+4>>2]=fa|1;c[d+fa+4>>2]=40;c[8229]=c[8344];fa=ha+4|0;c[fa>>2]=27;c[S>>2]=c[8334];c[S+4>>2]=c[8335];c[S+8>>2]=c[8336];c[S+12>>2]=c[8337];c[8334]=ea;c[8335]=da;c[8337]=0;c[8336]=S;S=ha+24|0;do{d=S;S=S+4|0;c[S>>2]=7}while((d+8|0)>>>0<ua>>>0);if((ha|0)!=(ca|0)){S=ha-ca|0;c[fa>>2]=c[fa>>2]&-2;c[ca+4>>2]=S|1;c[ha>>2]=S;d=S>>>3;if(S>>>0<256){aa=32928+(d<<1<<2)|0;ba=c[8222]|0;o=1<<d;if(!(ba&o)){c[8222]=ba|o;va=aa;wa=aa+8|0}else{o=aa+8|0;va=c[o>>2]|0;wa=o}c[wa>>2]=ca;c[va+12>>2]=ca;c[ca+8>>2]=va;c[ca+12>>2]=aa;break}aa=S>>>8;if(aa)if(S>>>0>16777215)xa=31;else{o=(aa+1048320|0)>>>16&8;ba=aa<<o;aa=(ba+520192|0)>>>16&4;d=ba<<aa;ba=(d+245760|0)>>>16&2;Z=14-(aa|o|ba)+(d<<ba>>>15)|0;xa=S>>>(Z+7|0)&1|Z<<1}else xa=0;Z=33192+(xa<<2)|0;c[ca+28>>2]=xa;c[ca+20>>2]=0;c[ga>>2]=0;ba=c[8223]|0;d=1<<xa;if(!(ba&d)){c[8223]=ba|d;c[Z>>2]=ca;c[ca+24>>2]=Z;c[ca+12>>2]=ca;c[ca+8>>2]=ca;break}d=S<<((xa|0)==31?0:25-(xa>>>1)|0);ba=c[Z>>2]|0;while(1){if((c[ba+4>>2]&-8|0)==(S|0)){H=216;break}ya=ba+16+(d>>>31<<2)|0;Z=c[ya>>2]|0;if(!Z){H=215;break}else{d=d<<1;ba=Z}}if((H|0)==215){c[ya>>2]=ca;c[ca+24>>2]=ba;c[ca+12>>2]=ca;c[ca+8>>2]=ca;break}else if((H|0)==216){d=ba+8|0;S=c[d>>2]|0;c[S+12>>2]=ca;c[d>>2]=ca;c[ca+8>>2]=S;c[ca+12>>2]=ba;c[ca+24>>2]=0;break}}}else{S=c[8226]|0;if((S|0)==0|ea>>>0<S>>>0)c[8226]=ea;c[8334]=ea;c[8335]=da;c[8337]=0;c[8231]=c[8340];c[8230]=-1;S=0;do{d=32928+(S<<1<<2)|0;c[d+12>>2]=d;c[d+8>>2]=d;S=S+1|0}while((S|0)!=32);S=ea+8|0;ba=(S&7|0)==0?0:0-S&7;S=ea+ba|0;d=da+-40-ba|0;c[8228]=S;c[8225]=d;c[S+4>>2]=d|1;c[S+d+4>>2]=40;c[8229]=c[8344]}while(0);da=c[8225]|0;if(da>>>0>B>>>0){ea=da-B|0;c[8225]=ea;da=c[8228]|0;ca=da+B|0;c[8228]=ca;c[ca+4>>2]=ea|1;c[da+4>>2]=B|3;p=da+8|0;l=b;return p|0}}c[(Zb()|0)>>2]=12;p=0;l=b;return p|0}function Tb(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0;if(!a)return;b=a+-8|0;d=c[8226]|0;e=c[a+-4>>2]|0;a=e&-8;f=b+a|0;do if(!(e&1)){g=c[b>>2]|0;if(!(e&3))return;h=b+(0-g)|0;i=g+a|0;if(h>>>0<d>>>0)return;if((h|0)==(c[8227]|0)){j=f+4|0;k=c[j>>2]|0;if((k&3|0)!=3){l=h;m=i;n=h;break}c[8224]=i;c[j>>2]=k&-2;c[h+4>>2]=i|1;c[h+i>>2]=i;return}k=g>>>3;if(g>>>0<256){g=c[h+8>>2]|0;j=c[h+12>>2]|0;if((j|0)==(g|0)){c[8222]=c[8222]&~(1<<k);l=h;m=i;n=h;break}else{c[g+12>>2]=j;c[j+8>>2]=g;l=h;m=i;n=h;break}}g=c[h+24>>2]|0;j=c[h+12>>2]|0;do if((j|0)==(h|0)){k=h+16|0;o=k+4|0;p=c[o>>2]|0;if(!p){q=c[k>>2]|0;if(!q){r=0;break}else{s=q;t=k}}else{s=p;t=o}while(1){o=s+20|0;p=c[o>>2]|0;if(p|0){s=p;t=o;continue}o=s+16|0;p=c[o>>2]|0;if(!p)break;else{s=p;t=o}}c[t>>2]=0;r=s}else{o=c[h+8>>2]|0;c[o+12>>2]=j;c[j+8>>2]=o;r=j}while(0);if(g){j=c[h+28>>2]|0;o=33192+(j<<2)|0;if((h|0)==(c[o>>2]|0)){c[o>>2]=r;if(!r){c[8223]=c[8223]&~(1<<j);l=h;m=i;n=h;break}}else{c[g+16+(((c[g+16>>2]|0)!=(h|0)&1)<<2)>>2]=r;if(!r){l=h;m=i;n=h;break}}c[r+24>>2]=g;j=h+16|0;o=c[j>>2]|0;if(o|0){c[r+16>>2]=o;c[o+24>>2]=r}o=c[j+4>>2]|0;if(o){c[r+20>>2]=o;c[o+24>>2]=r;l=h;m=i;n=h}else{l=h;m=i;n=h}}else{l=h;m=i;n=h}}else{l=b;m=a;n=b}while(0);if(n>>>0>=f>>>0)return;b=f+4|0;a=c[b>>2]|0;if(!(a&1))return;if(!(a&2)){r=c[8227]|0;if((f|0)==(c[8228]|0)){s=(c[8225]|0)+m|0;c[8225]=s;c[8228]=l;c[l+4>>2]=s|1;if((l|0)!=(r|0))return;c[8227]=0;c[8224]=0;return}if((f|0)==(r|0)){r=(c[8224]|0)+m|0;c[8224]=r;c[8227]=n;c[l+4>>2]=r|1;c[n+r>>2]=r;return}r=(a&-8)+m|0;s=a>>>3;do if(a>>>0<256){t=c[f+8>>2]|0;d=c[f+12>>2]|0;if((d|0)==(t|0)){c[8222]=c[8222]&~(1<<s);break}else{c[t+12>>2]=d;c[d+8>>2]=t;break}}else{t=c[f+24>>2]|0;d=c[f+12>>2]|0;do if((d|0)==(f|0)){e=f+16|0;o=e+4|0;j=c[o>>2]|0;if(!j){p=c[e>>2]|0;if(!p){u=0;break}else{v=p;w=e}}else{v=j;w=o}while(1){o=v+20|0;j=c[o>>2]|0;if(j|0){v=j;w=o;continue}o=v+16|0;j=c[o>>2]|0;if(!j)break;else{v=j;w=o}}c[w>>2]=0;u=v}else{o=c[f+8>>2]|0;c[o+12>>2]=d;c[d+8>>2]=o;u=d}while(0);if(t|0){d=c[f+28>>2]|0;h=33192+(d<<2)|0;if((f|0)==(c[h>>2]|0)){c[h>>2]=u;if(!u){c[8223]=c[8223]&~(1<<d);break}}else{c[t+16+(((c[t+16>>2]|0)!=(f|0)&1)<<2)>>2]=u;if(!u)break}c[u+24>>2]=t;d=f+16|0;h=c[d>>2]|0;if(h|0){c[u+16>>2]=h;c[h+24>>2]=u}h=c[d+4>>2]|0;if(h|0){c[u+20>>2]=h;c[h+24>>2]=u}}}while(0);c[l+4>>2]=r|1;c[n+r>>2]=r;if((l|0)==(c[8227]|0)){c[8224]=r;return}else x=r}else{c[b>>2]=a&-2;c[l+4>>2]=m|1;c[n+m>>2]=m;x=m}m=x>>>3;if(x>>>0<256){n=32928+(m<<1<<2)|0;a=c[8222]|0;b=1<<m;if(!(a&b)){c[8222]=a|b;y=n;z=n+8|0}else{b=n+8|0;y=c[b>>2]|0;z=b}c[z>>2]=l;c[y+12>>2]=l;c[l+8>>2]=y;c[l+12>>2]=n;return}n=x>>>8;if(n)if(x>>>0>16777215)A=31;else{y=(n+1048320|0)>>>16&8;z=n<<y;n=(z+520192|0)>>>16&4;b=z<<n;z=(b+245760|0)>>>16&2;a=14-(n|y|z)+(b<<z>>>15)|0;A=x>>>(a+7|0)&1|a<<1}else A=0;a=33192+(A<<2)|0;c[l+28>>2]=A;c[l+20>>2]=0;c[l+16>>2]=0;z=c[8223]|0;b=1<<A;do if(z&b){y=x<<((A|0)==31?0:25-(A>>>1)|0);n=c[a>>2]|0;while(1){if((c[n+4>>2]&-8|0)==(x|0)){B=73;break}C=n+16+(y>>>31<<2)|0;m=c[C>>2]|0;if(!m){B=72;break}else{y=y<<1;n=m}}if((B|0)==72){c[C>>2]=l;c[l+24>>2]=n;c[l+12>>2]=l;c[l+8>>2]=l;break}else if((B|0)==73){y=n+8|0;t=c[y>>2]|0;c[t+12>>2]=l;c[y>>2]=l;c[l+8>>2]=t;c[l+12>>2]=n;c[l+24>>2]=0;break}}else{c[8223]=z|b;c[a>>2]=l;c[l+24>>2]=a;c[l+12>>2]=l;c[l+8>>2]=l}while(0);l=(c[8230]|0)+-1|0;c[8230]=l;if(!l)D=33344;else return;while(1){l=c[D>>2]|0;if(!l)break;else D=l+8|0}c[8230]=-1;return}function Ub(){return 33384}function Vb(a){a=a|0;var b=0,d=0;b=l;l=l+16|0;d=b;c[d>>2]=bc(c[a+60>>2]|0)|0;a=Yb(Z(6,d|0)|0)|0;l=b;return a|0}function Wb(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0;f=l;l=l+32|0;g=f;c[b+36>>2]=3;if((c[b>>2]&64|0)==0?(c[g>>2]=c[b+60>>2],c[g+4>>2]=21523,c[g+8>>2]=f+16,ca(54,g|0)|0):0)a[b+75>>0]=-1;g=ac(b,d,e)|0;l=f;return g|0}function Xb(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+32|0;f=e;g=e+20|0;c[f>>2]=c[a+60>>2];c[f+4>>2]=0;c[f+8>>2]=b;c[f+12>>2]=g;c[f+16>>2]=d;if((Yb(aa(140,f|0)|0)|0)<0){c[g>>2]=-1;h=-1}else h=c[g>>2]|0;l=e;return h|0}function Yb(a){a=a|0;var b=0;if(a>>>0>4294963200){c[(Zb()|0)>>2]=0-a;b=-1}else b=a;return b|0}function Zb(){return (_b()|0)+64|0}function _b(){return $b()|0}function $b(){return 32636}function ac(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;e=l;l=l+48|0;f=e+16|0;g=e;h=e+32|0;i=a+28|0;j=c[i>>2]|0;c[h>>2]=j;k=a+20|0;m=(c[k>>2]|0)-j|0;c[h+4>>2]=m;c[h+8>>2]=b;c[h+12>>2]=d;b=m+d|0;m=a+60|0;c[g>>2]=c[m>>2];c[g+4>>2]=h;c[g+8>>2]=2;j=Yb(fa(146,g|0)|0)|0;a:do if((b|0)!=(j|0)){g=2;n=b;o=h;p=j;while(1){if((p|0)<0)break;n=n-p|0;q=c[o+4>>2]|0;r=p>>>0>q>>>0;s=r?o+8|0:o;t=(r<<31>>31)+g|0;u=p-(r?q:0)|0;c[s>>2]=(c[s>>2]|0)+u;q=s+4|0;c[q>>2]=(c[q>>2]|0)-u;c[f>>2]=c[m>>2];c[f+4>>2]=s;c[f+8>>2]=t;p=Yb(fa(146,f|0)|0)|0;if((n|0)==(p|0)){v=3;break a}else{g=t;o=s}}c[a+16>>2]=0;c[i>>2]=0;c[k>>2]=0;c[a>>2]=c[a>>2]|32;if((g|0)==2)w=0;else w=d-(c[o+4>>2]|0)|0}else v=3;while(0);if((v|0)==3){v=c[a+44>>2]|0;c[a+16>>2]=v+(c[a+48>>2]|0);c[i>>2]=v;c[k>>2]=v;w=d}l=e;return w|0}function bc(a){a=a|0;return a|0}function cc(a){a=a|0;return 0}function dc(a){a=a|0;return}function ec(){Y(33448);return 33456}function fc(){da(33448);return}function gc(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0;do if(a){if((c[a+76>>2]|0)<=-1){b=hc(a)|0;break}d=(cc(a)|0)==0;e=hc(a)|0;if(d)b=e;else{dc(a);b=e}}else{if(!(c[8220]|0))f=0;else f=gc(c[8220]|0)|0;e=c[(ec()|0)>>2]|0;if(!e)g=f;else{d=e;e=f;while(1){if((c[d+76>>2]|0)>-1)h=cc(d)|0;else h=0;if((c[d+20>>2]|0)>>>0>(c[d+28>>2]|0)>>>0)i=hc(d)|0|e;else i=e;if(h|0)dc(d);d=c[d+56>>2]|0;if(!d){g=i;break}else e=i}}fc();b=g}while(0);return b|0}function hc(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0;b=a+20|0;d=a+28|0;if((c[b>>2]|0)>>>0>(c[d>>2]|0)>>>0?(ia[c[a+36>>2]&3](a,0,0)|0,(c[b>>2]|0)==0):0)e=-1;else{f=a+4|0;g=c[f>>2]|0;h=a+8|0;i=c[h>>2]|0;if(g>>>0<i>>>0)ia[c[a+40>>2]&3](a,g-i|0,1)|0;c[a+16>>2]=0;c[d>>2]=0;c[b>>2]=0;c[h>>2]=0;c[f>>2]=0;e=0}return e|0}function ic(){}function jc(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){y=b>>c;return a>>>c|(b&(1<<c)-1)<<32-c}y=(b|0)<0?-1:0;return b>>c-32|0}function kc(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=b-d>>>0;e=b-d-(c>>>0>a>>>0|0)>>>0;return (y=e,a-c>>>0|0)|0}function lc(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=a+c>>>0;return (y=b+d+(e>>>0<a>>>0|0)>>>0,e|0)|0}function mc(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;f=b+e|0;d=d&255;if((e|0)>=67){while(b&3){a[b>>0]=d;b=b+1|0}g=f&-4|0;h=g-64|0;i=d|d<<8|d<<16|d<<24;while((b|0)<=(h|0)){c[b>>2]=i;c[b+4>>2]=i;c[b+8>>2]=i;c[b+12>>2]=i;c[b+16>>2]=i;c[b+20>>2]=i;c[b+24>>2]=i;c[b+28>>2]=i;c[b+32>>2]=i;c[b+36>>2]=i;c[b+40>>2]=i;c[b+44>>2]=i;c[b+48>>2]=i;c[b+52>>2]=i;c[b+56>>2]=i;c[b+60>>2]=i;b=b+64|0}while((b|0)<(g|0)){c[b>>2]=i;b=b+4|0}}while((b|0)<(f|0)){a[b>>0]=d;b=b+1|0}return f-e|0}function nc(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){y=b>>>c;return a>>>c|(b&(1<<c)-1)<<32-c}y=0;return b>>>c-32|0}function oc(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){y=b<<c|(a&(1<<c)-1<<32-c)>>>32-c;return a<<c}y=a<<c-32;return 0}function pc(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;c=a&65535;d=b&65535;e=N(d,c)|0;f=a>>>16;a=(e>>>16)+(N(d,f)|0)|0;d=b>>>16;b=N(d,c)|0;return (y=(a>>>16)+(N(d,f)|0)+(((a&65535)+b|0)>>>16)|0,a+b<<16|e&65535|0)|0}function qc(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;e=a;a=c;c=pc(e,a)|0;f=y;return (y=(N(b,a)|0)+(N(d,e)|0)+f|f&0,c|0|0)|0}function rc(a){a=a|0;var b=0,d=0;a=a+15&-16|0;b=c[i>>2]|0;d=b+a|0;if((a|0)>0&(d|0)<(b|0)|(d|0)<0){V()|0;_(12);return -1}c[i>>2]=d;if((d|0)>(U()|0)?(T()|0)==0:0){c[i>>2]=b;_(12);return -1}return b|0}function sc(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;if((e|0)>=8192)return ba(b|0,d|0,e|0)|0;f=b|0;g=b+e|0;if((b&3)==(d&3)){while(b&3){if(!e)return f|0;a[b>>0]=a[d>>0]|0;b=b+1|0;d=d+1|0;e=e-1|0}h=g&-4|0;e=h-64|0;while((b|0)<=(e|0)){c[b>>2]=c[d>>2];c[b+4>>2]=c[d+4>>2];c[b+8>>2]=c[d+8>>2];c[b+12>>2]=c[d+12>>2];c[b+16>>2]=c[d+16>>2];c[b+20>>2]=c[d+20>>2];c[b+24>>2]=c[d+24>>2];c[b+28>>2]=c[d+28>>2];c[b+32>>2]=c[d+32>>2];c[b+36>>2]=c[d+36>>2];c[b+40>>2]=c[d+40>>2];c[b+44>>2]=c[d+44>>2];c[b+48>>2]=c[d+48>>2];c[b+52>>2]=c[d+52>>2];c[b+56>>2]=c[d+56>>2];c[b+60>>2]=c[d+60>>2];b=b+64|0;d=d+64|0}while((b|0)<(h|0)){c[b>>2]=c[d>>2];b=b+4|0;d=d+4|0}}else{h=g-4|0;while((b|0)<(h|0)){a[b>>0]=a[d>>0]|0;a[b+1>>0]=a[d+1>>0]|0;a[b+2>>0]=a[d+2>>0]|0;a[b+3>>0]=a[d+3>>0]|0;b=b+4|0;d=d+4|0}}while((b|0)<(g|0)){a[b>>0]=a[d>>0]|0;b=b+1|0;d=d+1|0}return f|0}function tc(b,c,d){b=b|0;c=c|0;d=d|0;var e=0;if((c|0)<(b|0)&(b|0)<(c+d|0)){e=b;c=c+d|0;b=b+d|0;while((d|0)>0){b=b-1|0;c=c-1|0;d=d-1|0;a[b>>0]=a[c>>0]|0}b=e}else sc(b,c,d)|0;return b|0}function uc(a,b){a=a|0;b=b|0;return ha[a&1](b|0)|0}function vc(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return ia[a&3](b|0,c|0,d|0)|0}function wc(a){a=a|0;R(0);return 0}function xc(a,b,c){a=a|0;b=b|0;c=c|0;R(1);return 0}

// EMSCRIPTEN_END_FUNCS
var ha=[wc,Vb];var ia=[xc,Wb,Xb,ac];return{stackSave:ka,getTempRet0:pa,setThrew:na,_bitshift64Lshr:nc,_i64Subtract:kc,_bitshift64Shl:oc,_curve25519_verify:sa,_fflush:gc,_bitshift64Ashr:jc,_memset:mc,_sbrk:rc,_memcpy:sc,stackAlloc:ja,___muldi3:qc,_crypto_sign_ed25519_ref10_ge_scalarmult_base:vb,_curve25519_sign:ra,setTempRet0:oa,_i64Add:lc,dynCall_iiii:vc,dynCall_ii:uc,_emscripten_get_global_libc:Ub,_free:Tb,___errno_location:Zb,_curve25519_donna:va,runPostSets:ic,establishStackSpace:ma,_memmove:tc,_sph_sha512_init:Jb,stackRestore:la,_malloc:Sb}})


// EMSCRIPTEN_END_ASM
(Module.asmGlobalArg,Module.asmLibraryArg,buffer);var stackSave=Module["stackSave"]=asm["stackSave"];var _curve25519_sign=Module["_curve25519_sign"]=asm["_curve25519_sign"];var getTempRet0=Module["getTempRet0"]=asm["getTempRet0"];var _bitshift64Lshr=Module["_bitshift64Lshr"]=asm["_bitshift64Lshr"];var _i64Subtract=Module["_i64Subtract"]=asm["_i64Subtract"];var _bitshift64Shl=Module["_bitshift64Shl"]=asm["_bitshift64Shl"];var _curve25519_verify=Module["_curve25519_verify"]=asm["_curve25519_verify"];var _fflush=Module["_fflush"]=asm["_fflush"];var _bitshift64Ashr=Module["_bitshift64Ashr"]=asm["_bitshift64Ashr"];var _memset=Module["_memset"]=asm["_memset"];var _sbrk=Module["_sbrk"]=asm["_sbrk"];var _memcpy=Module["_memcpy"]=asm["_memcpy"];var stackAlloc=Module["stackAlloc"]=asm["stackAlloc"];var ___muldi3=Module["___muldi3"]=asm["___muldi3"];var _crypto_sign_ed25519_ref10_ge_scalarmult_base=Module["_crypto_sign_ed25519_ref10_ge_scalarmult_base"]=asm["_crypto_sign_ed25519_ref10_ge_scalarmult_base"];var _curve25519_donna=Module["_curve25519_donna"]=asm["_curve25519_donna"];var setTempRet0=Module["setTempRet0"]=asm["setTempRet0"];var _i64Add=Module["_i64Add"]=asm["_i64Add"];var _emscripten_get_global_libc=Module["_emscripten_get_global_libc"]=asm["_emscripten_get_global_libc"];var ___errno_location=Module["___errno_location"]=asm["___errno_location"];var _free=Module["_free"]=asm["_free"];var runPostSets=Module["runPostSets"]=asm["runPostSets"];var setThrew=Module["setThrew"]=asm["setThrew"];var establishStackSpace=Module["establishStackSpace"]=asm["establishStackSpace"];var _memmove=Module["_memmove"]=asm["_memmove"];var _sph_sha512_init=Module["_sph_sha512_init"]=asm["_sph_sha512_init"];var stackRestore=Module["stackRestore"]=asm["stackRestore"];var _malloc=Module["_malloc"]=asm["_malloc"];var dynCall_ii=Module["dynCall_ii"]=asm["dynCall_ii"];var dynCall_iiii=Module["dynCall_iiii"]=asm["dynCall_iiii"];Runtime.stackAlloc=Module["stackAlloc"];Runtime.stackSave=Module["stackSave"];Runtime.stackRestore=Module["stackRestore"];Runtime.establishStackSpace=Module["establishStackSpace"];Runtime.setTempRet0=Module["setTempRet0"];Runtime.getTempRet0=Module["getTempRet0"];Module["asm"]=asm;function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}ExitStatus.prototype=new Error;ExitStatus.prototype.constructor=ExitStatus;var initialStackTop;var preloadStartTime=null;var calledMain=false;dependenciesFulfilled=function runCaller(){if(!Module["calledRun"])run();if(!Module["calledRun"])dependenciesFulfilled=runCaller};Module["callMain"]=Module.callMain=function callMain(args){args=args||[];ensureInitRuntime();var argc=args.length+1;function pad(){for(var i=0;i<4-1;i++){argv.push(0)}}var argv=[allocate(intArrayFromString(Module["thisProgram"]),"i8",ALLOC_NORMAL)];pad();for(var i=0;i<argc-1;i=i+1){argv.push(allocate(intArrayFromString(args[i]),"i8",ALLOC_NORMAL));pad()}argv.push(0);argv=allocate(argv,"i32",ALLOC_NORMAL);try{var ret=Module["_main"](argc,argv,0);exit(ret,true)}catch(e){if(e instanceof ExitStatus){return}else if(e=="SimulateInfiniteLoop"){Module["noExitRuntime"]=true;return}else{var toLog=e;if(e&&typeof e==="object"&&e.stack){toLog=[e,e.stack]}Module.printErr("exception thrown: "+toLog);Module["quit"](1,e)}}finally{calledMain=true}};function run(args){args=args||Module["arguments"];if(preloadStartTime===null)preloadStartTime=Date.now();if(runDependencies>0){return}preRun();if(runDependencies>0)return;if(Module["calledRun"])return;function doRun(){if(Module["calledRun"])return;Module["calledRun"]=true;if(ABORT)return;ensureInitRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(Module["_main"]&&shouldRunNow)Module["callMain"](args);postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout((function(){setTimeout((function(){Module["setStatus"]("")}),1);doRun()}),1)}else{doRun()}}Module["run"]=Module.run=run;function exit(status,implicit){if(implicit&&Module["noExitRuntime"]){return}if(Module["noExitRuntime"]){}else{ABORT=true;EXITSTATUS=status;STACKTOP=initialStackTop;exitRuntime();if(Module["onExit"])Module["onExit"](status)}if(ENVIRONMENT_IS_NODE){process["exit"](status)}Module["quit"](status,new ExitStatus(status))}Module["exit"]=Module.exit=exit;var abortDecorators=[];function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}if(what!==undefined){Module.print(what);Module.printErr(what);what=JSON.stringify(what)}else{what=""}ABORT=true;EXITSTATUS=1;var extra="\nIf this abort() is unexpected, build with -s ASSERTIONS=1 which can give more information.";var output="abort("+what+") at "+stackTrace()+extra;if(abortDecorators){abortDecorators.forEach((function(decorator){output=decorator(output,what)}))}throw output}Module["abort"]=Module.abort=abort;if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"]){shouldRunNow=false}run()





/* vim: ts=4:sw=4:expandtab */
var Internal = Internal || {};

(function() {
    'use strict';

    // Insert some bytes into the emscripten memory and return a pointer
    function _allocate(bytes) {
        var address = Module._malloc(bytes.length);
        Module.HEAPU8.set(bytes, address);

        return address;
    }

    function _readBytes(address, length, array) {
        array.set(Module.HEAPU8.subarray(address, address + length));
    }

    var basepoint = new Uint8Array(32);
    basepoint[0] = 9;

    Internal.curve25519 = {
        keyPair: function(privKey) {
            var priv = new Uint8Array(privKey);
            priv[0]  &= 248;
            priv[31] &= 127;
            priv[31] |= 64;

            // Where to store the result
            var publicKey_ptr = Module._malloc(32);

            // Get a pointer to the private key
            var privateKey_ptr = _allocate(priv);

            // The basepoint for generating public keys
            var basepoint_ptr = _allocate(basepoint);

            // The return value is just 0, the operation is done in place
            var err = Module._curve25519_donna(publicKey_ptr,
                                            privateKey_ptr,
                                            basepoint_ptr);

            var res = new Uint8Array(32);
            _readBytes(publicKey_ptr, 32, res);

            Module._free(publicKey_ptr);
            Module._free(privateKey_ptr);
            Module._free(basepoint_ptr);

            return { pubKey: res.buffer, privKey: priv.buffer };
        },
        sharedSecret: function(pubKey, privKey) {
            // Where to store the result
            var sharedKey_ptr = Module._malloc(32);

            // Get a pointer to our private key
            var privateKey_ptr = _allocate(new Uint8Array(privKey));

            // Get a pointer to their public key, the basepoint when you're
            // generating a shared secret
            var basepoint_ptr = _allocate(new Uint8Array(pubKey));

            // Return value is 0 here too of course
            var err = Module._curve25519_donna(sharedKey_ptr,
                                               privateKey_ptr,
                                               basepoint_ptr);

            var res = new Uint8Array(32);
            _readBytes(sharedKey_ptr, 32, res);

            Module._free(sharedKey_ptr);
            Module._free(privateKey_ptr);
            Module._free(basepoint_ptr);

            return res.buffer;
        },
        sign: function(privKey, message) {
            // Where to store the result
            var signature_ptr = Module._malloc(64);

            // Get a pointer to our private key
            var privateKey_ptr = _allocate(new Uint8Array(privKey));

            // Get a pointer to the message
            var message_ptr = _allocate(new Uint8Array(message));

            var err = Module._curve25519_sign(signature_ptr,
                                              privateKey_ptr,
                                              message_ptr,
                                              message.byteLength);

            var res = new Uint8Array(64);
            _readBytes(signature_ptr, 64, res);

            Module._free(signature_ptr);
            Module._free(privateKey_ptr);
            Module._free(message_ptr);

            return res.buffer;
        },
        verify: function(pubKey, message, sig) {
            // Get a pointer to their public key
            var publicKey_ptr = _allocate(new Uint8Array(pubKey));

            // Get a pointer to the signature
            var signature_ptr = _allocate(new Uint8Array(sig));

            // Get a pointer to the message
            var message_ptr = _allocate(new Uint8Array(message));

            var res = Module._curve25519_verify(signature_ptr,
                                                publicKey_ptr,
                                                message_ptr,
                                                message.byteLength);

            Module._free(publicKey_ptr);
            Module._free(signature_ptr);
            Module._free(message_ptr);

            return res !== 0;
        }
    };

    Internal.curve25519_async = {
        keyPair: function(privKey) {
            return new Promise(function(resolve) {
                resolve(Internal.curve25519.keyPair(privKey));
            });
        },
        sharedSecret: function(pubKey, privKey) {
            return new Promise(function(resolve) {
                resolve(Internal.curve25519.sharedSecret(pubKey, privKey));
            });
        },
        sign: function(privKey, message) {
            return new Promise(function(resolve) {
                resolve(Internal.curve25519.sign(privKey, message));
            });
        },
        verify: function(pubKey, message, sig) {
            return new Promise(function(resolve, reject) {
                if (Internal.curve25519.verify(pubKey, message, sig)) {
                    reject(new Error("Invalid signature"));
                } else {
                    resolve();
                }
            });
        },
    };

})();

;(function() {

'use strict';

// I am the...workee?
var origCurve25519 = Internal.curve25519_async;

Internal.startWorker = function(url) {
    Internal.stopWorker(); // there can be only one
    Internal.curve25519_async = new Curve25519Worker(url);
};

Internal.stopWorker = function() {
    if (Internal.curve25519_async instanceof Curve25519Worker) {
        var worker = Internal.curve25519_async.worker;
        Internal.curve25519_async = origCurve25519;
        worker.terminate();
    }
};

libsignal.worker = {
  startWorker: Internal.startWorker,
  stopWorker: Internal.stopWorker,
};

function Curve25519Worker(url) {
    this.jobs = {};
    this.jobId = 0;
    this.worker = new Worker(url);
    this.worker.onmessage = function(e) {
        var job = this.jobs[e.data.id];
        if (e.data.error && typeof job.onerror === 'function') {
            job.onerror(new Error(e.data.error));
        } else if (typeof job.onsuccess === 'function') {
            job.onsuccess(e.data.result);
        }
        delete this.jobs[e.data.id];
    }.bind(this);
}

Curve25519Worker.prototype = {
    constructor: Curve25519Worker,
    postMessage: function(methodName, args, onsuccess, onerror) {
        return new Promise(function(resolve, reject) {
          this.jobs[this.jobId] = { onsuccess: resolve, onerror: reject };
          this.worker.postMessage({ id: this.jobId, methodName: methodName, args: args });
          this.jobId++;
        }.bind(this));
    },
    keyPair: function(privKey) {
        return this.postMessage('keyPair', [privKey]);
    },
    sharedSecret: function(pubKey, privKey) {
        return this.postMessage('sharedSecret', [pubKey, privKey]);
    },
    sign: function(privKey, message) {
        return this.postMessage('sign', [privKey, message]);
    },
    verify: function(pubKey, message, sig) {
        return this.postMessage('verify', [pubKey, message, sig]);
    }
};

})();

/*
 Copyright 2013 Daniel Wirtz <dcode@dcode.io>
 Copyright 2009 The Closure Library Authors. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS-IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

/**
 * @license long.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
 * Released under the Apache License, Version 2.0
 * see: https://github.com/dcodeIO/long.js for details
 */
(function(global, factory) {

    /* AMD */ if (typeof define === 'function' && define["amd"])
        define([], factory);
    /* CommonJS */ else if (typeof require === 'function' && typeof module === "object" && module && module["exports"])
        module["exports"] = factory();
    /* Global */ else
        (global["dcodeIO"] = global["dcodeIO"] || {})["Long"] = factory();

})(this, function() {
    "use strict";

    /**
     * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as *signed* integers.
     *  See the from* functions below for more convenient ways of constructing Longs.
     * @exports Long
     * @class A Long class for representing a 64 bit two's-complement integer value.
     * @param {number} low The low (signed) 32 bits of the long
     * @param {number} high The high (signed) 32 bits of the long
     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @constructor
     */
    function Long(low, high, unsigned) {

        /**
         * The low 32 bits as a signed value.
         * @type {number}
         */
        this.low = low | 0;

        /**
         * The high 32 bits as a signed value.
         * @type {number}
         */
        this.high = high | 0;

        /**
         * Whether unsigned or not.
         * @type {boolean}
         */
        this.unsigned = !!unsigned;
    }

    // The internal representation of a long is the two given signed, 32-bit values.
    // We use 32-bit pieces because these are the size of integers on which
    // Javascript performs bit-operations.  For operations like addition and
    // multiplication, we split each number into 16 bit pieces, which can easily be
    // multiplied within Javascript's floating-point representation without overflow
    // or change in sign.
    //
    // In the algorithms below, we frequently reduce the negative case to the
    // positive case by negating the input(s) and then post-processing the result.
    // Note that we must ALWAYS check specially whether those values are MIN_VALUE
    // (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
    // a positive number, it overflows back into a negative).  Not handling this
    // case would often result in infinite recursion.
    //
    // Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the from*
    // methods on which they depend.

    /**
     * An indicator used to reliably determine if an object is a Long or not.
     * @type {boolean}
     * @const
     * @private
     */
    Long.prototype.__isLong__;

    Object.defineProperty(Long.prototype, "__isLong__", {
        value: true,
        enumerable: false,
        configurable: false
    });

    /**
     * @function
     * @param {*} obj Object
     * @returns {boolean}
     * @inner
     */
    function isLong(obj) {
        return (obj && obj["__isLong__"]) === true;
    }

    /**
     * Tests if the specified object is a Long.
     * @function
     * @param {*} obj Object
     * @returns {boolean}
     */
    Long.isLong = isLong;

    /**
     * A cache of the Long representations of small integer values.
     * @type {!Object}
     * @inner
     */
    var INT_CACHE = {};

    /**
     * A cache of the Long representations of small unsigned integer values.
     * @type {!Object}
     * @inner
     */
    var UINT_CACHE = {};

    /**
     * @param {number} value
     * @param {boolean=} unsigned
     * @returns {!Long}
     * @inner
     */
    function fromInt(value, unsigned) {
        var obj, cachedObj, cache;
        if (unsigned) {
            value >>>= 0;
            if (cache = (0 <= value && value < 256)) {
                cachedObj = UINT_CACHE[value];
                if (cachedObj)
                    return cachedObj;
            }
            obj = fromBits(value, (value | 0) < 0 ? -1 : 0, true);
            if (cache)
                UINT_CACHE[value] = obj;
            return obj;
        } else {
            value |= 0;
            if (cache = (-128 <= value && value < 128)) {
                cachedObj = INT_CACHE[value];
                if (cachedObj)
                    return cachedObj;
            }
            obj = fromBits(value, value < 0 ? -1 : 0, false);
            if (cache)
                INT_CACHE[value] = obj;
            return obj;
        }
    }

    /**
     * Returns a Long representing the given 32 bit integer value.
     * @function
     * @param {number} value The 32 bit integer in question
     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @returns {!Long} The corresponding Long value
     */
    Long.fromInt = fromInt;

    /**
     * @param {number} value
     * @param {boolean=} unsigned
     * @returns {!Long}
     * @inner
     */
    function fromNumber(value, unsigned) {
        if (isNaN(value) || !isFinite(value))
            return unsigned ? UZERO : ZERO;
        if (unsigned) {
            if (value < 0)
                return UZERO;
            if (value >= TWO_PWR_64_DBL)
                return MAX_UNSIGNED_VALUE;
        } else {
            if (value <= -TWO_PWR_63_DBL)
                return MIN_VALUE;
            if (value + 1 >= TWO_PWR_63_DBL)
                return MAX_VALUE;
        }
        if (value < 0)
            return fromNumber(-value, unsigned).neg();
        return fromBits((value % TWO_PWR_32_DBL) | 0, (value / TWO_PWR_32_DBL) | 0, unsigned);
    }

    /**
     * Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.
     * @function
     * @param {number} value The number in question
     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @returns {!Long} The corresponding Long value
     */
    Long.fromNumber = fromNumber;

    /**
     * @param {number} lowBits
     * @param {number} highBits
     * @param {boolean=} unsigned
     * @returns {!Long}
     * @inner
     */
    function fromBits(lowBits, highBits, unsigned) {
        return new Long(lowBits, highBits, unsigned);
    }

    /**
     * Returns a Long representing the 64 bit integer that comes by concatenating the given low and high bits. Each is
     *  assumed to use 32 bits.
     * @function
     * @param {number} lowBits The low 32 bits
     * @param {number} highBits The high 32 bits
     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @returns {!Long} The corresponding Long value
     */
    Long.fromBits = fromBits;

    /**
     * @function
     * @param {number} base
     * @param {number} exponent
     * @returns {number}
     * @inner
     */
    var pow_dbl = Math.pow; // Used 4 times (4*8 to 15+4)

    /**
     * @param {string} str
     * @param {(boolean|number)=} unsigned
     * @param {number=} radix
     * @returns {!Long}
     * @inner
     */
    function fromString(str, unsigned, radix) {
        if (str.length === 0)
            throw Error('empty string');
        if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
            return ZERO;
        if (typeof unsigned === 'number') {
            // For goog.math.long compatibility
            radix = unsigned,
            unsigned = false;
        } else {
            unsigned = !! unsigned;
        }
        radix = radix || 10;
        if (radix < 2 || 36 < radix)
            throw RangeError('radix');

        var p;
        if ((p = str.indexOf('-')) > 0)
            throw Error('interior hyphen');
        else if (p === 0) {
            return fromString(str.substring(1), unsigned, radix).neg();
        }

        // Do several (8) digits each time through the loop, so as to
        // minimize the calls to the very expensive emulated div.
        var radixToPower = fromNumber(pow_dbl(radix, 8));

        var result = ZERO;
        for (var i = 0; i < str.length; i += 8) {
            var size = Math.min(8, str.length - i),
                value = parseInt(str.substring(i, i + size), radix);
            if (size < 8) {
                var power = fromNumber(pow_dbl(radix, size));
                result = result.mul(power).add(fromNumber(value));
            } else {
                result = result.mul(radixToPower);
                result = result.add(fromNumber(value));
            }
        }
        result.unsigned = unsigned;
        return result;
    }

    /**
     * Returns a Long representation of the given string, written using the specified radix.
     * @function
     * @param {string} str The textual representation of the Long
     * @param {(boolean|number)=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @param {number=} radix The radix in which the text is written (2-36), defaults to 10
     * @returns {!Long} The corresponding Long value
     */
    Long.fromString = fromString;

    /**
     * @function
     * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val
     * @returns {!Long}
     * @inner
     */
    function fromValue(val) {
        if (val /* is compatible */ instanceof Long)
            return val;
        if (typeof val === 'number')
            return fromNumber(val);
        if (typeof val === 'string')
            return fromString(val);
        // Throws for non-objects, converts non-instanceof Long:
        return fromBits(val.low, val.high, val.unsigned);
    }

    /**
     * Converts the specified value to a Long.
     * @function
     * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val Value
     * @returns {!Long}
     */
    Long.fromValue = fromValue;

    // NOTE: the compiler should inline these constant values below and then remove these variables, so there should be
    // no runtime penalty for these.

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_16_DBL = 1 << 16;

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_24_DBL = 1 << 24;

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;

    /**
     * @type {!Long}
     * @const
     * @inner
     */
    var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);

    /**
     * @type {!Long}
     * @inner
     */
    var ZERO = fromInt(0);

    /**
     * Signed zero.
     * @type {!Long}
     */
    Long.ZERO = ZERO;

    /**
     * @type {!Long}
     * @inner
     */
    var UZERO = fromInt(0, true);

    /**
     * Unsigned zero.
     * @type {!Long}
     */
    Long.UZERO = UZERO;

    /**
     * @type {!Long}
     * @inner
     */
    var ONE = fromInt(1);

    /**
     * Signed one.
     * @type {!Long}
     */
    Long.ONE = ONE;

    /**
     * @type {!Long}
     * @inner
     */
    var UONE = fromInt(1, true);

    /**
     * Unsigned one.
     * @type {!Long}
     */
    Long.UONE = UONE;

    /**
     * @type {!Long}
     * @inner
     */
    var NEG_ONE = fromInt(-1);

    /**
     * Signed negative one.
     * @type {!Long}
     */
    Long.NEG_ONE = NEG_ONE;

    /**
     * @type {!Long}
     * @inner
     */
    var MAX_VALUE = fromBits(0xFFFFFFFF|0, 0x7FFFFFFF|0, false);

    /**
     * Maximum signed value.
     * @type {!Long}
     */
    Long.MAX_VALUE = MAX_VALUE;

    /**
     * @type {!Long}
     * @inner
     */
    var MAX_UNSIGNED_VALUE = fromBits(0xFFFFFFFF|0, 0xFFFFFFFF|0, true);

    /**
     * Maximum unsigned value.
     * @type {!Long}
     */
    Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;

    /**
     * @type {!Long}
     * @inner
     */
    var MIN_VALUE = fromBits(0, 0x80000000|0, false);

    /**
     * Minimum signed value.
     * @type {!Long}
     */
    Long.MIN_VALUE = MIN_VALUE;

    /**
     * @alias Long.prototype
     * @inner
     */
    var LongPrototype = Long.prototype;

    /**
     * Converts the Long to a 32 bit integer, assuming it is a 32 bit integer.
     * @returns {number}
     */
    LongPrototype.toInt = function toInt() {
        return this.unsigned ? this.low >>> 0 : this.low;
    };

    /**
     * Converts the Long to a the nearest floating-point representation of this value (double, 53 bit mantissa).
     * @returns {number}
     */
    LongPrototype.toNumber = function toNumber() {
        if (this.unsigned)
            return ((this.high >>> 0) * TWO_PWR_32_DBL) + (this.low >>> 0);
        return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
    };

    /**
     * Converts the Long to a string written in the specified radix.
     * @param {number=} radix Radix (2-36), defaults to 10
     * @returns {string}
     * @override
     * @throws {RangeError} If `radix` is out of range
     */
    LongPrototype.toString = function toString(radix) {
        radix = radix || 10;
        if (radix < 2 || 36 < radix)
            throw RangeError('radix');
        if (this.isZero())
            return '0';
        if (this.isNegative()) { // Unsigned Longs are never negative
            if (this.eq(MIN_VALUE)) {
                // We need to change the Long value before it can be negated, so we remove
                // the bottom-most digit in this base and then recurse to do the rest.
                var radixLong = fromNumber(radix),
                    div = this.div(radixLong),
                    rem1 = div.mul(radixLong).sub(this);
                return div.toString(radix) + rem1.toInt().toString(radix);
            } else
                return '-' + this.neg().toString(radix);
        }

        // Do several (6) digits each time through the loop, so as to
        // minimize the calls to the very expensive emulated div.
        var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned),
            rem = this;
        var result = '';
        while (true) {
            var remDiv = rem.div(radixToPower),
                intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0,
                digits = intval.toString(radix);
            rem = remDiv;
            if (rem.isZero())
                return digits + result;
            else {
                while (digits.length < 6)
                    digits = '0' + digits;
                result = '' + digits + result;
            }
        }
    };

    /**
     * Gets the high 32 bits as a signed integer.
     * @returns {number} Signed high bits
     */
    LongPrototype.getHighBits = function getHighBits() {
        return this.high;
    };

    /**
     * Gets the high 32 bits as an unsigned integer.
     * @returns {number} Unsigned high bits
     */
    LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
        return this.high >>> 0;
    };

    /**
     * Gets the low 32 bits as a signed integer.
     * @returns {number} Signed low bits
     */
    LongPrototype.getLowBits = function getLowBits() {
        return this.low;
    };

    /**
     * Gets the low 32 bits as an unsigned integer.
     * @returns {number} Unsigned low bits
     */
    LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
        return this.low >>> 0;
    };

    /**
     * Gets the number of bits needed to represent the absolute value of this Long.
     * @returns {number}
     */
    LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
        if (this.isNegative()) // Unsigned Longs are never negative
            return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
        var val = this.high != 0 ? this.high : this.low;
        for (var bit = 31; bit > 0; bit--)
            if ((val & (1 << bit)) != 0)
                break;
        return this.high != 0 ? bit + 33 : bit + 1;
    };

    /**
     * Tests if this Long's value equals zero.
     * @returns {boolean}
     */
    LongPrototype.isZero = function isZero() {
        return this.high === 0 && this.low === 0;
    };

    /**
     * Tests if this Long's value is negative.
     * @returns {boolean}
     */
    LongPrototype.isNegative = function isNegative() {
        return !this.unsigned && this.high < 0;
    };

    /**
     * Tests if this Long's value is positive.
     * @returns {boolean}
     */
    LongPrototype.isPositive = function isPositive() {
        return this.unsigned || this.high >= 0;
    };

    /**
     * Tests if this Long's value is odd.
     * @returns {boolean}
     */
    LongPrototype.isOdd = function isOdd() {
        return (this.low & 1) === 1;
    };

    /**
     * Tests if this Long's value is even.
     * @returns {boolean}
     */
    LongPrototype.isEven = function isEven() {
        return (this.low & 1) === 0;
    };

    /**
     * Tests if this Long's value equals the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.equals = function equals(other) {
        if (!isLong(other))
            other = fromValue(other);
        if (this.unsigned !== other.unsigned && (this.high >>> 31) === 1 && (other.high >>> 31) === 1)
            return false;
        return this.high === other.high && this.low === other.low;
    };

    /**
     * Tests if this Long's value equals the specified's. This is an alias of {@link Long#equals}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.eq = LongPrototype.equals;

    /**
     * Tests if this Long's value differs from the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.notEquals = function notEquals(other) {
        return !this.eq(/* validates */ other);
    };

    /**
     * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.neq = LongPrototype.notEquals;

    /**
     * Tests if this Long's value is less than the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.lessThan = function lessThan(other) {
        return this.comp(/* validates */ other) < 0;
    };

    /**
     * Tests if this Long's value is less than the specified's. This is an alias of {@link Long#lessThan}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.lt = LongPrototype.lessThan;

    /**
     * Tests if this Long's value is less than or equal the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
        return this.comp(/* validates */ other) <= 0;
    };

    /**
     * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.lte = LongPrototype.lessThanOrEqual;

    /**
     * Tests if this Long's value is greater than the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.greaterThan = function greaterThan(other) {
        return this.comp(/* validates */ other) > 0;
    };

    /**
     * Tests if this Long's value is greater than the specified's. This is an alias of {@link Long#greaterThan}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.gt = LongPrototype.greaterThan;

    /**
     * Tests if this Long's value is greater than or equal the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
        return this.comp(/* validates */ other) >= 0;
    };

    /**
     * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     */
    LongPrototype.gte = LongPrototype.greaterThanOrEqual;

    /**
     * Compares this Long's value with the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {number} 0 if they are the same, 1 if the this is greater and -1
     *  if the given one is greater
     */
    LongPrototype.compare = function compare(other) {
        if (!isLong(other))
            other = fromValue(other);
        if (this.eq(other))
            return 0;
        var thisNeg = this.isNegative(),
            otherNeg = other.isNegative();
        if (thisNeg && !otherNeg)
            return -1;
        if (!thisNeg && otherNeg)
            return 1;
        // At this point the sign bits are the same
        if (!this.unsigned)
            return this.sub(other).isNegative() ? -1 : 1;
        // Both are positive if at least one is unsigned
        return (other.high >>> 0) > (this.high >>> 0) || (other.high === this.high && (other.low >>> 0) > (this.low >>> 0)) ? -1 : 1;
    };

    /**
     * Compares this Long's value with the specified's. This is an alias of {@link Long#compare}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {number} 0 if they are the same, 1 if the this is greater and -1
     *  if the given one is greater
     */
    LongPrototype.comp = LongPrototype.compare;

    /**
     * Negates this Long's value.
     * @returns {!Long} Negated Long
     */
    LongPrototype.negate = function negate() {
        if (!this.unsigned && this.eq(MIN_VALUE))
            return MIN_VALUE;
        return this.not().add(ONE);
    };

    /**
     * Negates this Long's value. This is an alias of {@link Long#negate}.
     * @function
     * @returns {!Long} Negated Long
     */
    LongPrototype.neg = LongPrototype.negate;

    /**
     * Returns the sum of this and the specified Long.
     * @param {!Long|number|string} addend Addend
     * @returns {!Long} Sum
     */
    LongPrototype.add = function add(addend) {
        if (!isLong(addend))
            addend = fromValue(addend);

        // Divide each number into 4 chunks of 16 bits, and then sum the chunks.

        var a48 = this.high >>> 16;
        var a32 = this.high & 0xFFFF;
        var a16 = this.low >>> 16;
        var a00 = this.low & 0xFFFF;

        var b48 = addend.high >>> 16;
        var b32 = addend.high & 0xFFFF;
        var b16 = addend.low >>> 16;
        var b00 = addend.low & 0xFFFF;

        var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
        c00 += a00 + b00;
        c16 += c00 >>> 16;
        c00 &= 0xFFFF;
        c16 += a16 + b16;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c32 += a32 + b32;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c48 += a48 + b48;
        c48 &= 0xFFFF;
        return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
    };

    /**
     * Returns the difference of this and the specified Long.
     * @param {!Long|number|string} subtrahend Subtrahend
     * @returns {!Long} Difference
     */
    LongPrototype.subtract = function subtract(subtrahend) {
        if (!isLong(subtrahend))
            subtrahend = fromValue(subtrahend);
        return this.add(subtrahend.neg());
    };

    /**
     * Returns the difference of this and the specified Long. This is an alias of {@link Long#subtract}.
     * @function
     * @param {!Long|number|string} subtrahend Subtrahend
     * @returns {!Long} Difference
     */
    LongPrototype.sub = LongPrototype.subtract;

    /**
     * Returns the product of this and the specified Long.
     * @param {!Long|number|string} multiplier Multiplier
     * @returns {!Long} Product
     */
    LongPrototype.multiply = function multiply(multiplier) {
        if (this.isZero())
            return ZERO;
        if (!isLong(multiplier))
            multiplier = fromValue(multiplier);
        if (multiplier.isZero())
            return ZERO;
        if (this.eq(MIN_VALUE))
            return multiplier.isOdd() ? MIN_VALUE : ZERO;
        if (multiplier.eq(MIN_VALUE))
            return this.isOdd() ? MIN_VALUE : ZERO;

        if (this.isNegative()) {
            if (multiplier.isNegative())
                return this.neg().mul(multiplier.neg());
            else
                return this.neg().mul(multiplier).neg();
        } else if (multiplier.isNegative())
            return this.mul(multiplier.neg()).neg();

        // If both longs are small, use float multiplication
        if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
            return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);

        // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
        // We can skip products that would overflow.

        var a48 = this.high >>> 16;
        var a32 = this.high & 0xFFFF;
        var a16 = this.low >>> 16;
        var a00 = this.low & 0xFFFF;

        var b48 = multiplier.high >>> 16;
        var b32 = multiplier.high & 0xFFFF;
        var b16 = multiplier.low >>> 16;
        var b00 = multiplier.low & 0xFFFF;

        var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
        c00 += a00 * b00;
        c16 += c00 >>> 16;
        c00 &= 0xFFFF;
        c16 += a16 * b00;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c16 += a00 * b16;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c32 += a32 * b00;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c32 += a16 * b16;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c32 += a00 * b32;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
        c48 &= 0xFFFF;
        return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
    };

    /**
     * Returns the product of this and the specified Long. This is an alias of {@link Long#multiply}.
     * @function
     * @param {!Long|number|string} multiplier Multiplier
     * @returns {!Long} Product
     */
    LongPrototype.mul = LongPrototype.multiply;

    /**
     * Returns this Long divided by the specified. The result is signed if this Long is signed or
     *  unsigned if this Long is unsigned.
     * @param {!Long|number|string} divisor Divisor
     * @returns {!Long} Quotient
     */
    LongPrototype.divide = function divide(divisor) {
        if (!isLong(divisor))
            divisor = fromValue(divisor);
        if (divisor.isZero())
            throw Error('division by zero');
        if (this.isZero())
            return this.unsigned ? UZERO : ZERO;
        var approx, rem, res;
        if (!this.unsigned) {
            // This section is only relevant for signed longs and is derived from the
            // closure library as a whole.
            if (this.eq(MIN_VALUE)) {
                if (divisor.eq(ONE) || divisor.eq(NEG_ONE))
                    return MIN_VALUE;  // recall that -MIN_VALUE == MIN_VALUE
                else if (divisor.eq(MIN_VALUE))
                    return ONE;
                else {
                    // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
                    var halfThis = this.shr(1);
                    approx = halfThis.div(divisor).shl(1);
                    if (approx.eq(ZERO)) {
                        return divisor.isNegative() ? ONE : NEG_ONE;
                    } else {
                        rem = this.sub(divisor.mul(approx));
                        res = approx.add(rem.div(divisor));
                        return res;
                    }
                }
            } else if (divisor.eq(MIN_VALUE))
                return this.unsigned ? UZERO : ZERO;
            if (this.isNegative()) {
                if (divisor.isNegative())
                    return this.neg().div(divisor.neg());
                return this.neg().div(divisor).neg();
            } else if (divisor.isNegative())
                return this.div(divisor.neg()).neg();
            res = ZERO;
        } else {
            // The algorithm below has not been made for unsigned longs. It's therefore
            // required to take special care of the MSB prior to running it.
            if (!divisor.unsigned)
                divisor = divisor.toUnsigned();
            if (divisor.gt(this))
                return UZERO;
            if (divisor.gt(this.shru(1))) // 15 >>> 1 = 7 ; with divisor = 8 ; true
                return UONE;
            res = UZERO;
        }

        // Repeat the following until the remainder is less than other:  find a
        // floating-point that approximates remainder / other *from below*, add this
        // into the result, and subtract it from the remainder.  It is critical that
        // the approximate value is less than or equal to the real value so that the
        // remainder never becomes negative.
        rem = this;
        while (rem.gte(divisor)) {
            // Approximate the result of division. This may be a little greater or
            // smaller than the actual value.
            approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));

            // We will tweak the approximate result by changing it in the 48-th digit or
            // the smallest non-fractional digit, whichever is larger.
            var log2 = Math.ceil(Math.log(approx) / Math.LN2),
                delta = (log2 <= 48) ? 1 : pow_dbl(2, log2 - 48),

            // Decrease the approximation until it is smaller than the remainder.  Note
            // that if it is too large, the product overflows and is negative.
                approxRes = fromNumber(approx),
                approxRem = approxRes.mul(divisor);
            while (approxRem.isNegative() || approxRem.gt(rem)) {
                approx -= delta;
                approxRes = fromNumber(approx, this.unsigned);
                approxRem = approxRes.mul(divisor);
            }

            // We know the answer can't be zero... and actually, zero would cause
            // infinite recursion since we would make no progress.
            if (approxRes.isZero())
                approxRes = ONE;

            res = res.add(approxRes);
            rem = rem.sub(approxRem);
        }
        return res;
    };

    /**
     * Returns this Long divided by the specified. This is an alias of {@link Long#divide}.
     * @function
     * @param {!Long|number|string} divisor Divisor
     * @returns {!Long} Quotient
     */
    LongPrototype.div = LongPrototype.divide;

    /**
     * Returns this Long modulo the specified.
     * @param {!Long|number|string} divisor Divisor
     * @returns {!Long} Remainder
     */
    LongPrototype.modulo = function modulo(divisor) {
        if (!isLong(divisor))
            divisor = fromValue(divisor);
        return this.sub(this.div(divisor).mul(divisor));
    };

    /**
     * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
     * @function
     * @param {!Long|number|string} divisor Divisor
     * @returns {!Long} Remainder
     */
    LongPrototype.mod = LongPrototype.modulo;

    /**
     * Returns the bitwise NOT of this Long.
     * @returns {!Long}
     */
    LongPrototype.not = function not() {
        return fromBits(~this.low, ~this.high, this.unsigned);
    };

    /**
     * Returns the bitwise AND of this Long and the specified.
     * @param {!Long|number|string} other Other Long
     * @returns {!Long}
     */
    LongPrototype.and = function and(other) {
        if (!isLong(other))
            other = fromValue(other);
        return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
    };

    /**
     * Returns the bitwise OR of this Long and the specified.
     * @param {!Long|number|string} other Other Long
     * @returns {!Long}
     */
    LongPrototype.or = function or(other) {
        if (!isLong(other))
            other = fromValue(other);
        return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
    };

    /**
     * Returns the bitwise XOR of this Long and the given one.
     * @param {!Long|number|string} other Other Long
     * @returns {!Long}
     */
    LongPrototype.xor = function xor(other) {
        if (!isLong(other))
            other = fromValue(other);
        return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
    };

    /**
     * Returns this Long with bits shifted to the left by the given amount.
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     */
    LongPrototype.shiftLeft = function shiftLeft(numBits) {
        if (isLong(numBits))
            numBits = numBits.toInt();
        if ((numBits &= 63) === 0)
            return this;
        else if (numBits < 32)
            return fromBits(this.low << numBits, (this.high << numBits) | (this.low >>> (32 - numBits)), this.unsigned);
        else
            return fromBits(0, this.low << (numBits - 32), this.unsigned);
    };

    /**
     * Returns this Long with bits shifted to the left by the given amount. This is an alias of {@link Long#shiftLeft}.
     * @function
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     */
    LongPrototype.shl = LongPrototype.shiftLeft;

    /**
     * Returns this Long with bits arithmetically shifted to the right by the given amount.
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     */
    LongPrototype.shiftRight = function shiftRight(numBits) {
        if (isLong(numBits))
            numBits = numBits.toInt();
        if ((numBits &= 63) === 0)
            return this;
        else if (numBits < 32)
            return fromBits((this.low >>> numBits) | (this.high << (32 - numBits)), this.high >> numBits, this.unsigned);
        else
            return fromBits(this.high >> (numBits - 32), this.high >= 0 ? 0 : -1, this.unsigned);
    };

    /**
     * Returns this Long with bits arithmetically shifted to the right by the given amount. This is an alias of {@link Long#shiftRight}.
     * @function
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     */
    LongPrototype.shr = LongPrototype.shiftRight;

    /**
     * Returns this Long with bits logically shifted to the right by the given amount.
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     */
    LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
        if (isLong(numBits))
            numBits = numBits.toInt();
        numBits &= 63;
        if (numBits === 0)
            return this;
        else {
            var high = this.high;
            if (numBits < 32) {
                var low = this.low;
                return fromBits((low >>> numBits) | (high << (32 - numBits)), high >>> numBits, this.unsigned);
            } else if (numBits === 32)
                return fromBits(high, 0, this.unsigned);
            else
                return fromBits(high >>> (numBits - 32), 0, this.unsigned);
        }
    };

    /**
     * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
     * @function
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     */
    LongPrototype.shru = LongPrototype.shiftRightUnsigned;

    /**
     * Converts this Long to signed.
     * @returns {!Long} Signed long
     */
    LongPrototype.toSigned = function toSigned() {
        if (!this.unsigned)
            return this;
        return fromBits(this.low, this.high, false);
    };

    /**
     * Converts this Long to unsigned.
     * @returns {!Long} Unsigned long
     */
    LongPrototype.toUnsigned = function toUnsigned() {
        if (this.unsigned)
            return this;
        return fromBits(this.low, this.high, true);
    };

    /**
     * Converts this Long to its byte representation.
     * @param {boolean=} le Whether little or big endian, defaults to big endian
     * @returns {!Array.<number>} Byte representation
     */
    LongPrototype.toBytes = function(le) {
        return le ? this.toBytesLE() : this.toBytesBE();
    }

    /**
     * Converts this Long to its little endian byte representation.
     * @returns {!Array.<number>} Little endian byte representation
     */
    LongPrototype.toBytesLE = function() {
        var hi = this.high,
            lo = this.low;
        return [
             lo         & 0xff,
            (lo >>>  8) & 0xff,
            (lo >>> 16) & 0xff,
            (lo >>> 24) & 0xff,
             hi         & 0xff,
            (hi >>>  8) & 0xff,
            (hi >>> 16) & 0xff,
            (hi >>> 24) & 0xff
        ];
    }

    /**
     * Converts this Long to its big endian byte representation.
     * @returns {!Array.<number>} Big endian byte representation
     */
    LongPrototype.toBytesBE = function() {
        var hi = this.high,
            lo = this.low;
        return [
            (hi >>> 24) & 0xff,
            (hi >>> 16) & 0xff,
            (hi >>>  8) & 0xff,
             hi         & 0xff,
            (lo >>> 24) & 0xff,
            (lo >>> 16) & 0xff,
            (lo >>>  8) & 0xff,
             lo         & 0xff
        ];
    }

    return Long;
});

/*
 Copyright 2013-2014 Daniel Wirtz <dcode@dcode.io>

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

/**
 * @license ByteBuffer.js (c) 2013-2014 Daniel Wirtz <dcode@dcode.io>
 * This version of ByteBuffer.js uses an ArrayBuffer as its backing buffer which is accessed through a DataView and is
 * compatible with modern browsers.
 * Released under the Apache License, Version 2.0
 * see: https://github.com/dcodeIO/ByteBuffer.js for details
 */ //
(function(global) {
    "use strict";

    /**
     * @param {function(new: Long, number, number, boolean=)=} Long
     * @returns {function(new: ByteBuffer, number=, boolean=, boolean=)}}
     * @inner
     */
    function loadByteBuffer(Long) {

        /**
         * Constructs a new ByteBuffer.
         * @class The swiss army knife for binary data in JavaScript.
         * @exports ByteBuffer
         * @constructor
         * @param {number=} capacity Initial capacity. Defaults to {@link ByteBuffer.DEFAULT_CAPACITY}.
         * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
         *  {@link ByteBuffer.DEFAULT_ENDIAN}.
         * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
         *  {@link ByteBuffer.DEFAULT_NOASSERT}.
         * @expose
         */
        var ByteBuffer = function(capacity, littleEndian, noAssert) {
            if (typeof capacity     === 'undefined') capacity     = ByteBuffer.DEFAULT_CAPACITY;
            if (typeof littleEndian === 'undefined') littleEndian = ByteBuffer.DEFAULT_ENDIAN;
            if (typeof noAssert     === 'undefined') noAssert     = ByteBuffer.DEFAULT_NOASSERT;
            if (!noAssert) {
                capacity = capacity | 0;
                if (capacity < 0)
                    throw RangeError("Illegal capacity");
                littleEndian = !!littleEndian;
                noAssert = !!noAssert;
            }

            /**
             * Backing buffer.
             * @type {!ArrayBuffer}
             * @expose
             */
            this.buffer = capacity === 0 ? EMPTY_BUFFER : new ArrayBuffer(capacity);

            /**
             * Data view to manipulate the backing buffer. Becomes `null` if the backing buffer has a capacity of `0`.
             * @type {?DataView}
             * @expose
             */
            this.view = capacity === 0 ? null : new DataView(this.buffer);

            /**
             * Absolute read/write offset.
             * @type {number}
             * @expose
             * @see ByteBuffer#flip
             * @see ByteBuffer#clear
             */
            this.offset = 0;

            /**
             * Marked offset.
             * @type {number}
             * @expose
             * @see ByteBuffer#mark
             * @see ByteBuffer#reset
             */
            this.markedOffset = -1;

            /**
             * Absolute limit of the contained data. Set to the backing buffer's capacity upon allocation.
             * @type {number}
             * @expose
             * @see ByteBuffer#flip
             * @see ByteBuffer#clear
             */
            this.limit = capacity;

            /**
             * Whether to use little endian byte order, defaults to `false` for big endian.
             * @type {boolean}
             * @expose
             */
            this.littleEndian = typeof littleEndian !== 'undefined' ? !!littleEndian : false;

            /**
             * Whether to skip assertions of offsets and values, defaults to `false`.
             * @type {boolean}
             * @expose
             */
            this.noAssert = !!noAssert;
        };

        /**
         * ByteBuffer version.
         * @type {string}
         * @const
         * @expose
         */
        ByteBuffer.VERSION = "3.5.5";

        /**
         * Little endian constant that can be used instead of its boolean value. Evaluates to `true`.
         * @type {boolean}
         * @const
         * @expose
         */
        ByteBuffer.LITTLE_ENDIAN = true;

        /**
         * Big endian constant that can be used instead of its boolean value. Evaluates to `false`.
         * @type {boolean}
         * @const
         * @expose
         */
        ByteBuffer.BIG_ENDIAN = false;

        /**
         * Default initial capacity of `16`.
         * @type {number}
         * @expose
         */
        ByteBuffer.DEFAULT_CAPACITY = 16;

        /**
         * Default endianess of `false` for big endian.
         * @type {boolean}
         * @expose
         */
        ByteBuffer.DEFAULT_ENDIAN = ByteBuffer.BIG_ENDIAN;

        /**
         * Default no assertions flag of `false`.
         * @type {boolean}
         * @expose
         */
        ByteBuffer.DEFAULT_NOASSERT = false;

        /**
         * A `Long` class for representing a 64-bit two's-complement integer value. May be `null` if Long.js has not been loaded
         *  and int64 support is not available.
         * @type {?Long}
         * @const
         * @see https://github.com/dcodeIO/Long.js
         * @expose
         */
        ByteBuffer.Long = Long || null;

        /**
         * @alias ByteBuffer.prototype
         * @inner
         */
        var ByteBufferPrototype = ByteBuffer.prototype;

        // helpers

        /**
         * @type {!ArrayBuffer}
         * @inner
         */
        var EMPTY_BUFFER = new ArrayBuffer(0);

        /**
         * String.fromCharCode reference for compile-time renaming.
         * @type {function(...number):string}
         * @inner
         */
        var stringFromCharCode = String.fromCharCode;

        /**
         * Creates a source function for a string.
         * @param {string} s String to read from
         * @returns {function():number|null} Source function returning the next char code respectively `null` if there are
         *  no more characters left.
         * @throws {TypeError} If the argument is invalid
         * @inner
         */
        function stringSource(s) {
            var i=0; return function() {
                return i < s.length ? s.charCodeAt(i++) : null;
            };
        }

        /**
         * Creates a destination function for a string.
         * @returns {function(number=):undefined|string} Destination function successively called with the next char code.
         *  Returns the final string when called without arguments.
         * @inner
         */
        function stringDestination() {
            var cs = [], ps = []; return function() {
                if (arguments.length === 0)
                    return ps.join('')+stringFromCharCode.apply(String, cs);
                if (cs.length + arguments.length > 1024)
                    ps.push(stringFromCharCode.apply(String, cs)),
                        cs.length = 0;
                Array.prototype.push.apply(cs, arguments);
            };
        }

        /**
         * Allocates a new ByteBuffer backed by a buffer of the specified capacity.
         * @param {number=} capacity Initial capacity. Defaults to {@link ByteBuffer.DEFAULT_CAPACITY}.
         * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
         *  {@link ByteBuffer.DEFAULT_ENDIAN}.
         * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
         *  {@link ByteBuffer.DEFAULT_NOASSERT}.
         * @returns {!ByteBuffer}
         * @expose
         */
        ByteBuffer.allocate = function(capacity, littleEndian, noAssert) {
            return new ByteBuffer(capacity, littleEndian, noAssert);
        };

        /**
         * Concatenates multiple ByteBuffers into one.
         * @param {!Array.<!ByteBuffer|!ArrayBuffer|!Uint8Array|string>} buffers Buffers to concatenate
         * @param {(string|boolean)=} encoding String encoding if `buffers` contains a string ("base64", "hex", "binary",
         *  defaults to "utf8")
         * @param {boolean=} littleEndian Whether to use little or big endian byte order for the resulting ByteBuffer. Defaults
         *  to {@link ByteBuffer.DEFAULT_ENDIAN}.
         * @param {boolean=} noAssert Whether to skip assertions of offsets and values for the resulting ByteBuffer. Defaults to
         *  {@link ByteBuffer.DEFAULT_NOASSERT}.
         * @returns {!ByteBuffer} Concatenated ByteBuffer
         * @expose
         */
        ByteBuffer.concat = function(buffers, encoding, littleEndian, noAssert) {
            if (typeof encoding === 'boolean' || typeof encoding !== 'string') {
                noAssert = littleEndian;
                littleEndian = encoding;
                encoding = undefined;
            }
            var capacity = 0;
            for (var i=0, k=buffers.length, length; i<k; ++i) {
                if (!ByteBuffer.isByteBuffer(buffers[i]))
                    buffers[i] = ByteBuffer.wrap(buffers[i], encoding);
                length = buffers[i].limit - buffers[i].offset;
                if (length > 0) capacity += length;
            }
            if (capacity === 0)
                return new ByteBuffer(0, littleEndian, noAssert);
            var bb = new ByteBuffer(capacity, littleEndian, noAssert),
                bi;
            var view = new Uint8Array(bb.buffer);
            i=0; while (i<k) {
                bi = buffers[i++];
                length = bi.limit - bi.offset;
                if (length <= 0) continue;
                view.set(new Uint8Array(bi.buffer).subarray(bi.offset, bi.limit), bb.offset);
                bb.offset += length;
            }
            bb.limit = bb.offset;
            bb.offset = 0;
            return bb;
        };

        /**
         * Tests if the specified type is a ByteBuffer.
         * @param {*} bb ByteBuffer to test
         * @returns {boolean} `true` if it is a ByteBuffer, otherwise `false`
         * @expose
         */
        ByteBuffer.isByteBuffer = function(bb) {
            return (bb && bb instanceof ByteBuffer) === true;
        };
        /**
         * Gets the backing buffer type.
         * @returns {Function} `Buffer` for NB builds, `ArrayBuffer` for AB builds (classes)
         * @expose
         */
        ByteBuffer.type = function() {
            return ArrayBuffer;
        };

        /**
         * Wraps a buffer or a string. Sets the allocated ByteBuffer's {@link ByteBuffer#offset} to `0` and its
         *  {@link ByteBuffer#limit} to the length of the wrapped data.
         * @param {!ByteBuffer|!ArrayBuffer|!Uint8Array|string|!Array.<number>} buffer Anything that can be wrapped
         * @param {(string|boolean)=} encoding String encoding if `buffer` is a string ("base64", "hex", "binary", defaults to
         *  "utf8")
         * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
         *  {@link ByteBuffer.DEFAULT_ENDIAN}.
         * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
         *  {@link ByteBuffer.DEFAULT_NOASSERT}.
         * @returns {!ByteBuffer} A ByteBuffer wrapping `buffer`
         * @expose
         */
        ByteBuffer.wrap = function(buffer, encoding, littleEndian, noAssert) {
            if (typeof encoding !== 'string') {
                noAssert = littleEndian;
                littleEndian = encoding;
                encoding = undefined;
            }
            if (typeof buffer === 'string') {
                if (typeof encoding === 'undefined')
                    encoding = "utf8";
                switch (encoding) {
                    case "base64":
                        return ByteBuffer.fromBase64(buffer, littleEndian);
                    case "hex":
                        return ByteBuffer.fromHex(buffer, littleEndian);
                    case "binary":
                        return ByteBuffer.fromBinary(buffer, littleEndian);
                    case "utf8":
                        return ByteBuffer.fromUTF8(buffer, littleEndian);
                    case "debug":
                        return ByteBuffer.fromDebug(buffer, littleEndian);
                    default:
                        throw Error("Unsupported encoding: "+encoding);
                }
            }
            if (buffer === null || typeof buffer !== 'object')
                throw TypeError("Illegal buffer");
            var bb;
            if (ByteBuffer.isByteBuffer(buffer)) {
                bb = ByteBufferPrototype.clone.call(buffer);
                bb.markedOffset = -1;
                return bb;
            }
            if (buffer instanceof Uint8Array) { // Extract ArrayBuffer from Uint8Array
                bb = new ByteBuffer(0, littleEndian, noAssert);
                if (buffer.length > 0) { // Avoid references to more than one EMPTY_BUFFER
                    bb.buffer = buffer.buffer;
                    bb.offset = buffer.byteOffset;
                    bb.limit = buffer.byteOffset + buffer.length;
                    bb.view = buffer.length > 0 ? new DataView(buffer.buffer) : null;
                }
            } else if (buffer instanceof ArrayBuffer) { // Reuse ArrayBuffer
                bb = new ByteBuffer(0, littleEndian, noAssert);
                if (buffer.byteLength > 0) {
                    bb.buffer = buffer;
                    bb.offset = 0;
                    bb.limit = buffer.byteLength;
                    bb.view = buffer.byteLength > 0 ? new DataView(buffer) : null;
                }
            } else if (Object.prototype.toString.call(buffer) === "[object Array]") { // Create from octets
                bb = new ByteBuffer(buffer.length, littleEndian, noAssert);
                bb.limit = buffer.length;
                for (i=0; i<buffer.length; ++i)
                    bb.view.setUint8(i, buffer[i]);
            } else
                throw TypeError("Illegal buffer"); // Otherwise fail
            return bb;
        };

        // types/ints/int8

        /**
         * Writes an 8bit signed integer.
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.writeInt8 = function(value, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof value !== 'number' || value % 1 !== 0)
                    throw TypeError("Illegal value: "+value+" (not an integer)");
                value |= 0;
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            offset += 1;
            var capacity0 = this.buffer.byteLength;
            if (offset > capacity0)
                this.resize((capacity0 *= 2) > offset ? capacity0 : offset);
            offset -= 1;
            this.view.setInt8(offset, value);
            if (relative) this.offset += 1;
            return this;
        };

        /**
         * Writes an 8bit signed integer. This is an alias of {@link ByteBuffer#writeInt8}.
         * @function
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.writeByte = ByteBufferPrototype.writeInt8;

        /**
         * Reads an 8bit signed integer.
         * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
         * @returns {number} Value read
         * @expose
         */
        ByteBufferPrototype.readInt8 = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 1 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength);
            }
            var value = this.view.getInt8(offset);
            if (relative) this.offset += 1;
            return value;
        };

        /**
         * Reads an 8bit signed integer. This is an alias of {@link ByteBuffer#readInt8}.
         * @function
         * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
         * @returns {number} Value read
         * @expose
         */
        ByteBufferPrototype.readByte = ByteBufferPrototype.readInt8;

        /**
         * Writes an 8bit unsigned integer.
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.writeUint8 = function(value, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof value !== 'number' || value % 1 !== 0)
                    throw TypeError("Illegal value: "+value+" (not an integer)");
                value >>>= 0;
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            offset += 1;
            var capacity1 = this.buffer.byteLength;
            if (offset > capacity1)
                this.resize((capacity1 *= 2) > offset ? capacity1 : offset);
            offset -= 1;
            this.view.setUint8(offset, value);
            if (relative) this.offset += 1;
            return this;
        };

        /**
         * Reads an 8bit unsigned integer.
         * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
         * @returns {number} Value read
         * @expose
         */
        ByteBufferPrototype.readUint8 = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 1 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength);
            }
            var value = this.view.getUint8(offset);
            if (relative) this.offset += 1;
            return value;
        };

        // types/ints/int16

        /**
         * Writes a 16bit signed integer.
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
         * @throws {TypeError} If `offset` or `value` is not a valid number
         * @throws {RangeError} If `offset` is out of bounds
         * @expose
         */
        ByteBufferPrototype.writeInt16 = function(value, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof value !== 'number' || value % 1 !== 0)
                    throw TypeError("Illegal value: "+value+" (not an integer)");
                value |= 0;
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            offset += 2;
            var capacity2 = this.buffer.byteLength;
            if (offset > capacity2)
                this.resize((capacity2 *= 2) > offset ? capacity2 : offset);
            offset -= 2;
            this.view.setInt16(offset, value, this.littleEndian);
            if (relative) this.offset += 2;
            return this;
        };

        /**
         * Writes a 16bit signed integer. This is an alias of {@link ByteBuffer#writeInt16}.
         * @function
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
         * @throws {TypeError} If `offset` or `value` is not a valid number
         * @throws {RangeError} If `offset` is out of bounds
         * @expose
         */
        ByteBufferPrototype.writeShort = ByteBufferPrototype.writeInt16;

        /**
         * Reads a 16bit signed integer.
         * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
         * @returns {number} Value read
         * @throws {TypeError} If `offset` is not a valid number
         * @throws {RangeError} If `offset` is out of bounds
         * @expose
         */
        ByteBufferPrototype.readInt16 = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 2 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+2+") <= "+this.buffer.byteLength);
            }
            var value = this.view.getInt16(offset, this.littleEndian);
            if (relative) this.offset += 2;
            return value;
        };

        /**
         * Reads a 16bit signed integer. This is an alias of {@link ByteBuffer#readInt16}.
         * @function
         * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
         * @returns {number} Value read
         * @throws {TypeError} If `offset` is not a valid number
         * @throws {RangeError} If `offset` is out of bounds
         * @expose
         */
        ByteBufferPrototype.readShort = ByteBufferPrototype.readInt16;

        /**
         * Writes a 16bit unsigned integer.
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
         * @throws {TypeError} If `offset` or `value` is not a valid number
         * @throws {RangeError} If `offset` is out of bounds
         * @expose
         */
        ByteBufferPrototype.writeUint16 = function(value, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof value !== 'number' || value % 1 !== 0)
                    throw TypeError("Illegal value: "+value+" (not an integer)");
                value >>>= 0;
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            offset += 2;
            var capacity3 = this.buffer.byteLength;
            if (offset > capacity3)
                this.resize((capacity3 *= 2) > offset ? capacity3 : offset);
            offset -= 2;
            this.view.setUint16(offset, value, this.littleEndian);
            if (relative) this.offset += 2;
            return this;
        };

        /**
         * Reads a 16bit unsigned integer.
         * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
         * @returns {number} Value read
         * @throws {TypeError} If `offset` is not a valid number
         * @throws {RangeError} If `offset` is out of bounds
         * @expose
         */
        ByteBufferPrototype.readUint16 = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 2 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+2+") <= "+this.buffer.byteLength);
            }
            var value = this.view.getUint16(offset, this.littleEndian);
            if (relative) this.offset += 2;
            return value;
        };

        // types/ints/int32

        /**
         * Writes a 32bit signed integer.
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
         * @expose
         */
        ByteBufferPrototype.writeInt32 = function(value, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof value !== 'number' || value % 1 !== 0)
                    throw TypeError("Illegal value: "+value+" (not an integer)");
                value |= 0;
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            offset += 4;
            var capacity4 = this.buffer.byteLength;
            if (offset > capacity4)
                this.resize((capacity4 *= 2) > offset ? capacity4 : offset);
            offset -= 4;
            this.view.setInt32(offset, value, this.littleEndian);
            if (relative) this.offset += 4;
            return this;
        };

        /**
         * Writes a 32bit signed integer. This is an alias of {@link ByteBuffer#writeInt32}.
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
         * @expose
         */
        ByteBufferPrototype.writeInt = ByteBufferPrototype.writeInt32;

        /**
         * Reads a 32bit signed integer.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
         * @returns {number} Value read
         * @expose
         */
        ByteBufferPrototype.readInt32 = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 4 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+4+") <= "+this.buffer.byteLength);
            }
            var value = this.view.getInt32(offset, this.littleEndian);
            if (relative) this.offset += 4;
            return value;
        };

        /**
         * Reads a 32bit signed integer. This is an alias of {@link ByteBuffer#readInt32}.
         * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `4` if omitted.
         * @returns {number} Value read
         * @expose
         */
        ByteBufferPrototype.readInt = ByteBufferPrototype.readInt32;

        /**
         * Writes a 32bit unsigned integer.
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
         * @expose
         */
        ByteBufferPrototype.writeUint32 = function(value, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof value !== 'number' || value % 1 !== 0)
                    throw TypeError("Illegal value: "+value+" (not an integer)");
                value >>>= 0;
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            offset += 4;
            var capacity5 = this.buffer.byteLength;
            if (offset > capacity5)
                this.resize((capacity5 *= 2) > offset ? capacity5 : offset);
            offset -= 4;
            this.view.setUint32(offset, value, this.littleEndian);
            if (relative) this.offset += 4;
            return this;
        };

        /**
         * Reads a 32bit unsigned integer.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
         * @returns {number} Value read
         * @expose
         */
        ByteBufferPrototype.readUint32 = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 4 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+4+") <= "+this.buffer.byteLength);
            }
            var value = this.view.getUint32(offset, this.littleEndian);
            if (relative) this.offset += 4;
            return value;
        };

        // types/ints/int64

        if (Long) {

            /**
             * Writes a 64bit signed integer.
             * @param {number|!Long} value Value to write
             * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
             * @returns {!ByteBuffer} this
             * @expose
             */
            ByteBufferPrototype.writeInt64 = function(value, offset) {
                var relative = typeof offset === 'undefined';
                if (relative) offset = this.offset;
                if (!this.noAssert) {
                    if (typeof value === 'number')
                        value = Long.fromNumber(value);
                    else if (typeof value === 'string')
                        value = Long.fromString(value);
                    else if (!(value && value instanceof Long))
                        throw TypeError("Illegal value: "+value+" (not an integer or Long)");
                    if (typeof offset !== 'number' || offset % 1 !== 0)
                        throw TypeError("Illegal offset: "+offset+" (not an integer)");
                    offset >>>= 0;
                    if (offset < 0 || offset + 0 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
                }
                if (typeof value === 'number')
                    value = Long.fromNumber(value);
                else if (typeof value === 'string')
                    value = Long.fromString(value);
                offset += 8;
                var capacity6 = this.buffer.byteLength;
                if (offset > capacity6)
                    this.resize((capacity6 *= 2) > offset ? capacity6 : offset);
                offset -= 8;
                if (this.littleEndian) {
                    this.view.setInt32(offset  , value.low , true);
                    this.view.setInt32(offset+4, value.high, true);
                } else {
                    this.view.setInt32(offset  , value.high, false);
                    this.view.setInt32(offset+4, value.low , false);
                }
                if (relative) this.offset += 8;
                return this;
            };

            /**
             * Writes a 64bit signed integer. This is an alias of {@link ByteBuffer#writeInt64}.
             * @param {number|!Long} value Value to write
             * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
             * @returns {!ByteBuffer} this
             * @expose
             */
            ByteBufferPrototype.writeLong = ByteBufferPrototype.writeInt64;

            /**
             * Reads a 64bit signed integer.
             * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
             * @returns {!Long}
             * @expose
             */
            ByteBufferPrototype.readInt64 = function(offset) {
                var relative = typeof offset === 'undefined';
                if (relative) offset = this.offset;
                if (!this.noAssert) {
                    if (typeof offset !== 'number' || offset % 1 !== 0)
                        throw TypeError("Illegal offset: "+offset+" (not an integer)");
                    offset >>>= 0;
                    if (offset < 0 || offset + 8 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= "+offset+" (+"+8+") <= "+this.buffer.byteLength);
                }
                var value = this.littleEndian
                    ? new Long(this.view.getInt32(offset  , true ), this.view.getInt32(offset+4, true ), false)
                    : new Long(this.view.getInt32(offset+4, false), this.view.getInt32(offset  , false), false);
                if (relative) this.offset += 8;
                return value;
            };

            /**
             * Reads a 64bit signed integer. This is an alias of {@link ByteBuffer#readInt64}.
             * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
             * @returns {!Long}
             * @expose
             */
            ByteBufferPrototype.readLong = ByteBufferPrototype.readInt64;

            /**
             * Writes a 64bit unsigned integer.
             * @param {number|!Long} value Value to write
             * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
             * @returns {!ByteBuffer} this
             * @expose
             */
            ByteBufferPrototype.writeUint64 = function(value, offset) {
                var relative = typeof offset === 'undefined';
                if (relative) offset = this.offset;
                if (!this.noAssert) {
                    if (typeof value === 'number')
                        value = Long.fromNumber(value);
                    else if (typeof value === 'string')
                        value = Long.fromString(value);
                    else if (!(value && value instanceof Long))
                        throw TypeError("Illegal value: "+value+" (not an integer or Long)");
                    if (typeof offset !== 'number' || offset % 1 !== 0)
                        throw TypeError("Illegal offset: "+offset+" (not an integer)");
                    offset >>>= 0;
                    if (offset < 0 || offset + 0 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
                }
                if (typeof value === 'number')
                    value = Long.fromNumber(value);
                else if (typeof value === 'string')
                    value = Long.fromString(value);
                offset += 8;
                var capacity7 = this.buffer.byteLength;
                if (offset > capacity7)
                    this.resize((capacity7 *= 2) > offset ? capacity7 : offset);
                offset -= 8;
                if (this.littleEndian) {
                    this.view.setInt32(offset  , value.low , true);
                    this.view.setInt32(offset+4, value.high, true);
                } else {
                    this.view.setInt32(offset  , value.high, false);
                    this.view.setInt32(offset+4, value.low , false);
                }
                if (relative) this.offset += 8;
                return this;
            };

            /**
             * Reads a 64bit unsigned integer.
             * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
             * @returns {!Long}
             * @expose
             */
            ByteBufferPrototype.readUint64 = function(offset) {
                var relative = typeof offset === 'undefined';
                if (relative) offset = this.offset;
                if (!this.noAssert) {
                    if (typeof offset !== 'number' || offset % 1 !== 0)
                        throw TypeError("Illegal offset: "+offset+" (not an integer)");
                    offset >>>= 0;
                    if (offset < 0 || offset + 8 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= "+offset+" (+"+8+") <= "+this.buffer.byteLength);
                }
                var value = this.littleEndian
                    ? new Long(this.view.getInt32(offset  , true ), this.view.getInt32(offset+4, true ), true)
                    : new Long(this.view.getInt32(offset+4, false), this.view.getInt32(offset  , false), true);
                if (relative) this.offset += 8;
                return value;
            };

        } // Long


        // types/floats/float32

        /**
         * Writes a 32bit float.
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.writeFloat32 = function(value, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof value !== 'number')
                    throw TypeError("Illegal value: "+value+" (not a number)");
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            offset += 4;
            var capacity8 = this.buffer.byteLength;
            if (offset > capacity8)
                this.resize((capacity8 *= 2) > offset ? capacity8 : offset);
            offset -= 4;
            this.view.setFloat32(offset, value, this.littleEndian);
            if (relative) this.offset += 4;
            return this;
        };

        /**
         * Writes a 32bit float. This is an alias of {@link ByteBuffer#writeFloat32}.
         * @function
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.writeFloat = ByteBufferPrototype.writeFloat32;

        /**
         * Reads a 32bit float.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
         * @returns {number}
         * @expose
         */
        ByteBufferPrototype.readFloat32 = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 4 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+4+") <= "+this.buffer.byteLength);
            }
            var value = this.view.getFloat32(offset, this.littleEndian);
            if (relative) this.offset += 4;
            return value;
        };

        /**
         * Reads a 32bit float. This is an alias of {@link ByteBuffer#readFloat32}.
         * @function
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
         * @returns {number}
         * @expose
         */
        ByteBufferPrototype.readFloat = ByteBufferPrototype.readFloat32;

        // types/floats/float64

        /**
         * Writes a 64bit float.
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.writeFloat64 = function(value, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof value !== 'number')
                    throw TypeError("Illegal value: "+value+" (not a number)");
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            offset += 8;
            var capacity9 = this.buffer.byteLength;
            if (offset > capacity9)
                this.resize((capacity9 *= 2) > offset ? capacity9 : offset);
            offset -= 8;
            this.view.setFloat64(offset, value, this.littleEndian);
            if (relative) this.offset += 8;
            return this;
        };

        /**
         * Writes a 64bit float. This is an alias of {@link ByteBuffer#writeFloat64}.
         * @function
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.writeDouble = ByteBufferPrototype.writeFloat64;

        /**
         * Reads a 64bit float.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
         * @returns {number}
         * @expose
         */
        ByteBufferPrototype.readFloat64 = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 8 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+8+") <= "+this.buffer.byteLength);
            }
            var value = this.view.getFloat64(offset, this.littleEndian);
            if (relative) this.offset += 8;
            return value;
        };

        /**
         * Reads a 64bit float. This is an alias of {@link ByteBuffer#readFloat64}.
         * @function
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
         * @returns {number}
         * @expose
         */
        ByteBufferPrototype.readDouble = ByteBufferPrototype.readFloat64;


        // types/varints/varint32

        /**
         * Maximum number of bytes required to store a 32bit base 128 variable-length integer.
         * @type {number}
         * @const
         * @expose
         */
        ByteBuffer.MAX_VARINT32_BYTES = 5;

        /**
         * Calculates the actual number of bytes required to store a 32bit base 128 variable-length integer.
         * @param {number} value Value to encode
         * @returns {number} Number of bytes required. Capped to {@link ByteBuffer.MAX_VARINT32_BYTES}
         * @expose
         */
        ByteBuffer.calculateVarint32 = function(value) {
            // ref: src/google/protobuf/io/coded_stream.cc
            value = value >>> 0;
                 if (value < 1 << 7 ) return 1;
            else if (value < 1 << 14) return 2;
            else if (value < 1 << 21) return 3;
            else if (value < 1 << 28) return 4;
            else                      return 5;
        };

        /**
         * Zigzag encodes a signed 32bit integer so that it can be effectively used with varint encoding.
         * @param {number} n Signed 32bit integer
         * @returns {number} Unsigned zigzag encoded 32bit integer
         * @expose
         */
        ByteBuffer.zigZagEncode32 = function(n) {
            return (((n |= 0) << 1) ^ (n >> 31)) >>> 0; // ref: src/google/protobuf/wire_format_lite.h
        };

        /**
         * Decodes a zigzag encoded signed 32bit integer.
         * @param {number} n Unsigned zigzag encoded 32bit integer
         * @returns {number} Signed 32bit integer
         * @expose
         */
        ByteBuffer.zigZagDecode32 = function(n) {
            return ((n >>> 1) ^ -(n & 1)) | 0; // // ref: src/google/protobuf/wire_format_lite.h
        };

        /**
         * Writes a 32bit base 128 variable-length integer.
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  written if omitted.
         * @returns {!ByteBuffer|number} this if `offset` is omitted, else the actual number of bytes written
         * @expose
         */
        ByteBufferPrototype.writeVarint32 = function(value, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof value !== 'number' || value % 1 !== 0)
                    throw TypeError("Illegal value: "+value+" (not an integer)");
                value |= 0;
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            var size = ByteBuffer.calculateVarint32(value),
                b;
            offset += size;
            var capacity10 = this.buffer.byteLength;
            if (offset > capacity10)
                this.resize((capacity10 *= 2) > offset ? capacity10 : offset);
            offset -= size;
            // ref: http://code.google.com/searchframe#WTeibokF6gE/trunk/src/google/protobuf/io/coded_stream.cc
            this.view.setUint8(offset, b = value | 0x80);
            value >>>= 0;
            if (value >= 1 << 7) {
                b = (value >> 7) | 0x80;
                this.view.setUint8(offset+1, b);
                if (value >= 1 << 14) {
                    b = (value >> 14) | 0x80;
                    this.view.setUint8(offset+2, b);
                    if (value >= 1 << 21) {
                        b = (value >> 21) | 0x80;
                        this.view.setUint8(offset+3, b);
                        if (value >= 1 << 28) {
                            this.view.setUint8(offset+4, (value >> 28) & 0x0F);
                            size = 5;
                        } else {
                            this.view.setUint8(offset+3, b & 0x7F);
                            size = 4;
                        }
                    } else {
                        this.view.setUint8(offset+2, b & 0x7F);
                        size = 3;
                    }
                } else {
                    this.view.setUint8(offset+1, b & 0x7F);
                    size = 2;
                }
            } else {
                this.view.setUint8(offset, b & 0x7F);
                size = 1;
            }
            if (relative) {
                this.offset += size;
                return this;
            }
            return size;
        };

        /**
         * Writes a zig-zag encoded 32bit base 128 variable-length integer.
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  written if omitted.
         * @returns {!ByteBuffer|number} this if `offset` is omitted, else the actual number of bytes written
         * @expose
         */
        ByteBufferPrototype.writeVarint32ZigZag = function(value, offset) {
            return this.writeVarint32(ByteBuffer.zigZagEncode32(value), offset);
        };

        /**
         * Reads a 32bit base 128 variable-length integer.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  written if omitted.
         * @returns {number|!{value: number, length: number}} The value read if offset is omitted, else the value read
         *  and the actual number of bytes read.
         * @throws {Error} If it's not a valid varint. Has a property `truncated = true` if there is not enough data available
         *  to fully decode the varint.
         * @expose
         */
        ByteBufferPrototype.readVarint32 = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 1 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength);
            }
            // ref: src/google/protobuf/io/coded_stream.cc
            var size = 0,
                value = 0 >>> 0,
                temp,
                ioffset;
            do {
                ioffset = offset+size;
                if (!this.noAssert && ioffset > this.limit) {
                    var err = Error("Truncated");
                    err['truncated'] = true;
                    throw err;
                }
                temp = this.view.getUint8(ioffset);
                if (size < 5)
                    value |= ((temp&0x7F)<<(7*size)) >>> 0;
                ++size;
            } while ((temp & 0x80) === 0x80);
            value = value | 0; // Make sure to discard the higher order bits
            if (relative) {
                this.offset += size;
                return value;
            }
            return {
                "value": value,
                "length": size
            };
        };

        /**
         * Reads a zig-zag encoded 32bit base 128 variable-length integer.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  written if omitted.
         * @returns {number|!{value: number, length: number}} The value read if offset is omitted, else the value read
         *  and the actual number of bytes read.
         * @throws {Error} If it's not a valid varint
         * @expose
         */
        ByteBufferPrototype.readVarint32ZigZag = function(offset) {
            var val = this.readVarint32(offset);
            if (typeof val === 'object')
                val["value"] = ByteBuffer.zigZagDecode32(val["value"]);
            else
                val = ByteBuffer.zigZagDecode32(val);
            return val;
        };

        // types/varints/varint64

        if (Long) {

            /**
             * Maximum number of bytes required to store a 64bit base 128 variable-length integer.
             * @type {number}
             * @const
             * @expose
             */
            ByteBuffer.MAX_VARINT64_BYTES = 10;

            /**
             * Calculates the actual number of bytes required to store a 64bit base 128 variable-length integer.
             * @param {number|!Long} value Value to encode
             * @returns {number} Number of bytes required. Capped to {@link ByteBuffer.MAX_VARINT64_BYTES}
             * @expose
             */
            ByteBuffer.calculateVarint64 = function(value) {
                if (typeof value === 'number')
                    value = Long.fromNumber(value);
                else if (typeof value === 'string')
                    value = Long.fromString(value);
                // ref: src/google/protobuf/io/coded_stream.cc
                var part0 = value.toInt() >>> 0,
                    part1 = value.shiftRightUnsigned(28).toInt() >>> 0,
                    part2 = value.shiftRightUnsigned(56).toInt() >>> 0;
                if (part2 == 0) {
                    if (part1 == 0) {
                        if (part0 < 1 << 14)
                            return part0 < 1 << 7 ? 1 : 2;
                        else
                            return part0 < 1 << 21 ? 3 : 4;
                    } else {
                        if (part1 < 1 << 14)
                            return part1 < 1 << 7 ? 5 : 6;
                        else
                            return part1 < 1 << 21 ? 7 : 8;
                    }
                } else
                    return part2 < 1 << 7 ? 9 : 10;
            };

            /**
             * Zigzag encodes a signed 64bit integer so that it can be effectively used with varint encoding.
             * @param {number|!Long} value Signed long
             * @returns {!Long} Unsigned zigzag encoded long
             * @expose
             */
            ByteBuffer.zigZagEncode64 = function(value) {
                if (typeof value === 'number')
                    value = Long.fromNumber(value, false);
                else if (typeof value === 'string')
                    value = Long.fromString(value, false);
                else if (value.unsigned !== false) value = value.toSigned();
                // ref: src/google/protobuf/wire_format_lite.h
                return value.shiftLeft(1).xor(value.shiftRight(63)).toUnsigned();
            };

            /**
             * Decodes a zigzag encoded signed 64bit integer.
             * @param {!Long|number} value Unsigned zigzag encoded long or JavaScript number
             * @returns {!Long} Signed long
             * @expose
             */
            ByteBuffer.zigZagDecode64 = function(value) {
                if (typeof value === 'number')
                    value = Long.fromNumber(value, false);
                else if (typeof value === 'string')
                    value = Long.fromString(value, false);
                else if (value.unsigned !== false) value = value.toSigned();
                // ref: src/google/protobuf/wire_format_lite.h
                return value.shiftRightUnsigned(1).xor(value.and(Long.ONE).toSigned().negate()).toSigned();
            };

            /**
             * Writes a 64bit base 128 variable-length integer.
             * @param {number|Long} value Value to write
             * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
             *  written if omitted.
             * @returns {!ByteBuffer|number} `this` if offset is omitted, else the actual number of bytes written.
             * @expose
             */
            ByteBufferPrototype.writeVarint64 = function(value, offset) {
                var relative = typeof offset === 'undefined';
                if (relative) offset = this.offset;
                if (!this.noAssert) {
                    if (typeof value === 'number')
                        value = Long.fromNumber(value);
                    else if (typeof value === 'string')
                        value = Long.fromString(value);
                    else if (!(value && value instanceof Long))
                        throw TypeError("Illegal value: "+value+" (not an integer or Long)");
                    if (typeof offset !== 'number' || offset % 1 !== 0)
                        throw TypeError("Illegal offset: "+offset+" (not an integer)");
                    offset >>>= 0;
                    if (offset < 0 || offset + 0 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
                }
                if (typeof value === 'number')
                    value = Long.fromNumber(value, false);
                else if (typeof value === 'string')
                    value = Long.fromString(value, false);
                else if (value.unsigned !== false) value = value.toSigned();
                var size = ByteBuffer.calculateVarint64(value),
                    part0 = value.toInt() >>> 0,
                    part1 = value.shiftRightUnsigned(28).toInt() >>> 0,
                    part2 = value.shiftRightUnsigned(56).toInt() >>> 0;
                offset += size;
                var capacity11 = this.buffer.byteLength;
                if (offset > capacity11)
                    this.resize((capacity11 *= 2) > offset ? capacity11 : offset);
                offset -= size;
                switch (size) {
                    case 10: this.view.setUint8(offset+9, (part2 >>>  7) & 0x01);
                    case 9 : this.view.setUint8(offset+8, size !== 9 ? (part2       ) | 0x80 : (part2       ) & 0x7F);
                    case 8 : this.view.setUint8(offset+7, size !== 8 ? (part1 >>> 21) | 0x80 : (part1 >>> 21) & 0x7F);
                    case 7 : this.view.setUint8(offset+6, size !== 7 ? (part1 >>> 14) | 0x80 : (part1 >>> 14) & 0x7F);
                    case 6 : this.view.setUint8(offset+5, size !== 6 ? (part1 >>>  7) | 0x80 : (part1 >>>  7) & 0x7F);
                    case 5 : this.view.setUint8(offset+4, size !== 5 ? (part1       ) | 0x80 : (part1       ) & 0x7F);
                    case 4 : this.view.setUint8(offset+3, size !== 4 ? (part0 >>> 21) | 0x80 : (part0 >>> 21) & 0x7F);
                    case 3 : this.view.setUint8(offset+2, size !== 3 ? (part0 >>> 14) | 0x80 : (part0 >>> 14) & 0x7F);
                    case 2 : this.view.setUint8(offset+1, size !== 2 ? (part0 >>>  7) | 0x80 : (part0 >>>  7) & 0x7F);
                    case 1 : this.view.setUint8(offset  , size !== 1 ? (part0       ) | 0x80 : (part0       ) & 0x7F);
                }
                if (relative) {
                    this.offset += size;
                    return this;
                } else {
                    return size;
                }
            };

            /**
             * Writes a zig-zag encoded 64bit base 128 variable-length integer.
             * @param {number|Long} value Value to write
             * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
             *  written if omitted.
             * @returns {!ByteBuffer|number} `this` if offset is omitted, else the actual number of bytes written.
             * @expose
             */
            ByteBufferPrototype.writeVarint64ZigZag = function(value, offset) {
                return this.writeVarint64(ByteBuffer.zigZagEncode64(value), offset);
            };

            /**
             * Reads a 64bit base 128 variable-length integer. Requires Long.js.
             * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
             *  read if omitted.
             * @returns {!Long|!{value: Long, length: number}} The value read if offset is omitted, else the value read and
             *  the actual number of bytes read.
             * @throws {Error} If it's not a valid varint
             * @expose
             */
            ByteBufferPrototype.readVarint64 = function(offset) {
                var relative = typeof offset === 'undefined';
                if (relative) offset = this.offset;
                if (!this.noAssert) {
                    if (typeof offset !== 'number' || offset % 1 !== 0)
                        throw TypeError("Illegal offset: "+offset+" (not an integer)");
                    offset >>>= 0;
                    if (offset < 0 || offset + 1 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength);
                }
                // ref: src/google/protobuf/io/coded_stream.cc
                var start = offset,
                    part0 = 0,
                    part1 = 0,
                    part2 = 0,
                    b  = 0;
                b = this.view.getUint8(offset++); part0  = (b & 0x7F)      ; if (b & 0x80) {
                b = this.view.getUint8(offset++); part0 |= (b & 0x7F) <<  7; if (b & 0x80) {
                b = this.view.getUint8(offset++); part0 |= (b & 0x7F) << 14; if (b & 0x80) {
                b = this.view.getUint8(offset++); part0 |= (b & 0x7F) << 21; if (b & 0x80) {
                b = this.view.getUint8(offset++); part1  = (b & 0x7F)      ; if (b & 0x80) {
                b = this.view.getUint8(offset++); part1 |= (b & 0x7F) <<  7; if (b & 0x80) {
                b = this.view.getUint8(offset++); part1 |= (b & 0x7F) << 14; if (b & 0x80) {
                b = this.view.getUint8(offset++); part1 |= (b & 0x7F) << 21; if (b & 0x80) {
                b = this.view.getUint8(offset++); part2  = (b & 0x7F)      ; if (b & 0x80) {
                b = this.view.getUint8(offset++); part2 |= (b & 0x7F) <<  7; if (b & 0x80) {
                throw Error("Buffer overrun"); }}}}}}}}}}
                var value = Long.fromBits(part0 | (part1 << 28), (part1 >>> 4) | (part2) << 24, false);
                if (relative) {
                    this.offset = offset;
                    return value;
                } else {
                    return {
                        'value': value,
                        'length': offset-start
                    };
                }
            };

            /**
             * Reads a zig-zag encoded 64bit base 128 variable-length integer. Requires Long.js.
             * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
             *  read if omitted.
             * @returns {!Long|!{value: Long, length: number}} The value read if offset is omitted, else the value read and
             *  the actual number of bytes read.
             * @throws {Error} If it's not a valid varint
             * @expose
             */
            ByteBufferPrototype.readVarint64ZigZag = function(offset) {
                var val = this.readVarint64(offset);
                if (val && val['value'] instanceof Long)
                    val["value"] = ByteBuffer.zigZagDecode64(val["value"]);
                else
                    val = ByteBuffer.zigZagDecode64(val);
                return val;
            };

        } // Long


        // types/strings/cstring

        /**
         * Writes a NULL-terminated UTF8 encoded string. For this to work the specified string must not contain any NULL
         *  characters itself.
         * @param {string} str String to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  contained in `str` + 1 if omitted.
         * @returns {!ByteBuffer|number} this if offset is omitted, else the actual number of bytes written
         * @expose
         */
        ByteBufferPrototype.writeCString = function(str, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            var i,
                k = str.length;
            if (!this.noAssert) {
                if (typeof str !== 'string')
                    throw TypeError("Illegal str: Not a string");
                for (i=0; i<k; ++i) {
                    if (str.charCodeAt(i) === 0)
                        throw RangeError("Illegal str: Contains NULL-characters");
                }
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            // UTF8 strings do not contain zero bytes in between except for the zero character, so:
            k = utfx.calculateUTF16asUTF8(stringSource(str))[1];
            offset += k+1;
            var capacity12 = this.buffer.byteLength;
            if (offset > capacity12)
                this.resize((capacity12 *= 2) > offset ? capacity12 : offset);
            offset -= k+1;
            utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
                this.view.setUint8(offset++, b);
            }.bind(this));
            this.view.setUint8(offset++, 0);
            if (relative) {
                this.offset = offset;
                return this;
            }
            return k;
        };

        /**
         * Reads a NULL-terminated UTF8 encoded string. For this to work the string read must not contain any NULL characters
         *  itself.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  read if omitted.
         * @returns {string|!{string: string, length: number}} The string read if offset is omitted, else the string
         *  read and the actual number of bytes read.
         * @expose
         */
        ByteBufferPrototype.readCString = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 1 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength);
            }
            var start = offset,
                temp;
            // UTF8 strings do not contain zero bytes in between except for the zero character itself, so:
            var sd, b = -1;
            utfx.decodeUTF8toUTF16(function() {
                if (b === 0) return null;
                if (offset >= this.limit)
                    throw RangeError("Illegal range: Truncated data, "+offset+" < "+this.limit);
                return (b = this.view.getUint8(offset++)) === 0 ? null : b;
            }.bind(this), sd = stringDestination(), true);
            if (relative) {
                this.offset = offset;
                return sd();
            } else {
                return {
                    "string": sd(),
                    "length": offset - start
                };
            }
        };

        // types/strings/istring

        /**
         * Writes a length as uint32 prefixed UTF8 encoded string.
         * @param {string} str String to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  written if omitted.
         * @returns {!ByteBuffer|number} `this` if `offset` is omitted, else the actual number of bytes written
         * @expose
         * @see ByteBuffer#writeVarint32
         */
        ByteBufferPrototype.writeIString = function(str, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof str !== 'string')
                    throw TypeError("Illegal str: Not a string");
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            var start = offset,
                k;
            k = utfx.calculateUTF16asUTF8(stringSource(str), this.noAssert)[1];
            offset += 4+k;
            var capacity13 = this.buffer.byteLength;
            if (offset > capacity13)
                this.resize((capacity13 *= 2) > offset ? capacity13 : offset);
            offset -= 4+k;
            this.view.setUint32(offset, k, this.littleEndian);
            offset += 4;
            utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
                this.view.setUint8(offset++, b);
            }.bind(this));
            if (offset !== start + 4 + k)
                throw RangeError("Illegal range: Truncated data, "+offset+" == "+(offset+4+k));
            if (relative) {
                this.offset = offset;
                return this;
            }
            return offset - start;
        };

        /**
         * Reads a length as uint32 prefixed UTF8 encoded string.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  read if omitted.
         * @returns {string|!{string: string, length: number}} The string read if offset is omitted, else the string
         *  read and the actual number of bytes read.
         * @expose
         * @see ByteBuffer#readVarint32
         */
        ByteBufferPrototype.readIString = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 4 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+4+") <= "+this.buffer.byteLength);
            }
            var temp = 0,
                start = offset,
                str;
            temp = this.view.getUint32(offset, this.littleEndian);
            offset += 4;
            var k = offset + temp,
                sd;
            utfx.decodeUTF8toUTF16(function() {
                return offset < k ? this.view.getUint8(offset++) : null;
            }.bind(this), sd = stringDestination(), this.noAssert);
            str = sd();
            if (relative) {
                this.offset = offset;
                return str;
            } else {
                return {
                    'string': str,
                    'length': offset - start
                };
            }
        };

        // types/strings/utf8string

        /**
         * Metrics representing number of UTF8 characters. Evaluates to `c`.
         * @type {string}
         * @const
         * @expose
         */
        ByteBuffer.METRICS_CHARS = 'c';

        /**
         * Metrics representing number of bytes. Evaluates to `b`.
         * @type {string}
         * @const
         * @expose
         */
        ByteBuffer.METRICS_BYTES = 'b';

        /**
         * Writes an UTF8 encoded string.
         * @param {string} str String to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} if omitted.
         * @returns {!ByteBuffer|number} this if offset is omitted, else the actual number of bytes written.
         * @expose
         */
        ByteBufferPrototype.writeUTF8String = function(str, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            var k;
            var start = offset;
            k = utfx.calculateUTF16asUTF8(stringSource(str))[1];
            offset += k;
            var capacity14 = this.buffer.byteLength;
            if (offset > capacity14)
                this.resize((capacity14 *= 2) > offset ? capacity14 : offset);
            offset -= k;
            utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
                this.view.setUint8(offset++, b);
            }.bind(this));
            if (relative) {
                this.offset = offset;
                return this;
            }
            return offset - start;
        };

        /**
         * Writes an UTF8 encoded string. This is an alias of {@link ByteBuffer#writeUTF8String}.
         * @function
         * @param {string} str String to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} if omitted.
         * @returns {!ByteBuffer|number} this if offset is omitted, else the actual number of bytes written.
         * @expose
         */
        ByteBufferPrototype.writeString = ByteBufferPrototype.writeUTF8String;

        /**
         * Calculates the number of UTF8 characters of a string. JavaScript itself uses UTF-16, so that a string's
         *  `length` property does not reflect its actual UTF8 size if it contains code points larger than 0xFFFF.
         * @function
         * @param {string} str String to calculate
         * @returns {number} Number of UTF8 characters
         * @expose
         */
        ByteBuffer.calculateUTF8Chars = function(str) {
            return utfx.calculateUTF16asUTF8(stringSource(str))[0];
        };

        /**
         * Calculates the number of UTF8 bytes of a string.
         * @function
         * @param {string} str String to calculate
         * @returns {number} Number of UTF8 bytes
         * @expose
         */
        ByteBuffer.calculateUTF8Bytes = function(str) {
            return utfx.calculateUTF16asUTF8(stringSource(str))[1];
        };

        /**
         * Reads an UTF8 encoded string.
         * @param {number} length Number of characters or bytes to read.
         * @param {string=} metrics Metrics specifying what `length` is meant to count. Defaults to
         *  {@link ByteBuffer.METRICS_CHARS}.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  read if omitted.
         * @returns {string|!{string: string, length: number}} The string read if offset is omitted, else the string
         *  read and the actual number of bytes read.
         * @expose
         */
        ByteBufferPrototype.readUTF8String = function(length, metrics, offset) {
            if (typeof metrics === 'number') {
                offset = metrics;
                metrics = undefined;
            }
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (typeof metrics === 'undefined') metrics = ByteBuffer.METRICS_CHARS;
            if (!this.noAssert) {
                if (typeof length !== 'number' || length % 1 !== 0)
                    throw TypeError("Illegal length: "+length+" (not an integer)");
                length |= 0;
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            var i = 0,
                start = offset,
                sd;
            if (metrics === ByteBuffer.METRICS_CHARS) { // The same for node and the browser
                sd = stringDestination();
                utfx.decodeUTF8(function() {
                    return i < length && offset < this.limit ? this.view.getUint8(offset++) : null;
                }.bind(this), function(cp) {
                    ++i; utfx.UTF8toUTF16(cp, sd);
                }.bind(this));
                if (i !== length)
                    throw RangeError("Illegal range: Truncated data, "+i+" == "+length);
                if (relative) {
                    this.offset = offset;
                    return sd();
                } else {
                    return {
                        "string": sd(),
                        "length": offset - start
                    };
                }
            } else if (metrics === ByteBuffer.METRICS_BYTES) {
                if (!this.noAssert) {
                    if (typeof offset !== 'number' || offset % 1 !== 0)
                        throw TypeError("Illegal offset: "+offset+" (not an integer)");
                    offset >>>= 0;
                    if (offset < 0 || offset + length > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= "+offset+" (+"+length+") <= "+this.buffer.byteLength);
                }
                var k = offset + length;
                utfx.decodeUTF8toUTF16(function() {
                    return offset < k ? this.view.getUint8(offset++) : null;
                }.bind(this), sd = stringDestination(), this.noAssert);
                if (offset !== k)
                    throw RangeError("Illegal range: Truncated data, "+offset+" == "+k);
                if (relative) {
                    this.offset = offset;
                    return sd();
                } else {
                    return {
                        'string': sd(),
                        'length': offset - start
                    };
                }
            } else
                throw TypeError("Unsupported metrics: "+metrics);
        };

        /**
         * Reads an UTF8 encoded string. This is an alias of {@link ByteBuffer#readUTF8String}.
         * @function
         * @param {number} length Number of characters or bytes to read
         * @param {number=} metrics Metrics specifying what `n` is meant to count. Defaults to
         *  {@link ByteBuffer.METRICS_CHARS}.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  read if omitted.
         * @returns {string|!{string: string, length: number}} The string read if offset is omitted, else the string
         *  read and the actual number of bytes read.
         * @expose
         */
        ByteBufferPrototype.readString = ByteBufferPrototype.readUTF8String;

        // types/strings/vstring

        /**
         * Writes a length as varint32 prefixed UTF8 encoded string.
         * @param {string} str String to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  written if omitted.
         * @returns {!ByteBuffer|number} `this` if `offset` is omitted, else the actual number of bytes written
         * @expose
         * @see ByteBuffer#writeVarint32
         */
        ByteBufferPrototype.writeVString = function(str, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof str !== 'string')
                    throw TypeError("Illegal str: Not a string");
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            var start = offset,
                k, l;
            k = utfx.calculateUTF16asUTF8(stringSource(str), this.noAssert)[1];
            l = ByteBuffer.calculateVarint32(k);
            offset += l+k;
            var capacity15 = this.buffer.byteLength;
            if (offset > capacity15)
                this.resize((capacity15 *= 2) > offset ? capacity15 : offset);
            offset -= l+k;
            offset += this.writeVarint32(k, offset);
            utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
                this.view.setUint8(offset++, b);
            }.bind(this));
            if (offset !== start+k+l)
                throw RangeError("Illegal range: Truncated data, "+offset+" == "+(offset+k+l));
            if (relative) {
                this.offset = offset;
                return this;
            }
            return offset - start;
        };

        /**
         * Reads a length as varint32 prefixed UTF8 encoded string.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  read if omitted.
         * @returns {string|!{string: string, length: number}} The string read if offset is omitted, else the string
         *  read and the actual number of bytes read.
         * @expose
         * @see ByteBuffer#readVarint32
         */
        ByteBufferPrototype.readVString = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 1 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength);
            }
            var temp = this.readVarint32(offset),
                start = offset,
                str;
            offset += temp['length'];
            temp = temp['value'];
            var k = offset + temp,
                sd = stringDestination();
            utfx.decodeUTF8toUTF16(function() {
                return offset < k ? this.view.getUint8(offset++) : null;
            }.bind(this), sd, this.noAssert);
            str = sd();
            if (relative) {
                this.offset = offset;
                return str;
            } else {
                return {
                    'string': str,
                    'length': offset - start
                };
            }
        };


        /**
         * Appends some data to this ByteBuffer. This will overwrite any contents behind the specified offset up to the appended
         *  data's length.
         * @param {!ByteBuffer|!ArrayBuffer|!Uint8Array|string} source Data to append. If `source` is a ByteBuffer, its offsets
         *  will be modified according to the performed read operation.
         * @param {(string|number)=} encoding Encoding if `data` is a string ("base64", "hex", "binary", defaults to "utf8")
         * @param {number=} offset Offset to append at. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  read if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         * @example A relative `<01 02>03.append(<04 05>)` will result in `<01 02 04 05>, 04 05|`
         * @example An absolute `<01 02>03.append(04 05>, 1)` will result in `<01 04>05, 04 05|`
         */
        ByteBufferPrototype.append = function(source, encoding, offset) {
            if (typeof encoding === 'number' || typeof encoding !== 'string') {
                offset = encoding;
                encoding = undefined;
            }
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            if (!(source instanceof ByteBuffer))
                source = ByteBuffer.wrap(source, encoding);
            var length = source.limit - source.offset;
            if (length <= 0) return this; // Nothing to append
            offset += length;
            var capacity16 = this.buffer.byteLength;
            if (offset > capacity16)
                this.resize((capacity16 *= 2) > offset ? capacity16 : offset);
            offset -= length;
            new Uint8Array(this.buffer, offset).set(new Uint8Array(source.buffer).subarray(source.offset, source.limit));
            source.offset += length;
            if (relative) this.offset += length;
            return this;
        };

        /**
         * Appends this ByteBuffer's contents to another ByteBuffer. This will overwrite any contents at and after the
            specified offset up to the length of this ByteBuffer's data.
         * @param {!ByteBuffer} target Target ByteBuffer
         * @param {number=} offset Offset to append to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  read if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         * @see ByteBuffer#append
         */
        ByteBufferPrototype.appendTo = function(target, offset) {
            target.append(this, offset);
            return this;
        };

        /**
         * Enables or disables assertions of argument types and offsets. Assertions are enabled by default but you can opt to
         *  disable them if your code already makes sure that everything is valid.
         * @param {boolean} assert `true` to enable assertions, otherwise `false`
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.assert = function(assert) {
            this.noAssert = !assert;
            return this;
        };

        /**
         * Gets the capacity of this ByteBuffer's backing buffer.
         * @returns {number} Capacity of the backing buffer
         * @expose
         */
        ByteBufferPrototype.capacity = function() {
            return this.buffer.byteLength;
        };

        /**
         * Clears this ByteBuffer's offsets by setting {@link ByteBuffer#offset} to `0` and {@link ByteBuffer#limit} to the
         *  backing buffer's capacity. Discards {@link ByteBuffer#markedOffset}.
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.clear = function() {
            this.offset = 0;
            this.limit = this.buffer.byteLength;
            this.markedOffset = -1;
            return this;
        };

        /**
         * Creates a cloned instance of this ByteBuffer, preset with this ByteBuffer's values for {@link ByteBuffer#offset},
         *  {@link ByteBuffer#markedOffset} and {@link ByteBuffer#limit}.
         * @param {boolean=} copy Whether to copy the backing buffer or to return another view on the same, defaults to `false`
         * @returns {!ByteBuffer} Cloned instance
         * @expose
         */
        ByteBufferPrototype.clone = function(copy) {
            var bb = new ByteBuffer(0, this.littleEndian, this.noAssert);
            if (copy) {
                var buffer = new ArrayBuffer(this.buffer.byteLength);
                new Uint8Array(buffer).set(this.buffer);
                bb.buffer = buffer;
                bb.view = new DataView(buffer);
            } else {
                bb.buffer = this.buffer;
                bb.view = this.view;
            }
            bb.offset = this.offset;
            bb.markedOffset = this.markedOffset;
            bb.limit = this.limit;
            return bb;
        };

        /**
         * Compacts this ByteBuffer to be backed by a {@link ByteBuffer#buffer} of its contents' length. Contents are the bytes
         *  between {@link ByteBuffer#offset} and {@link ByteBuffer#limit}. Will set `offset = 0` and `limit = capacity` and
         *  adapt {@link ByteBuffer#markedOffset} to the same relative position if set.
         * @param {number=} begin Offset to start at, defaults to {@link ByteBuffer#offset}
         * @param {number=} end Offset to end at, defaults to {@link ByteBuffer#limit}
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.compact = function(begin, end) {
            if (typeof begin === 'undefined') begin = this.offset;
            if (typeof end === 'undefined') end = this.limit;
            if (!this.noAssert) {
                if (typeof begin !== 'number' || begin % 1 !== 0)
                    throw TypeError("Illegal begin: Not an integer");
                begin >>>= 0;
                if (typeof end !== 'number' || end % 1 !== 0)
                    throw TypeError("Illegal end: Not an integer");
                end >>>= 0;
                if (begin < 0 || begin > end || end > this.buffer.byteLength)
                    throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);
            }
            if (begin === 0 && end === this.buffer.byteLength)
                return this; // Already compacted
            var len = end - begin;
            if (len === 0) {
                this.buffer = EMPTY_BUFFER;
                this.view = null;
                if (this.markedOffset >= 0) this.markedOffset -= begin;
                this.offset = 0;
                this.limit = 0;
                return this;
            }
            var buffer = new ArrayBuffer(len);
            new Uint8Array(buffer).set(new Uint8Array(this.buffer).subarray(begin, end));
            this.buffer = buffer;
            this.view = new DataView(buffer);
            if (this.markedOffset >= 0) this.markedOffset -= begin;
            this.offset = 0;
            this.limit = len;
            return this;
        };

        /**
         * Creates a copy of this ByteBuffer's contents. Contents are the bytes between {@link ByteBuffer#offset} and
         *  {@link ByteBuffer#limit}.
         * @param {number=} begin Begin offset, defaults to {@link ByteBuffer#offset}.
         * @param {number=} end End offset, defaults to {@link ByteBuffer#limit}.
         * @returns {!ByteBuffer} Copy
         * @expose
         */
        ByteBufferPrototype.copy = function(begin, end) {
            if (typeof begin === 'undefined') begin = this.offset;
            if (typeof end === 'undefined') end = this.limit;
            if (!this.noAssert) {
                if (typeof begin !== 'number' || begin % 1 !== 0)
                    throw TypeError("Illegal begin: Not an integer");
                begin >>>= 0;
                if (typeof end !== 'number' || end % 1 !== 0)
                    throw TypeError("Illegal end: Not an integer");
                end >>>= 0;
                if (begin < 0 || begin > end || end > this.buffer.byteLength)
                    throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);
            }
            if (begin === end)
                return new ByteBuffer(0, this.littleEndian, this.noAssert);
            var capacity = end - begin,
                bb = new ByteBuffer(capacity, this.littleEndian, this.noAssert);
            bb.offset = 0;
            bb.limit = capacity;
            if (bb.markedOffset >= 0) bb.markedOffset -= begin;
            this.copyTo(bb, 0, begin, end);
            return bb;
        };

        /**
         * Copies this ByteBuffer's contents to another ByteBuffer. Contents are the bytes between {@link ByteBuffer#offset} and
         *  {@link ByteBuffer#limit}.
         * @param {!ByteBuffer} target Target ByteBuffer
         * @param {number=} targetOffset Offset to copy to. Will use and increase the target's {@link ByteBuffer#offset}
         *  by the number of bytes copied if omitted.
         * @param {number=} sourceOffset Offset to start copying from. Will use and increase {@link ByteBuffer#offset} by the
         *  number of bytes copied if omitted.
         * @param {number=} sourceLimit Offset to end copying from, defaults to {@link ByteBuffer#limit}
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.copyTo = function(target, targetOffset, sourceOffset, sourceLimit) {
            var relative,
                targetRelative;
            if (!this.noAssert) {
                if (!ByteBuffer.isByteBuffer(target))
                    throw TypeError("Illegal target: Not a ByteBuffer");
            }
            targetOffset = (targetRelative = typeof targetOffset === 'undefined') ? target.offset : targetOffset | 0;
            sourceOffset = (relative = typeof sourceOffset === 'undefined') ? this.offset : sourceOffset | 0;
            sourceLimit = typeof sourceLimit === 'undefined' ? this.limit : sourceLimit | 0;

            if (targetOffset < 0 || targetOffset > target.buffer.byteLength)
                throw RangeError("Illegal target range: 0 <= "+targetOffset+" <= "+target.buffer.byteLength);
            if (sourceOffset < 0 || sourceLimit > this.buffer.byteLength)
                throw RangeError("Illegal source range: 0 <= "+sourceOffset+" <= "+this.buffer.byteLength);

            var len = sourceLimit - sourceOffset;
            if (len === 0)
                return target; // Nothing to copy

            target.ensureCapacity(targetOffset + len);

            new Uint8Array(target.buffer).set(new Uint8Array(this.buffer).subarray(sourceOffset, sourceLimit), targetOffset);

            if (relative) this.offset += len;
            if (targetRelative) target.offset += len;

            return this;
        };

        /**
         * Makes sure that this ByteBuffer is backed by a {@link ByteBuffer#buffer} of at least the specified capacity. If the
         *  current capacity is exceeded, it will be doubled. If double the current capacity is less than the required capacity,
         *  the required capacity will be used instead.
         * @param {number} capacity Required capacity
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.ensureCapacity = function(capacity) {
            var current = this.buffer.byteLength;
            if (current < capacity)
                return this.resize((current *= 2) > capacity ? current : capacity);
            return this;
        };

        /**
         * Overwrites this ByteBuffer's contents with the specified value. Contents are the bytes between
         *  {@link ByteBuffer#offset} and {@link ByteBuffer#limit}.
         * @param {number|string} value Byte value to fill with. If given as a string, the first character is used.
         * @param {number=} begin Begin offset. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  written if omitted. defaults to {@link ByteBuffer#offset}.
         * @param {number=} end End offset, defaults to {@link ByteBuffer#limit}.
         * @returns {!ByteBuffer} this
         * @expose
         * @example `someByteBuffer.clear().fill(0)` fills the entire backing buffer with zeroes
         */
        ByteBufferPrototype.fill = function(value, begin, end) {
            var relative = typeof begin === 'undefined';
            if (relative) begin = this.offset;
            if (typeof value === 'string' && value.length > 0)
                value = value.charCodeAt(0);
            if (typeof begin === 'undefined') begin = this.offset;
            if (typeof end === 'undefined') end = this.limit;
            if (!this.noAssert) {
                if (typeof value !== 'number' || value % 1 !== 0)
                    throw TypeError("Illegal value: "+value+" (not an integer)");
                value |= 0;
                if (typeof begin !== 'number' || begin % 1 !== 0)
                    throw TypeError("Illegal begin: Not an integer");
                begin >>>= 0;
                if (typeof end !== 'number' || end % 1 !== 0)
                    throw TypeError("Illegal end: Not an integer");
                end >>>= 0;
                if (begin < 0 || begin > end || end > this.buffer.byteLength)
                    throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);
            }
            if (begin >= end)
                return this; // Nothing to fill
            while (begin < end) this.view.setUint8(begin++, value);
            if (relative) this.offset = begin;
            return this;
        };

        /**
         * Makes this ByteBuffer ready for a new sequence of write or relative read operations. Sets `limit = offset` and
         *  `offset = 0`. Make sure always to flip a ByteBuffer when all relative read or write operations are complete.
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.flip = function() {
            this.limit = this.offset;
            this.offset = 0;
            return this;
        };
        /**
         * Marks an offset on this ByteBuffer to be used later.
         * @param {number=} offset Offset to mark. Defaults to {@link ByteBuffer#offset}.
         * @returns {!ByteBuffer} this
         * @throws {TypeError} If `offset` is not a valid number
         * @throws {RangeError} If `offset` is out of bounds
         * @see ByteBuffer#reset
         * @expose
         */
        ByteBufferPrototype.mark = function(offset) {
            offset = typeof offset === 'undefined' ? this.offset : offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            this.markedOffset = offset;
            return this;
        };
        /**
         * Sets the byte order.
         * @param {boolean} littleEndian `true` for little endian byte order, `false` for big endian
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.order = function(littleEndian) {
            if (!this.noAssert) {
                if (typeof littleEndian !== 'boolean')
                    throw TypeError("Illegal littleEndian: Not a boolean");
            }
            this.littleEndian = !!littleEndian;
            return this;
        };

        /**
         * Switches (to) little endian byte order.
         * @param {boolean=} littleEndian Defaults to `true`, otherwise uses big endian
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.LE = function(littleEndian) {
            this.littleEndian = typeof littleEndian !== 'undefined' ? !!littleEndian : true;
            return this;
        };

        /**
         * Switches (to) big endian byte order.
         * @param {boolean=} bigEndian Defaults to `true`, otherwise uses little endian
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.BE = function(bigEndian) {
            this.littleEndian = typeof bigEndian !== 'undefined' ? !bigEndian : false;
            return this;
        };
        /**
         * Prepends some data to this ByteBuffer. This will overwrite any contents before the specified offset up to the
         *  prepended data's length. If there is not enough space available before the specified `offset`, the backing buffer
         *  will be resized and its contents moved accordingly.
         * @param {!ByteBuffer|string|!ArrayBuffer} source Data to prepend. If `source` is a ByteBuffer, its offset will be
         *  modified according to the performed read operation.
         * @param {(string|number)=} encoding Encoding if `data` is a string ("base64", "hex", "binary", defaults to "utf8")
         * @param {number=} offset Offset to prepend at. Will use and decrease {@link ByteBuffer#offset} by the number of bytes
         *  prepended if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         * @example A relative `00<01 02 03>.prepend(<04 05>)` results in `<04 05 01 02 03>, 04 05|`
         * @example An absolute `00<01 02 03>.prepend(<04 05>, 2)` results in `04<05 02 03>, 04 05|`
         */
        ByteBufferPrototype.prepend = function(source, encoding, offset) {
            if (typeof encoding === 'number' || typeof encoding !== 'string') {
                offset = encoding;
                encoding = undefined;
            }
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            if (!(source instanceof ByteBuffer))
                source = ByteBuffer.wrap(source, encoding);
            var len = source.limit - source.offset;
            if (len <= 0) return this; // Nothing to prepend
            var diff = len - offset;
            var arrayView;
            if (diff > 0) { // Not enough space before offset, so resize + move
                var buffer = new ArrayBuffer(this.buffer.byteLength + diff);
                arrayView = new Uint8Array(buffer);
                arrayView.set(new Uint8Array(this.buffer).subarray(offset, this.buffer.byteLength), len);
                this.buffer = buffer;
                this.view = new DataView(buffer);
                this.offset += diff;
                if (this.markedOffset >= 0) this.markedOffset += diff;
                this.limit += diff;
                offset += diff;
            } else {
                arrayView = new Uint8Array(this.buffer);
            }
            arrayView.set(new Uint8Array(source.buffer).subarray(source.offset, source.limit), offset - len);
            source.offset = source.limit;
            if (relative)
                this.offset -= len;
            return this;
        };

        /**
         * Prepends this ByteBuffer to another ByteBuffer. This will overwrite any contents before the specified offset up to the
         *  prepended data's length. If there is not enough space available before the specified `offset`, the backing buffer
         *  will be resized and its contents moved accordingly.
         * @param {!ByteBuffer} target Target ByteBuffer
         * @param {number=} offset Offset to prepend at. Will use and decrease {@link ByteBuffer#offset} by the number of bytes
         *  prepended if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         * @see ByteBuffer#prepend
         */
        ByteBufferPrototype.prependTo = function(target, offset) {
            target.prepend(this, offset);
            return this;
        };
        /**
         * Prints debug information about this ByteBuffer's contents.
         * @param {function(string)=} out Output function to call, defaults to console.log
         * @expose
         */
        ByteBufferPrototype.printDebug = function(out) {
            if (typeof out !== 'function') out = console.log.bind(console);
            out(
                this.toString()+"\n"+
                "-------------------------------------------------------------------\n"+
                this.toDebug(/* columns */ true)
            );
        };

        /**
         * Gets the number of remaining readable bytes. Contents are the bytes between {@link ByteBuffer#offset} and
         *  {@link ByteBuffer#limit}, so this returns `limit - offset`.
         * @returns {number} Remaining readable bytes. May be negative if `offset > limit`.
         * @expose
         */
        ByteBufferPrototype.remaining = function() {
            return this.limit - this.offset;
        };
        /**
         * Resets this ByteBuffer's {@link ByteBuffer#offset}. If an offset has been marked through {@link ByteBuffer#mark}
         *  before, `offset` will be set to {@link ByteBuffer#markedOffset}, which will then be discarded. If no offset has been
         *  marked, sets `offset = 0`.
         * @returns {!ByteBuffer} this
         * @see ByteBuffer#mark
         * @expose
         */
        ByteBufferPrototype.reset = function() {
            if (this.markedOffset >= 0) {
                this.offset = this.markedOffset;
                this.markedOffset = -1;
            } else {
                this.offset = 0;
            }
            return this;
        };
        /**
         * Resizes this ByteBuffer to be backed by a buffer of at least the given capacity. Will do nothing if already that
         *  large or larger.
         * @param {number} capacity Capacity required
         * @returns {!ByteBuffer} this
         * @throws {TypeError} If `capacity` is not a number
         * @throws {RangeError} If `capacity < 0`
         * @expose
         */
        ByteBufferPrototype.resize = function(capacity) {
            if (!this.noAssert) {
                if (typeof capacity !== 'number' || capacity % 1 !== 0)
                    throw TypeError("Illegal capacity: "+capacity+" (not an integer)");
                capacity |= 0;
                if (capacity < 0)
                    throw RangeError("Illegal capacity: 0 <= "+capacity);
            }
            if (this.buffer.byteLength < capacity) {
                var buffer = new ArrayBuffer(capacity);
                new Uint8Array(buffer).set(new Uint8Array(this.buffer));
                this.buffer = buffer;
                this.view = new DataView(buffer);
            }
            return this;
        };
        /**
         * Reverses this ByteBuffer's contents.
         * @param {number=} begin Offset to start at, defaults to {@link ByteBuffer#offset}
         * @param {number=} end Offset to end at, defaults to {@link ByteBuffer#limit}
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.reverse = function(begin, end) {
            if (typeof begin === 'undefined') begin = this.offset;
            if (typeof end === 'undefined') end = this.limit;
            if (!this.noAssert) {
                if (typeof begin !== 'number' || begin % 1 !== 0)
                    throw TypeError("Illegal begin: Not an integer");
                begin >>>= 0;
                if (typeof end !== 'number' || end % 1 !== 0)
                    throw TypeError("Illegal end: Not an integer");
                end >>>= 0;
                if (begin < 0 || begin > end || end > this.buffer.byteLength)
                    throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);
            }
            if (begin === end)
                return this; // Nothing to reverse
            Array.prototype.reverse.call(new Uint8Array(this.buffer).subarray(begin, end));
            this.view = new DataView(this.buffer); // FIXME: Why exactly is this necessary?
            return this;
        };
        /**
         * Skips the next `length` bytes. This will just advance
         * @param {number} length Number of bytes to skip. May also be negative to move the offset back.
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.skip = function(length) {
            if (!this.noAssert) {
                if (typeof length !== 'number' || length % 1 !== 0)
                    throw TypeError("Illegal length: "+length+" (not an integer)");
                length |= 0;
            }
            var offset = this.offset + length;
            if (!this.noAssert) {
                if (offset < 0 || offset > this.buffer.byteLength)
                    throw RangeError("Illegal length: 0 <= "+this.offset+" + "+length+" <= "+this.buffer.byteLength);
            }
            this.offset = offset;
            return this;
        };

        /**
         * Slices this ByteBuffer by creating a cloned instance with `offset = begin` and `limit = end`.
         * @param {number=} begin Begin offset, defaults to {@link ByteBuffer#offset}.
         * @param {number=} end End offset, defaults to {@link ByteBuffer#limit}.
         * @returns {!ByteBuffer} Clone of this ByteBuffer with slicing applied, backed by the same {@link ByteBuffer#buffer}
         * @expose
         */
        ByteBufferPrototype.slice = function(begin, end) {
            if (typeof begin === 'undefined') begin = this.offset;
            if (typeof end === 'undefined') end = this.limit;
            if (!this.noAssert) {
                if (typeof begin !== 'number' || begin % 1 !== 0)
                    throw TypeError("Illegal begin: Not an integer");
                begin >>>= 0;
                if (typeof end !== 'number' || end % 1 !== 0)
                    throw TypeError("Illegal end: Not an integer");
                end >>>= 0;
                if (begin < 0 || begin > end || end > this.buffer.byteLength)
                    throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);
            }
            var bb = this.clone();
            bb.offset = begin;
            bb.limit = end;
            return bb;
        };
        /**
         * Returns a copy of the backing buffer that contains this ByteBuffer's contents. Contents are the bytes between
         *  {@link ByteBuffer#offset} and {@link ByteBuffer#limit}. Will transparently {@link ByteBuffer#flip} this
         *  ByteBuffer if `offset > limit` but the actual offsets remain untouched.
         * @param {boolean=} forceCopy If `true` returns a copy, otherwise returns a view referencing the same memory if
         *  possible. Defaults to `false`
         * @returns {!ArrayBuffer} Contents as an ArrayBuffer
         * @expose
         */
        ByteBufferPrototype.toBuffer = function(forceCopy) {
            var offset = this.offset,
                limit = this.limit;
            if (offset > limit) {
                var t = offset;
                offset = limit;
                limit = t;
            }
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: Not an integer");
                offset >>>= 0;
                if (typeof limit !== 'number' || limit % 1 !== 0)
                    throw TypeError("Illegal limit: Not an integer");
                limit >>>= 0;
                if (offset < 0 || offset > limit || limit > this.buffer.byteLength)
                    throw RangeError("Illegal range: 0 <= "+offset+" <= "+limit+" <= "+this.buffer.byteLength);
            }
            // NOTE: It's not possible to have another ArrayBuffer reference the same memory as the backing buffer. This is
            // possible with Uint8Array#subarray only, but we have to return an ArrayBuffer by contract. So:
            if (!forceCopy && offset === 0 && limit === this.buffer.byteLength) {
                return this.buffer;
            }
            if (offset === limit) {
                return EMPTY_BUFFER;
            }
            var buffer = new ArrayBuffer(limit - offset);
            new Uint8Array(buffer).set(new Uint8Array(this.buffer).subarray(offset, limit), 0);
            return buffer;
        };

        /**
         * Returns a raw buffer compacted to contain this ByteBuffer's contents. Contents are the bytes between
         *  {@link ByteBuffer#offset} and {@link ByteBuffer#limit}. Will transparently {@link ByteBuffer#flip} this
         *  ByteBuffer if `offset > limit` but the actual offsets remain untouched. This is an alias of
         *  {@link ByteBuffer#toBuffer}.
         * @function
         * @param {boolean=} forceCopy If `true` returns a copy, otherwise returns a view referencing the same memory.
         *  Defaults to `false`
         * @returns {!ArrayBuffer} Contents as an ArrayBuffer
         * @expose
         */
        ByteBufferPrototype.toArrayBuffer = ByteBufferPrototype.toBuffer;


        /**
         * Converts the ByteBuffer's contents to a string.
         * @param {string=} encoding Output encoding. Returns an informative string representation if omitted but also allows
         *  direct conversion to "utf8", "hex", "base64" and "binary" encoding. "debug" returns a hex representation with
         *  highlighted offsets.
         * @param {number=} begin Offset to begin at, defaults to {@link ByteBuffer#offset}
         * @param {number=} end Offset to end at, defaults to {@link ByteBuffer#limit}
         * @returns {string} String representation
         * @throws {Error} If `encoding` is invalid
         * @expose
         */
        ByteBufferPrototype.toString = function(encoding, begin, end) {
            if (typeof encoding === 'undefined')
                return "ByteBufferAB(offset="+this.offset+",markedOffset="+this.markedOffset+",limit="+this.limit+",capacity="+this.capacity()+")";
            if (typeof encoding === 'number')
                encoding = "utf8",
                begin = encoding,
                end = begin;
            switch (encoding) {
                case "utf8":
                    return this.toUTF8(begin, end);
                case "base64":
                    return this.toBase64(begin, end);
                case "hex":
                    return this.toHex(begin, end);
                case "binary":
                    return this.toBinary(begin, end);
                case "debug":
                    return this.toDebug();
                case "columns":
                    return this.toColumns();
                default:
                    throw Error("Unsupported encoding: "+encoding);
            }
        };

        // lxiv-embeddable

        /**
         * lxiv-embeddable (c) 2014 Daniel Wirtz <dcode@dcode.io>
         * Released under the Apache License, Version 2.0
         * see: https://github.com/dcodeIO/lxiv for details
         */
        var lxiv = function() {
            "use strict";

            /**
             * lxiv namespace.
             * @type {!Object.<string,*>}
             * @exports lxiv
             */
            var lxiv = {};

            /**
             * Character codes for output.
             * @type {!Array.<number>}
             * @inner
             */
            var aout = [
                65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
                81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102,
                103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118,
                119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47
            ];

            /**
             * Character codes for input.
             * @type {!Array.<number>}
             * @inner
             */
            var ain = [];
            for (var i=0, k=aout.length; i<k; ++i)
                ain[aout[i]] = i;

            /**
             * Encodes bytes to base64 char codes.
             * @param {!function():number|null} src Bytes source as a function returning the next byte respectively `null` if
             *  there are no more bytes left.
             * @param {!function(number)} dst Characters destination as a function successively called with each encoded char
             *  code.
             */
            lxiv.encode = function(src, dst) {
                var b, t;
                while ((b = src()) !== null) {
                    dst(aout[(b>>2)&0x3f]);
                    t = (b&0x3)<<4;
                    if ((b = src()) !== null) {
                        t |= (b>>4)&0xf;
                        dst(aout[(t|((b>>4)&0xf))&0x3f]);
                        t = (b&0xf)<<2;
                        if ((b = src()) !== null)
                            dst(aout[(t|((b>>6)&0x3))&0x3f]),
                            dst(aout[b&0x3f]);
                        else
                            dst(aout[t&0x3f]),
                            dst(61);
                    } else
                        dst(aout[t&0x3f]),
                        dst(61),
                        dst(61);
                }
            };

            /**
             * Decodes base64 char codes to bytes.
             * @param {!function():number|null} src Characters source as a function returning the next char code respectively
             *  `null` if there are no more characters left.
             * @param {!function(number)} dst Bytes destination as a function successively called with the next byte.
             * @throws {Error} If a character code is invalid
             */
            lxiv.decode = function(src, dst) {
                var c, t1, t2;
                function fail(c) {
                    throw Error("Illegal character code: "+c);
                }
                while ((c = src()) !== null) {
                    t1 = ain[c];
                    if (typeof t1 === 'undefined') fail(c);
                    if ((c = src()) !== null) {
                        t2 = ain[c];
                        if (typeof t2 === 'undefined') fail(c);
                        dst((t1<<2)>>>0|(t2&0x30)>>4);
                        if ((c = src()) !== null) {
                            t1 = ain[c];
                            if (typeof t1 === 'undefined')
                                if (c === 61) break; else fail(c);
                            dst(((t2&0xf)<<4)>>>0|(t1&0x3c)>>2);
                            if ((c = src()) !== null) {
                                t2 = ain[c];
                                if (typeof t2 === 'undefined')
                                    if (c === 61) break; else fail(c);
                                dst(((t1&0x3)<<6)>>>0|t2);
                            }
                        }
                    }
                }
            };

            /**
             * Tests if a string is valid base64.
             * @param {string} str String to test
             * @returns {boolean} `true` if valid, otherwise `false`
             */
            lxiv.test = function(str) {
                return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(str);
            };

            return lxiv;
        }();

        // encodings/base64

        /**
         * Encodes this ByteBuffer's contents to a base64 encoded string.
         * @param {number=} begin Offset to begin at, defaults to {@link ByteBuffer#offset}.
         * @param {number=} end Offset to end at, defaults to {@link ByteBuffer#limit}.
         * @returns {string} Base64 encoded string
         * @expose
         */
        ByteBufferPrototype.toBase64 = function(begin, end) {
            if (typeof begin === 'undefined')
                begin = this.offset;
            if (typeof end === 'undefined')
                end = this.limit;
            if (!this.noAssert) {
                if (typeof begin !== 'number' || begin % 1 !== 0)
                    throw TypeError("Illegal begin: Not an integer");
                begin >>>= 0;
                if (typeof end !== 'number' || end % 1 !== 0)
                    throw TypeError("Illegal end: Not an integer");
                end >>>= 0;
                if (begin < 0 || begin > end || end > this.buffer.byteLength)
                    throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);
            }
            var sd; lxiv.encode(function() {
                return begin < end ? this.view.getUint8(begin++) : null;
            }.bind(this), sd = stringDestination());
            return sd();
        };

        /**
         * Decodes a base64 encoded string to a ByteBuffer.
         * @param {string} str String to decode
         * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
         *  {@link ByteBuffer.DEFAULT_ENDIAN}.
         * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
         *  {@link ByteBuffer.DEFAULT_NOASSERT}.
         * @returns {!ByteBuffer} ByteBuffer
         * @expose
         */
        ByteBuffer.fromBase64 = function(str, littleEndian, noAssert) {
            if (!noAssert) {
                if (typeof str !== 'string')
                    throw TypeError("Illegal str: Not a string");
                if (str.length % 4 !== 0)
                    throw TypeError("Illegal str: Length not a multiple of 4");
            }
            var bb = new ByteBuffer(str.length/4*3, littleEndian, noAssert),
                i = 0;
            lxiv.decode(stringSource(str), function(b) {
                bb.view.setUint8(i++, b);
            });
            bb.limit = i;
            return bb;
        };

        /**
         * Encodes a binary string to base64 like `window.btoa` does.
         * @param {string} str Binary string
         * @returns {string} Base64 encoded string
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Window.btoa
         * @expose
         */
        ByteBuffer.btoa = function(str) {
            return ByteBuffer.fromBinary(str).toBase64();
        };

        /**
         * Decodes a base64 encoded string to binary like `window.atob` does.
         * @param {string} b64 Base64 encoded string
         * @returns {string} Binary string
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Window.atob
         * @expose
         */
        ByteBuffer.atob = function(b64) {
            return ByteBuffer.fromBase64(b64).toBinary();
        };

        // encodings/binary

        /**
         * Encodes this ByteBuffer to a binary encoded string, that is using only characters 0x00-0xFF as bytes.
         * @param {number=} begin Offset to begin at. Defaults to {@link ByteBuffer#offset}.
         * @param {number=} end Offset to end at. Defaults to {@link ByteBuffer#limit}.
         * @returns {string} Binary encoded string
         * @throws {RangeError} If `offset > limit`
         * @expose
         */
        ByteBufferPrototype.toBinary = function(begin, end) {
            begin = typeof begin === 'undefined' ? this.offset : begin;
            end = typeof end === 'undefined' ? this.limit : end;
            if (!this.noAssert) {
                if (typeof begin !== 'number' || begin % 1 !== 0)
                    throw TypeError("Illegal begin: Not an integer");
                begin >>>= 0;
                if (typeof end !== 'number' || end % 1 !== 0)
                    throw TypeError("Illegal end: Not an integer");
                end >>>= 0;
                if (begin < 0 || begin > end || end > this.buffer.byteLength)
                    throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);
            }
            if (begin === end)
                return "";
            var cc = [], pt = [];
            while (begin < end) {
                cc.push(this.view.getUint8(begin++));
                if (cc.length >= 1024)
                    pt.push(String.fromCharCode.apply(String, cc)),
                    cc = [];
            }
            return pt.join('') + String.fromCharCode.apply(String, cc);
        };

        /**
         * Decodes a binary encoded string, that is using only characters 0x00-0xFF as bytes, to a ByteBuffer.
         * @param {string} str String to decode
         * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
         *  {@link ByteBuffer.DEFAULT_ENDIAN}.
         * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
         *  {@link ByteBuffer.DEFAULT_NOASSERT}.
         * @returns {!ByteBuffer} ByteBuffer
         * @expose
         */
        ByteBuffer.fromBinary = function(str, littleEndian, noAssert) {
            if (!noAssert) {
                if (typeof str !== 'string')
                    throw TypeError("Illegal str: Not a string");
            }
            var i = 0, k = str.length, charCode,
                bb = new ByteBuffer(k, littleEndian, noAssert);
            while (i<k) {
                charCode = str.charCodeAt(i);
                if (!noAssert && charCode > 255)
                    throw RangeError("Illegal charCode at "+i+": 0 <= "+charCode+" <= 255");
                bb.view.setUint8(i++, charCode);
            }
            bb.limit = k;
            return bb;
        };

        // encodings/debug

        /**
         * Encodes this ByteBuffer to a hex encoded string with marked offsets. Offset symbols are:
         * * `<` : offset,
         * * `'` : markedOffset,
         * * `>` : limit,
         * * `|` : offset and limit,
         * * `[` : offset and markedOffset,
         * * `]` : markedOffset and limit,
         * * `!` : offset, markedOffset and limit
         * @param {boolean=} columns If `true` returns two columns hex + ascii, defaults to `false`
         * @returns {string|!Array.<string>} Debug string or array of lines if `asArray = true`
         * @expose
         * @example `>00'01 02<03` contains four bytes with `limit=0, markedOffset=1, offset=3`
         * @example `00[01 02 03>` contains four bytes with `offset=markedOffset=1, limit=4`
         * @example `00|01 02 03` contains four bytes with `offset=limit=1, markedOffset=-1`
         * @example `|` contains zero bytes with `offset=limit=0, markedOffset=-1`
         */
        ByteBufferPrototype.toDebug = function(columns) {
            var i = -1,
                k = this.buffer.byteLength,
                b,
                hex = "",
                asc = "",
                out = "";
            while (i<k) {
                if (i !== -1) {
                    b = this.view.getUint8(i);
                    if (b < 0x10) hex += "0"+b.toString(16).toUpperCase();
                    else hex += b.toString(16).toUpperCase();
                    if (columns) {
                        asc += b > 32 && b < 127 ? String.fromCharCode(b) : '.';
                    }
                }
                ++i;
                if (columns) {
                    if (i > 0 && i % 16 === 0 && i !== k) {
                        while (hex.length < 3*16+3) hex += " ";
                        out += hex+asc+"\n";
                        hex = asc = "";
                    }
                }
                if (i === this.offset && i === this.limit)
                    hex += i === this.markedOffset ? "!" : "|";
                else if (i === this.offset)
                    hex += i === this.markedOffset ? "[" : "<";
                else if (i === this.limit)
                    hex += i === this.markedOffset ? "]" : ">";
                else
                    hex += i === this.markedOffset ? "'" : (columns || (i !== 0 && i !== k) ? " " : "");
            }
            if (columns && hex !== " ") {
                while (hex.length < 3*16+3) hex += " ";
                out += hex+asc+"\n";
            }
            return columns ? out : hex;
        };

        /**
         * Decodes a hex encoded string with marked offsets to a ByteBuffer.
         * @param {string} str Debug string to decode (not be generated with `columns = true`)
         * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
         *  {@link ByteBuffer.DEFAULT_ENDIAN}.
         * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
         *  {@link ByteBuffer.DEFAULT_NOASSERT}.
         * @returns {!ByteBuffer} ByteBuffer
         * @expose
         * @see ByteBuffer#toDebug
         */
        ByteBuffer.fromDebug = function(str, littleEndian, noAssert) {
            var k = str.length,
                bb = new ByteBuffer(((k+1)/3)|0, littleEndian, noAssert);
            var i = 0, j = 0, ch, b,
                rs = false, // Require symbol next
                ho = false, hm = false, hl = false, // Already has offset, markedOffset, limit?
                fail = false;
            while (i<k) {
                switch (ch = str.charAt(i++)) {
                    case '!':
                        if (!noAssert) {
                            if (ho || hm || hl) {
                                fail = true; break;
                            }
                            ho = hm = hl = true;
                        }
                        bb.offset = bb.markedOffset = bb.limit = j;
                        rs = false;
                        break;
                    case '|':
                        if (!noAssert) {
                            if (ho || hl) {
                                fail = true; break;
                            }
                            ho = hl = true;
                        }
                        bb.offset = bb.limit = j;
                        rs = false;
                        break;
                    case '[':
                        if (!noAssert) {
                            if (ho || hm) {
                                fail = true; break;
                            }
                            ho = hm = true;
                        }
                        bb.offset = bb.markedOffset = j;
                        rs = false;
                        break;
                    case '<':
                        if (!noAssert) {
                            if (ho) {
                                fail = true; break;
                            }
                            ho = true;
                        }
                        bb.offset = j;
                        rs = false;
                        break;
                    case ']':
                        if (!noAssert) {
                            if (hl || hm) {
                                fail = true; break;
                            }
                            hl = hm = true;
                        }
                        bb.limit = bb.markedOffset = j;
                        rs = false;
                        break;
                    case '>':
                        if (!noAssert) {
                            if (hl) {
                                fail = true; break;
                            }
                            hl = true;
                        }
                        bb.limit = j;
                        rs = false;
                        break;
                    case "'":
                        if (!noAssert) {
                            if (hm) {
                                fail = true; break;
                            }
                            hm = true;
                        }
                        bb.markedOffset = j;
                        rs = false;
                        break;
                    case ' ':
                        rs = false;
                        break;
                    default:
                        if (!noAssert) {
                            if (rs) {
                                fail = true; break;
                            }
                        }
                        b = parseInt(ch+str.charAt(i++), 16);
                        if (!noAssert) {
                            if (isNaN(b) || b < 0 || b > 255)
                                throw TypeError("Illegal str: Not a debug encoded string");
                        }
                        bb.view.setUint8(j++, b);
                        rs = true;
                }
                if (fail)
                    throw TypeError("Illegal str: Invalid symbol at "+i);
            }
            if (!noAssert) {
                if (!ho || !hl)
                    throw TypeError("Illegal str: Missing offset or limit");
                if (j<bb.buffer.byteLength)
                    throw TypeError("Illegal str: Not a debug encoded string (is it hex?) "+j+" < "+k);
            }
            return bb;
        };

        // encodings/hex

        /**
         * Encodes this ByteBuffer's contents to a hex encoded string.
         * @param {number=} begin Offset to begin at. Defaults to {@link ByteBuffer#offset}.
         * @param {number=} end Offset to end at. Defaults to {@link ByteBuffer#limit}.
         * @returns {string} Hex encoded string
         * @expose
         */
        ByteBufferPrototype.toHex = function(begin, end) {
            begin = typeof begin === 'undefined' ? this.offset : begin;
            end = typeof end === 'undefined' ? this.limit : end;
            if (!this.noAssert) {
                if (typeof begin !== 'number' || begin % 1 !== 0)
                    throw TypeError("Illegal begin: Not an integer");
                begin >>>= 0;
                if (typeof end !== 'number' || end % 1 !== 0)
                    throw TypeError("Illegal end: Not an integer");
                end >>>= 0;
                if (begin < 0 || begin > end || end > this.buffer.byteLength)
                    throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);
            }
            var out = new Array(end - begin),
                b;
            while (begin < end) {
                b = this.view.getUint8(begin++);
                if (b < 0x10)
                    out.push("0", b.toString(16));
                else out.push(b.toString(16));
            }
            return out.join('');
        };

        /**
         * Decodes a hex encoded string to a ByteBuffer.
         * @param {string} str String to decode
         * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
         *  {@link ByteBuffer.DEFAULT_ENDIAN}.
         * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
         *  {@link ByteBuffer.DEFAULT_NOASSERT}.
         * @returns {!ByteBuffer} ByteBuffer
         * @expose
         */
        ByteBuffer.fromHex = function(str, littleEndian, noAssert) {
            if (!noAssert) {
                if (typeof str !== 'string')
                    throw TypeError("Illegal str: Not a string");
                if (str.length % 2 !== 0)
                    throw TypeError("Illegal str: Length not a multiple of 2");
            }
            var k = str.length,
                bb = new ByteBuffer((k / 2) | 0, littleEndian),
                b;
            for (var i=0, j=0; i<k; i+=2) {
                b = parseInt(str.substring(i, i+2), 16);
                if (!noAssert)
                    if (!isFinite(b) || b < 0 || b > 255)
                        throw TypeError("Illegal str: Contains non-hex characters");
                bb.view.setUint8(j++, b);
            }
            bb.limit = j;
            return bb;
        };

        // utfx-embeddable

        /**
         * utfx-embeddable (c) 2014 Daniel Wirtz <dcode@dcode.io>
         * Released under the Apache License, Version 2.0
         * see: https://github.com/dcodeIO/utfx for details
         */
        var utfx = function() {
            "use strict";

            /**
             * utfx namespace.
             * @inner
             * @type {!Object.<string,*>}
             */
            var utfx = {};

            /**
             * Maximum valid code point.
             * @type {number}
             * @const
             */
            utfx.MAX_CODEPOINT = 0x10FFFF;

            /**
             * Encodes UTF8 code points to UTF8 bytes.
             * @param {(!function():number|null) | number} src Code points source, either as a function returning the next code point
             *  respectively `null` if there are no more code points left or a single numeric code point.
             * @param {!function(number)} dst Bytes destination as a function successively called with the next byte
             */
            utfx.encodeUTF8 = function(src, dst) {
                var cp = null;
                if (typeof src === 'number')
                    cp = src,
                    src = function() { return null; };
                while (cp !== null || (cp = src()) !== null) {
                    if (cp < 0x80)
                        dst(cp&0x7F);
                    else if (cp < 0x800)
                        dst(((cp>>6)&0x1F)|0xC0),
                        dst((cp&0x3F)|0x80);
                    else if (cp < 0x10000)
                        dst(((cp>>12)&0x0F)|0xE0),
                        dst(((cp>>6)&0x3F)|0x80),
                        dst((cp&0x3F)|0x80);
                    else
                        dst(((cp>>18)&0x07)|0xF0),
                        dst(((cp>>12)&0x3F)|0x80),
                        dst(((cp>>6)&0x3F)|0x80),
                        dst((cp&0x3F)|0x80);
                    cp = null;
                }
            };

            /**
             * Decodes UTF8 bytes to UTF8 code points.
             * @param {!function():number|null} src Bytes source as a function returning the next byte respectively `null` if there
             *  are no more bytes left.
             * @param {!function(number)} dst Code points destination as a function successively called with each decoded code point.
             * @throws {RangeError} If a starting byte is invalid in UTF8
             * @throws {Error} If the last sequence is truncated. Has an array property `bytes` holding the
             *  remaining bytes.
             */
            utfx.decodeUTF8 = function(src, dst) {
                var a, b, c, d, fail = function(b) {
                    b = b.slice(0, b.indexOf(null));
                    var err = Error(b.toString());
                    err.name = "TruncatedError";
                    err['bytes'] = b;
                    throw err;
                };
                while ((a = src()) !== null) {
                    if ((a&0x80) === 0)
                        dst(a);
                    else if ((a&0xE0) === 0xC0)
                        ((b = src()) === null) && fail([a, b]),
                        dst(((a&0x1F)<<6) | (b&0x3F));
                    else if ((a&0xF0) === 0xE0)
                        ((b=src()) === null || (c=src()) === null) && fail([a, b, c]),
                        dst(((a&0x0F)<<12) | ((b&0x3F)<<6) | (c&0x3F));
                    else if ((a&0xF8) === 0xF0)
                        ((b=src()) === null || (c=src()) === null || (d=src()) === null) && fail([a, b, c ,d]),
                        dst(((a&0x07)<<18) | ((b&0x3F)<<12) | ((c&0x3F)<<6) | (d&0x3F));
                    else throw RangeError("Illegal starting byte: "+a);
                }
            };

            /**
             * Converts UTF16 characters to UTF8 code points.
             * @param {!function():number|null} src Characters source as a function returning the next char code respectively
             *  `null` if there are no more characters left.
             * @param {!function(number)} dst Code points destination as a function successively called with each converted code
             *  point.
             */
            utfx.UTF16toUTF8 = function(src, dst) {
                var c1, c2 = null;
                while (true) {
                    if ((c1 = c2 !== null ? c2 : src()) === null)
                        break;
                    if (c1 >= 0xD800 && c1 <= 0xDFFF) {
                        if ((c2 = src()) !== null) {
                            if (c2 >= 0xDC00 && c2 <= 0xDFFF) {
                                dst((c1-0xD800)*0x400+c2-0xDC00+0x10000);
                                c2 = null; continue;
                            }
                        }
                    }
                    dst(c1);
                }
                if (c2 !== null) dst(c2);
            };

            /**
             * Converts UTF8 code points to UTF16 characters.
             * @param {(!function():number|null) | number} src Code points source, either as a function returning the next code point
             *  respectively `null` if there are no more code points left or a single numeric code point.
             * @param {!function(number)} dst Characters destination as a function successively called with each converted char code.
             * @throws {RangeError} If a code point is out of range
             */
            utfx.UTF8toUTF16 = function(src, dst) {
                var cp = null;
                if (typeof src === 'number')
                    cp = src, src = function() { return null; };
                while (cp !== null || (cp = src()) !== null) {
                    if (cp <= 0xFFFF)
                        dst(cp);
                    else
                        cp -= 0x10000,
                        dst((cp>>10)+0xD800),
                        dst((cp%0x400)+0xDC00);
                    cp = null;
                }
            };

            /**
             * Converts and encodes UTF16 characters to UTF8 bytes.
             * @param {!function():number|null} src Characters source as a function returning the next char code respectively `null`
             *  if there are no more characters left.
             * @param {!function(number)} dst Bytes destination as a function successively called with the next byte.
             */
            utfx.encodeUTF16toUTF8 = function(src, dst) {
                utfx.UTF16toUTF8(src, function(cp) {
                    utfx.encodeUTF8(cp, dst);
                });
            };

            /**
             * Decodes and converts UTF8 bytes to UTF16 characters.
             * @param {!function():number|null} src Bytes source as a function returning the next byte respectively `null` if there
             *  are no more bytes left.
             * @param {!function(number)} dst Characters destination as a function successively called with each converted char code.
             * @throws {RangeError} If a starting byte is invalid in UTF8
             * @throws {Error} If the last sequence is truncated. Has an array property `bytes` holding the remaining bytes.
             */
            utfx.decodeUTF8toUTF16 = function(src, dst) {
                utfx.decodeUTF8(src, function(cp) {
                    utfx.UTF8toUTF16(cp, dst);
                });
            };

            /**
             * Calculates the byte length of an UTF8 code point.
             * @param {number} cp UTF8 code point
             * @returns {number} Byte length
             */
            utfx.calculateCodePoint = function(cp) {
                return (cp < 0x80) ? 1 : (cp < 0x800) ? 2 : (cp < 0x10000) ? 3 : 4;
            };

            /**
             * Calculates the number of UTF8 bytes required to store UTF8 code points.
             * @param {(!function():number|null)} src Code points source as a function returning the next code point respectively
             *  `null` if there are no more code points left.
             * @returns {number} The number of UTF8 bytes required
             */
            utfx.calculateUTF8 = function(src) {
                var cp, l=0;
                while ((cp = src()) !== null)
                    l += utfx.calculateCodePoint(cp);
                return l;
            };

            /**
             * Calculates the number of UTF8 code points respectively UTF8 bytes required to store UTF16 char codes.
             * @param {(!function():number|null)} src Characters source as a function returning the next char code respectively
             *  `null` if there are no more characters left.
             * @returns {!Array.<number>} The number of UTF8 code points at index 0 and the number of UTF8 bytes required at index 1.
             */
            utfx.calculateUTF16asUTF8 = function(src) {
                var n=0, l=0;
                utfx.UTF16toUTF8(src, function(cp) {
                    ++n; l += utfx.calculateCodePoint(cp);
                });
                return [n,l];
            };

            return utfx;
        }();

        // encodings/utf8

        /**
         * Encodes this ByteBuffer's contents between {@link ByteBuffer#offset} and {@link ByteBuffer#limit} to an UTF8 encoded
         *  string.
         * @returns {string} Hex encoded string
         * @throws {RangeError} If `offset > limit`
         * @expose
         */
        ByteBufferPrototype.toUTF8 = function(begin, end) {
            if (typeof begin === 'undefined') begin = this.offset;
            if (typeof end === 'undefined') end = this.limit;
            if (!this.noAssert) {
                if (typeof begin !== 'number' || begin % 1 !== 0)
                    throw TypeError("Illegal begin: Not an integer");
                begin >>>= 0;
                if (typeof end !== 'number' || end % 1 !== 0)
                    throw TypeError("Illegal end: Not an integer");
                end >>>= 0;
                if (begin < 0 || begin > end || end > this.buffer.byteLength)
                    throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);
            }
            var sd; try {
                utfx.decodeUTF8toUTF16(function() {
                    return begin < end ? this.view.getUint8(begin++) : null;
                }.bind(this), sd = stringDestination());
            } catch (e) {
                if (begin !== end)
                    throw RangeError("Illegal range: Truncated data, "+begin+" != "+end);
            }
            return sd();
        };

        /**
         * Decodes an UTF8 encoded string to a ByteBuffer.
         * @param {string} str String to decode
         * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
         *  {@link ByteBuffer.DEFAULT_ENDIAN}.
         * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
         *  {@link ByteBuffer.DEFAULT_NOASSERT}.
         * @returns {!ByteBuffer} ByteBuffer
         * @expose
         */
        ByteBuffer.fromUTF8 = function(str, littleEndian, noAssert) {
            if (!noAssert)
                if (typeof str !== 'string')
                    throw TypeError("Illegal str: Not a string");
            var bb = new ByteBuffer(utfx.calculateUTF16asUTF8(stringSource(str), true)[1], littleEndian, noAssert),
                i = 0;
            utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
                bb.view.setUint8(i++, b);
            });
            bb.limit = i;
            return bb;
        };


        return ByteBuffer;
    }

    /* CommonJS */ if (typeof require === 'function' && typeof module === 'object' && module && typeof exports === 'object' && exports)
        module['exports'] = (function() {
            var Long; try { Long = require("long"); } catch (e) {}
            return loadByteBuffer(Long);
        })();
    /* AMD */ else if (typeof define === 'function' && define["amd"])
        define("ByteBuffer", ["Long"], function(Long) { return loadByteBuffer(Long); });
    /* Global */ else
        (global["dcodeIO"] = global["dcodeIO"] || {})["ByteBuffer"] = loadByteBuffer(global["dcodeIO"]["Long"]);

})(this);

/*
 Copyright 2013 Daniel Wirtz <dcode@dcode.io>

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

/**
 * @license protobuf.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
 * Released under the Apache License, Version 2.0
 * see: https://github.com/dcodeIO/protobuf.js for details
 */
(function(global, factory) {

    /* AMD */ if (typeof define === 'function' && define["amd"])
        define(["bytebuffer"], factory);
    /* CommonJS */ else if (typeof require === "function" && typeof module === "object" && module && module["exports"])
        module["exports"] = factory(require("bytebuffer"), true);
    /* Global */ else
        (global["dcodeIO"] = global["dcodeIO"] || {})["ProtoBuf"] = factory(global["dcodeIO"]["ByteBuffer"]);

})(this, function(ByteBuffer, isCommonJS) {
    "use strict";

    /**
     * The ProtoBuf namespace.
     * @exports ProtoBuf
     * @namespace
     * @expose
     */
    var ProtoBuf = {};

    /**
     * @type {!function(new: ByteBuffer, ...[*])}
     * @expose
     */
    ProtoBuf.ByteBuffer = ByteBuffer;

    /**
     * @type {?function(new: Long, ...[*])}
     * @expose
     */
    ProtoBuf.Long = ByteBuffer.Long || null;

    /**
     * ProtoBuf.js version.
     * @type {string}
     * @const
     * @expose
     */
    ProtoBuf.VERSION = "5.0.1";

    /**
     * Wire types.
     * @type {Object.<string,number>}
     * @const
     * @expose
     */
    ProtoBuf.WIRE_TYPES = {};

    /**
     * Varint wire type.
     * @type {number}
     * @expose
     */
    ProtoBuf.WIRE_TYPES.VARINT = 0;

    /**
     * Fixed 64 bits wire type.
     * @type {number}
     * @const
     * @expose
     */
    ProtoBuf.WIRE_TYPES.BITS64 = 1;

    /**
     * Length delimited wire type.
     * @type {number}
     * @const
     * @expose
     */
    ProtoBuf.WIRE_TYPES.LDELIM = 2;

    /**
     * Start group wire type.
     * @type {number}
     * @const
     * @expose
     */
    ProtoBuf.WIRE_TYPES.STARTGROUP = 3;

    /**
     * End group wire type.
     * @type {number}
     * @const
     * @expose
     */
    ProtoBuf.WIRE_TYPES.ENDGROUP = 4;

    /**
     * Fixed 32 bits wire type.
     * @type {number}
     * @const
     * @expose
     */
    ProtoBuf.WIRE_TYPES.BITS32 = 5;

    /**
     * Packable wire types.
     * @type {!Array.<number>}
     * @const
     * @expose
     */
    ProtoBuf.PACKABLE_WIRE_TYPES = [
        ProtoBuf.WIRE_TYPES.VARINT,
        ProtoBuf.WIRE_TYPES.BITS64,
        ProtoBuf.WIRE_TYPES.BITS32
    ];

    /**
     * Types.
     * @dict
     * @type {!Object.<string,{name: string, wireType: number, defaultValue: *}>}
     * @const
     * @expose
     */
    ProtoBuf.TYPES = {
        // According to the protobuf spec.
        "int32": {
            name: "int32",
            wireType: ProtoBuf.WIRE_TYPES.VARINT,
            defaultValue: 0
        },
        "uint32": {
            name: "uint32",
            wireType: ProtoBuf.WIRE_TYPES.VARINT,
            defaultValue: 0
        },
        "sint32": {
            name: "sint32",
            wireType: ProtoBuf.WIRE_TYPES.VARINT,
            defaultValue: 0
        },
        "int64": {
            name: "int64",
            wireType: ProtoBuf.WIRE_TYPES.VARINT,
            defaultValue: ProtoBuf.Long ? ProtoBuf.Long.ZERO : undefined
        },
        "uint64": {
            name: "uint64",
            wireType: ProtoBuf.WIRE_TYPES.VARINT,
            defaultValue: ProtoBuf.Long ? ProtoBuf.Long.UZERO : undefined
        },
        "sint64": {
            name: "sint64",
            wireType: ProtoBuf.WIRE_TYPES.VARINT,
            defaultValue: ProtoBuf.Long ? ProtoBuf.Long.ZERO : undefined
        },
        "bool": {
            name: "bool",
            wireType: ProtoBuf.WIRE_TYPES.VARINT,
            defaultValue: false
        },
        "double": {
            name: "double",
            wireType: ProtoBuf.WIRE_TYPES.BITS64,
            defaultValue: 0
        },
        "string": {
            name: "string",
            wireType: ProtoBuf.WIRE_TYPES.LDELIM,
            defaultValue: ""
        },
        "bytes": {
            name: "bytes",
            wireType: ProtoBuf.WIRE_TYPES.LDELIM,
            defaultValue: null // overridden in the code, must be a unique instance
        },
        "fixed32": {
            name: "fixed32",
            wireType: ProtoBuf.WIRE_TYPES.BITS32,
            defaultValue: 0
        },
        "sfixed32": {
            name: "sfixed32",
            wireType: ProtoBuf.WIRE_TYPES.BITS32,
            defaultValue: 0
        },
        "fixed64": {
            name: "fixed64",
            wireType: ProtoBuf.WIRE_TYPES.BITS64,
            defaultValue:  ProtoBuf.Long ? ProtoBuf.Long.UZERO : undefined
        },
        "sfixed64": {
            name: "sfixed64",
            wireType: ProtoBuf.WIRE_TYPES.BITS64,
            defaultValue: ProtoBuf.Long ? ProtoBuf.Long.ZERO : undefined
        },
        "float": {
            name: "float",
            wireType: ProtoBuf.WIRE_TYPES.BITS32,
            defaultValue: 0
        },
        "enum": {
            name: "enum",
            wireType: ProtoBuf.WIRE_TYPES.VARINT,
            defaultValue: 0
        },
        "message": {
            name: "message",
            wireType: ProtoBuf.WIRE_TYPES.LDELIM,
            defaultValue: null
        },
        "group": {
            name: "group",
            wireType: ProtoBuf.WIRE_TYPES.STARTGROUP,
            defaultValue: null
        }
    };

    /**
     * Valid map key types.
     * @type {!Array.<!Object.<string,{name: string, wireType: number, defaultValue: *}>>}
     * @const
     * @expose
     */
    ProtoBuf.MAP_KEY_TYPES = [
        ProtoBuf.TYPES["int32"],
        ProtoBuf.TYPES["sint32"],
        ProtoBuf.TYPES["sfixed32"],
        ProtoBuf.TYPES["uint32"],
        ProtoBuf.TYPES["fixed32"],
        ProtoBuf.TYPES["int64"],
        ProtoBuf.TYPES["sint64"],
        ProtoBuf.TYPES["sfixed64"],
        ProtoBuf.TYPES["uint64"],
        ProtoBuf.TYPES["fixed64"],
        ProtoBuf.TYPES["bool"],
        ProtoBuf.TYPES["string"],
        ProtoBuf.TYPES["bytes"]
    ];

    /**
     * Minimum field id.
     * @type {number}
     * @const
     * @expose
     */
    ProtoBuf.ID_MIN = 1;

    /**
     * Maximum field id.
     * @type {number}
     * @const
     * @expose
     */
    ProtoBuf.ID_MAX = 0x1FFFFFFF;

    /**
     * If set to `true`, field names will be converted from underscore notation to camel case. Defaults to `false`.
     *  Must be set prior to parsing.
     * @type {boolean}
     * @expose
     */
    ProtoBuf.convertFieldsToCamelCase = false;

    /**
     * By default, messages are populated with (setX, set_x) accessors for each field. This can be disabled by
     *  setting this to `false` prior to building messages.
     * @type {boolean}
     * @expose
     */
    ProtoBuf.populateAccessors = true;

    /**
     * By default, messages are populated with default values if a field is not present on the wire. To disable
     *  this behavior, set this setting to `false`.
     * @type {boolean}
     * @expose
     */
    ProtoBuf.populateDefaults = true;

    /**
     * @alias ProtoBuf.Util
     * @expose
     */
    ProtoBuf.Util = (function() {
        "use strict";

        /**
         * ProtoBuf utilities.
         * @exports ProtoBuf.Util
         * @namespace
         */
        var Util = {};

        /**
         * Flag if running in node or not.
         * @type {boolean}
         * @const
         * @expose
         */
        Util.IS_NODE = !!(
            typeof process === 'object' && process+'' === '[object process]' && !process['browser']
        );

        /**
         * Constructs a XMLHttpRequest object.
         * @return {XMLHttpRequest}
         * @throws {Error} If XMLHttpRequest is not supported
         * @expose
         */
        Util.XHR = function() {
            // No dependencies please, ref: http://www.quirksmode.org/js/xmlhttp.html
            var XMLHttpFactories = [
                function () {return new XMLHttpRequest()},
                function () {return new ActiveXObject("Msxml2.XMLHTTP")},
                function () {return new ActiveXObject("Msxml3.XMLHTTP")},
                function () {return new ActiveXObject("Microsoft.XMLHTTP")}
            ];
            /** @type {?XMLHttpRequest} */
            var xhr = null;
            for (var i=0;i<XMLHttpFactories.length;i++) {
                try { xhr = XMLHttpFactories[i](); }
                catch (e) { continue; }
                break;
            }
            if (!xhr)
                throw Error("XMLHttpRequest is not supported");
            return xhr;
        };

        /**
         * Fetches a resource.
         * @param {string} path Resource path
         * @param {function(?string)=} callback Callback receiving the resource's contents. If omitted the resource will
         *   be fetched synchronously. If the request failed, contents will be null.
         * @return {?string|undefined} Resource contents if callback is omitted (null if the request failed), else undefined.
         * @expose
         */
        Util.fetch = function(path, callback) {
            if (callback && typeof callback != 'function')
                callback = null;
            if (Util.IS_NODE) {
                var fs = require("fs");
                if (callback) {
                    fs.readFile(path, function(err, data) {
                        if (err)
                            callback(null);
                        else
                            callback(""+data);
                    });
                } else
                    try {
                        return fs.readFileSync(path);
                    } catch (e) {
                        return null;
                    }
            } else {
                var xhr = Util.XHR();
                xhr.open('GET', path, callback ? true : false);
                // xhr.setRequestHeader('User-Agent', 'XMLHTTP/1.0');
                xhr.setRequestHeader('Accept', 'text/plain');
                if (typeof xhr.overrideMimeType === 'function') xhr.overrideMimeType('text/plain');
                if (callback) {
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState != 4) return;
                        if (/* remote */ xhr.status == 200 || /* local */ (xhr.status == 0 && typeof xhr.responseText === 'string'))
                            callback(xhr.responseText);
                        else
                            callback(null);
                    };
                    if (xhr.readyState == 4)
                        return;
                    xhr.send(null);
                } else {
                    xhr.send(null);
                    if (/* remote */ xhr.status == 200 || /* local */ (xhr.status == 0 && typeof xhr.responseText === 'string'))
                        return xhr.responseText;
                    return null;
                }
            }
        };

        /**
         * Converts a string to camel case.
         * @param {string} str
         * @returns {string}
         * @expose
         */
        Util.toCamelCase = function(str) {
            return str.replace(/_([a-zA-Z])/g, function ($0, $1) {
                return $1.toUpperCase();
            });
        };

        return Util;
    })();

    /**
     * Language expressions.
     * @type {!Object.<string,!RegExp>}
     * @expose
     */
    ProtoBuf.Lang = {

        // Characters always ending a statement
        DELIM: /[\s\{\}=;:\[\],'"\(\)<>]/g,

        // Field rules
        RULE: /^(?:required|optional|repeated|map)$/,

        // Field types
        TYPE: /^(?:double|float|int32|uint32|sint32|int64|uint64|sint64|fixed32|sfixed32|fixed64|sfixed64|bool|string|bytes)$/,

        // Names
        NAME: /^[a-zA-Z_][a-zA-Z_0-9]*$/,

        // Type definitions
        TYPEDEF: /^[a-zA-Z][a-zA-Z_0-9]*$/,

        // Type references
        TYPEREF: /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)+$/,

        // Fully qualified type references
        FQTYPEREF: /^(?:\.[a-zA-Z][a-zA-Z_0-9]*)+$/,

        // All numbers
        NUMBER: /^-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+|([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?)|inf|nan)$/,

        // Decimal numbers
        NUMBER_DEC: /^(?:[1-9][0-9]*|0)$/,

        // Hexadecimal numbers
        NUMBER_HEX: /^0[xX][0-9a-fA-F]+$/,

        // Octal numbers
        NUMBER_OCT: /^0[0-7]+$/,

        // Floating point numbers
        NUMBER_FLT: /^([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?|inf|nan)$/,

        // Booleans
        BOOL: /^(?:true|false)$/i,

        // Id numbers
        ID: /^(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/,

        // Negative id numbers (enum values)
        NEGID: /^\-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/,

        // Whitespaces
        WHITESPACE: /\s/,

        // All strings
        STRING: /(?:"([^"\\]*(?:\\.[^"\\]*)*)")|(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g,

        // Double quoted strings
        STRING_DQ: /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g,

        // Single quoted strings
        STRING_SQ: /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g
    };

    /**
     * @alias ProtoBuf.DotProto
     * @expose
     */
    ProtoBuf.DotProto = (function(ProtoBuf, Lang) {
        "use strict";

        /**
         * Utilities to parse .proto files.
         * @exports ProtoBuf.DotProto
         * @namespace
         */
        var DotProto = {};

        /**
         * Constructs a new Tokenizer.
         * @exports ProtoBuf.DotProto.Tokenizer
         * @class prototype tokenizer
         * @param {string} proto Proto to tokenize
         * @constructor
         */
        var Tokenizer = function(proto) {

            /**
             * Source to parse.
             * @type {string}
             * @expose
             */
            this.source = proto+"";

            /**
             * Current index.
             * @type {number}
             * @expose
             */
            this.index = 0;

            /**
             * Current line.
             * @type {number}
             * @expose
             */
            this.line = 1;

            /**
             * Token stack.
             * @type {!Array.<string>}
             * @expose
             */
            this.stack = [];

            /**
             * Opening character of the current string read, if any.
             * @type {?string}
             * @private
             */
            this._stringOpen = null;
        };

        /**
         * @alias ProtoBuf.DotProto.Tokenizer.prototype
         * @inner
         */
        var TokenizerPrototype = Tokenizer.prototype;

        /**
         * Reads a string beginning at the current index.
         * @return {string}
         * @private
         */
        TokenizerPrototype._readString = function() {
            var re = this._stringOpen === '"'
                ? Lang.STRING_DQ
                : Lang.STRING_SQ;
            re.lastIndex = this.index - 1; // Include the open quote
            var match = re.exec(this.source);
            if (!match)
                throw Error("unterminated string");
            this.index = re.lastIndex;
            this.stack.push(this._stringOpen);
            this._stringOpen = null;
            return match[1];
        };

        /**
         * Gets the next token and advances by one.
         * @return {?string} Token or `null` on EOF
         * @expose
         */
        TokenizerPrototype.next = function() {
            if (this.stack.length > 0)
                return this.stack.shift();
            if (this.index >= this.source.length)
                return null;
            if (this._stringOpen !== null)
                return this._readString();

            var repeat,
                prev,
                next;
            do {
                repeat = false;

                // Strip white spaces
                while (Lang.WHITESPACE.test(next = this.source.charAt(this.index))) {
                    if (next === '\n')
                        ++this.line;
                    if (++this.index === this.source.length)
                        return null;
                }

                // Strip comments
                if (this.source.charAt(this.index) === '/') {
                    ++this.index;
                    if (this.source.charAt(this.index) === '/') { // Line
                        while (this.source.charAt(++this.index) !== '\n')
                            if (this.index == this.source.length)
                                return null;
                        ++this.index;
                        ++this.line;
                        repeat = true;
                    } else if ((next = this.source.charAt(this.index)) === '*') { /* Block */
                        do {
                            if (next === '\n')
                                ++this.line;
                            if (++this.index === this.source.length)
                                return null;
                            prev = next;
                            next = this.source.charAt(this.index);
                        } while (prev !== '*' || next !== '/');
                        ++this.index;
                        repeat = true;
                    } else
                        return '/';
                }
            } while (repeat);

            if (this.index === this.source.length)
                return null;

            // Read the next token
            var end = this.index;
            Lang.DELIM.lastIndex = 0;
            var delim = Lang.DELIM.test(this.source.charAt(end++));
            if (!delim)
                while(end < this.source.length && !Lang.DELIM.test(this.source.charAt(end)))
                    ++end;
            var token = this.source.substring(this.index, this.index = end);
            if (token === '"' || token === "'")
                this._stringOpen = token;
            return token;
        };

        /**
         * Peeks for the next token.
         * @return {?string} Token or `null` on EOF
         * @expose
         */
        TokenizerPrototype.peek = function() {
            if (this.stack.length === 0) {
                var token = this.next();
                if (token === null)
                    return null;
                this.stack.push(token);
            }
            return this.stack[0];
        };

        /**
         * Skips a specific token and throws if it differs.
         * @param {string} expected Expected token
         * @throws {Error} If the actual token differs
         */
        TokenizerPrototype.skip = function(expected) {
            var actual = this.next();
            if (actual !== expected)
                throw Error("illegal '"+actual+"', '"+expected+"' expected");
        };

        /**
         * Omits an optional token.
         * @param {string} expected Expected optional token
         * @returns {boolean} `true` if the token exists
         */
        TokenizerPrototype.omit = function(expected) {
            if (this.peek() === expected) {
                this.next();
                return true;
            }
            return false;
        };

        /**
         * Returns a string representation of this object.
         * @return {string} String representation as of "Tokenizer(index/length)"
         * @expose
         */
        TokenizerPrototype.toString = function() {
            return "Tokenizer ("+this.index+"/"+this.source.length+" at line "+this.line+")";
        };

        /**
         * @alias ProtoBuf.DotProto.Tokenizer
         * @expose
         */
        DotProto.Tokenizer = Tokenizer;

        /**
         * Constructs a new Parser.
         * @exports ProtoBuf.DotProto.Parser
         * @class prototype parser
         * @param {string} source Source
         * @constructor
         */
        var Parser = function(source) {

            /**
             * Tokenizer.
             * @type {!ProtoBuf.DotProto.Tokenizer}
             * @expose
             */
            this.tn = new Tokenizer(source);

            /**
             * Whether parsing proto3 or not.
             * @type {boolean}
             */
            this.proto3 = false;
        };

        /**
         * @alias ProtoBuf.DotProto.Parser.prototype
         * @inner
         */
        var ParserPrototype = Parser.prototype;

        /**
         * Parses the source.
         * @returns {!Object}
         * @throws {Error} If the source cannot be parsed
         * @expose
         */
        ParserPrototype.parse = function() {
            var topLevel = {
                "name": "[ROOT]", // temporary
                "package": null,
                "messages": [],
                "enums": [],
                "imports": [],
                "options": {},
                "services": []
                // "syntax": undefined
            };
            var token,
                head = true,
                weak;
            try {
                while (token = this.tn.next()) {
                    switch (token) {
                        case 'package':
                            if (!head || topLevel["package"] !== null)
                                throw Error("unexpected 'package'");
                            token = this.tn.next();
                            if (!Lang.TYPEREF.test(token))
                                throw Error("illegal package name: " + token);
                            this.tn.skip(";");
                            topLevel["package"] = token;
                            break;
                        case 'import':
                            if (!head)
                                throw Error("unexpected 'import'");
                            token = this.tn.peek();
                            if (token === "public" || (weak = token === "weak")) // token ignored
                                this.tn.next();
                            token = this._readString();
                            this.tn.skip(";");
                            if (!weak) // import ignored
                                topLevel["imports"].push(token);
                            break;
                        case 'syntax':
                            if (!head)
                                throw Error("unexpected 'syntax'");
                            this.tn.skip("=");
                            if ((topLevel["syntax"] = this._readString()) === "proto3")
                                this.proto3 = true;
                            this.tn.skip(";");
                            break;
                        case 'message':
                            this._parseMessage(topLevel, null);
                            head = false;
                            break;
                        case 'enum':
                            this._parseEnum(topLevel);
                            head = false;
                            break;
                        case 'option':
                            this._parseOption(topLevel);
                            break;
                        case 'service':
                            this._parseService(topLevel);
                            break;
                        case 'extend':
                            this._parseExtend(topLevel);
                            break;
                        default:
                            throw Error("unexpected '" + token + "'");
                    }
                }
            } catch (e) {
                e.message = "Parse error at line "+this.tn.line+": " + e.message;
                throw e;
            }
            delete topLevel["name"];
            return topLevel;
        };

        /**
         * Parses the specified source.
         * @returns {!Object}
         * @throws {Error} If the source cannot be parsed
         * @expose
         */
        Parser.parse = function(source) {
            return new Parser(source).parse();
        };

        // ----- Conversion ------

        /**
         * Converts a numerical string to an id.
         * @param {string} value
         * @param {boolean=} mayBeNegative
         * @returns {number}
         * @inner
         */
        function mkId(value, mayBeNegative) {
            var id = -1,
                sign = 1;
            if (value.charAt(0) == '-') {
                sign = -1;
                value = value.substring(1);
            }
            if (Lang.NUMBER_DEC.test(value))
                id = parseInt(value);
            else if (Lang.NUMBER_HEX.test(value))
                id = parseInt(value.substring(2), 16);
            else if (Lang.NUMBER_OCT.test(value))
                id = parseInt(value.substring(1), 8);
            else
                throw Error("illegal id value: " + (sign < 0 ? '-' : '') + value);
            id = (sign*id)|0; // Force to 32bit
            if (!mayBeNegative && id < 0)
                throw Error("illegal id value: " + (sign < 0 ? '-' : '') + value);
            return id;
        }

        /**
         * Converts a numerical string to a number.
         * @param {string} val
         * @returns {number}
         * @inner
         */
        function mkNumber(val) {
            var sign = 1;
            if (val.charAt(0) == '-') {
                sign = -1;
                val = val.substring(1);
            }
            if (Lang.NUMBER_DEC.test(val))
                return sign * parseInt(val, 10);
            else if (Lang.NUMBER_HEX.test(val))
                return sign * parseInt(val.substring(2), 16);
            else if (Lang.NUMBER_OCT.test(val))
                return sign * parseInt(val.substring(1), 8);
            else if (val === 'inf')
                return sign * Infinity;
            else if (val === 'nan')
                return NaN;
            else if (Lang.NUMBER_FLT.test(val))
                return sign * parseFloat(val);
            throw Error("illegal number value: " + (sign < 0 ? '-' : '') + val);
        }

        // ----- Reading ------

        /**
         * Reads a string.
         * @returns {string}
         * @private
         */
        ParserPrototype._readString = function() {
            var value = "",
                token,
                delim;
            do {
                delim = this.tn.next();
                if (delim !== "'" && delim !== '"')
                    throw Error("illegal string delimiter: "+delim);
                value += this.tn.next();
                this.tn.skip(delim);
                token = this.tn.peek();
            } while (token === '"' || token === '"'); // multi line?
            return value;
        };

        /**
         * Reads a value.
         * @param {boolean=} mayBeTypeRef
         * @returns {number|boolean|string}
         * @private
         */
        ParserPrototype._readValue = function(mayBeTypeRef) {
            var token = this.tn.peek(),
                value;
            if (token === '"' || token === "'")
                return this._readString();
            this.tn.next();
            if (Lang.NUMBER.test(token))
                return mkNumber(token);
            if (Lang.BOOL.test(token))
                return (token.toLowerCase() === 'true');
            if (mayBeTypeRef && Lang.TYPEREF.test(token))
                return token;
            throw Error("illegal value: "+token);

        };

        // ----- Parsing constructs -----

        /**
         * Parses a namespace option.
         * @param {!Object} parent Parent definition
         * @param {boolean=} isList
         * @private
         */
        ParserPrototype._parseOption = function(parent, isList) {
            var token = this.tn.next(),
                custom = false;
            if (token === '(') {
                custom = true;
                token = this.tn.next();
            }
            if (!Lang.TYPEREF.test(token))
                // we can allow options of the form google.protobuf.* since they will just get ignored anyways
                // if (!/google\.protobuf\./.test(token)) // FIXME: Why should that not be a valid typeref?
                    throw Error("illegal option name: "+token);
            var name = token;
            if (custom) { // (my_method_option).foo, (my_method_option), some_method_option, (foo.my_option).bar
                this.tn.skip(')');
                name = '('+name+')';
                token = this.tn.peek();
                if (Lang.FQTYPEREF.test(token)) {
                    name += token;
                    this.tn.next();
                }
            }
            this.tn.skip('=');
            this._parseOptionValue(parent, name);
            if (!isList)
                this.tn.skip(";");
        };

        /**
         * Sets an option on the specified options object.
         * @param {!Object.<string,*>} options
         * @param {string} name
         * @param {string|number|boolean} value
         * @inner
         */
        function setOption(options, name, value) {
            if (typeof options[name] === 'undefined')
                options[name] = value;
            else {
                if (!Array.isArray(options[name]))
                    options[name] = [ options[name] ];
                options[name].push(value);
            }
        }

        /**
         * Parses an option value.
         * @param {!Object} parent
         * @param {string} name
         * @private
         */
        ParserPrototype._parseOptionValue = function(parent, name) {
            var token = this.tn.peek();
            if (token !== '{') { // Plain value
                setOption(parent["options"], name, this._readValue(true));
            } else { // Aggregate options
                this.tn.skip("{");
                while ((token = this.tn.next()) !== '}') {
                    if (!Lang.NAME.test(token))
                        throw Error("illegal option name: " + name + "." + token);
                    if (this.tn.omit(":"))
                        setOption(parent["options"], name + "." + token, this._readValue(true));
                    else
                        this._parseOptionValue(parent, name + "." + token);
                }
            }
        };

        /**
         * Parses a service definition.
         * @param {!Object} parent Parent definition
         * @private
         */
        ParserPrototype._parseService = function(parent) {
            var token = this.tn.next();
            if (!Lang.NAME.test(token))
                throw Error("illegal service name at line "+this.tn.line+": "+token);
            var name = token;
            var svc = {
                "name": name,
                "rpc": {},
                "options": {}
            };
            this.tn.skip("{");
            while ((token = this.tn.next()) !== '}') {
                if (token === "option")
                    this._parseOption(svc);
                else if (token === 'rpc')
                    this._parseServiceRPC(svc);
                else
                    throw Error("illegal service token: "+token);
            }
            this.tn.omit(";");
            parent["services"].push(svc);
        };

        /**
         * Parses a RPC service definition of the form ['rpc', name, (request), 'returns', (response)].
         * @param {!Object} svc Service definition
         * @private
         */
        ParserPrototype._parseServiceRPC = function(svc) {
            var type = "rpc",
                token = this.tn.next();
            if (!Lang.NAME.test(token))
                throw Error("illegal rpc service method name: "+token);
            var name = token;
            var method = {
                "request": null,
                "response": null,
                "request_stream": false,
                "response_stream": false,
                "options": {}
            };
            this.tn.skip("(");
            token = this.tn.next();
            if (token.toLowerCase() === "stream") {
              method["request_stream"] = true;
              token = this.tn.next();
            }
            if (!Lang.TYPEREF.test(token))
                throw Error("illegal rpc service request type: "+token);
            method["request"] = token;
            this.tn.skip(")");
            token = this.tn.next();
            if (token.toLowerCase() !== "returns")
                throw Error("illegal rpc service request type delimiter: "+token);
            this.tn.skip("(");
            token = this.tn.next();
            if (token.toLowerCase() === "stream") {
              method["response_stream"] = true;
              token = this.tn.next();
            }
            method["response"] = token;
            this.tn.skip(")");
            token = this.tn.peek();
            if (token === '{') {
                this.tn.next();
                while ((token = this.tn.next()) !== '}') {
                    if (token === 'option')
                        this._parseOption(method);
                    else
                        throw Error("illegal rpc service token: " + token);
                }
                this.tn.omit(";");
            } else
                this.tn.skip(";");
            if (typeof svc[type] === 'undefined')
                svc[type] = {};
            svc[type][name] = method;
        };

        /**
         * Parses a message definition.
         * @param {!Object} parent Parent definition
         * @param {!Object=} fld Field definition if this is a group
         * @returns {!Object}
         * @private
         */
        ParserPrototype._parseMessage = function(parent, fld) {
            var isGroup = !!fld,
                token = this.tn.next();
            var msg = {
                "name": "",
                "fields": [],
                "enums": [],
                "messages": [],
                "options": {},
                "services": [],
                "oneofs": {}
                // "extensions": undefined
            };
            if (!Lang.NAME.test(token))
                throw Error("illegal "+(isGroup ? "group" : "message")+" name: "+token);
            msg["name"] = token;
            if (isGroup) {
                this.tn.skip("=");
                fld["id"] = mkId(this.tn.next());
                msg["isGroup"] = true;
            }
            token = this.tn.peek();
            if (token === '[' && fld)
                this._parseFieldOptions(fld);
            this.tn.skip("{");
            while ((token = this.tn.next()) !== '}') {
                if (Lang.RULE.test(token))
                    this._parseMessageField(msg, token);
                else if (token === "oneof")
                    this._parseMessageOneOf(msg);
                else if (token === "enum")
                    this._parseEnum(msg);
                else if (token === "message")
                    this._parseMessage(msg);
                else if (token === "option")
                    this._parseOption(msg);
                else if (token === "service")
                    this._parseService(msg);
                else if (token === "extensions")
                    msg["extensions"] = this._parseExtensionRanges();
                else if (token === "reserved")
                    this._parseIgnored(); // TODO
                else if (token === "extend")
                    this._parseExtend(msg);
                else if (Lang.TYPEREF.test(token)) {
                    if (!this.proto3)
                        throw Error("illegal field rule: "+token);
                    this._parseMessageField(msg, "optional", token);
                } else
                    throw Error("illegal message token: "+token);
            }
            this.tn.omit(";");
            parent["messages"].push(msg);
            return msg;
        };

        /**
         * Parses an ignored statement.
         * @private
         */
        ParserPrototype._parseIgnored = function() {
            while (this.tn.peek() !== ';')
                this.tn.next();
            this.tn.skip(";");
        };

        /**
         * Parses a message field.
         * @param {!Object} msg Message definition
         * @param {string} rule Field rule
         * @param {string=} type Field type if already known (never known for maps)
         * @returns {!Object} Field descriptor
         * @private
         */
        ParserPrototype._parseMessageField = function(msg, rule, type) {
            if (!Lang.RULE.test(rule))
                throw Error("illegal message field rule: "+rule);
            var fld = {
                "rule": rule,
                "type": "",
                "name": "",
                "options": {},
                "id": 0
            };
            var token;
            if (rule === "map") {

                if (type)
                    throw Error("illegal type: " + type);
                this.tn.skip('<');
                token = this.tn.next();
                if (!Lang.TYPE.test(token) && !Lang.TYPEREF.test(token))
                    throw Error("illegal message field type: " + token);
                fld["keytype"] = token;
                this.tn.skip(',');
                token = this.tn.next();
                if (!Lang.TYPE.test(token) && !Lang.TYPEREF.test(token))
                    throw Error("illegal message field: " + token);
                fld["type"] = token;
                this.tn.skip('>');
                token = this.tn.next();
                if (!Lang.NAME.test(token))
                    throw Error("illegal message field name: " + token);
                fld["name"] = token;
                this.tn.skip("=");
                fld["id"] = mkId(this.tn.next());
                token = this.tn.peek();
                if (token === '[')
                    this._parseFieldOptions(fld);
                this.tn.skip(";");

            } else {

                type = typeof type !== 'undefined' ? type : this.tn.next();

                if (type === "group") {

                    // "A [legacy] group simply combines a nested message type and a field into a single declaration. In your
                    // code, you can treat this message just as if it had a Result type field called result (the latter name is
                    // converted to lower-case so that it does not conflict with the former)."
                    var grp = this._parseMessage(msg, fld);
                    if (!/^[A-Z]/.test(grp["name"]))
                        throw Error('illegal group name: '+grp["name"]);
                    fld["type"] = grp["name"];
                    fld["name"] = grp["name"].toLowerCase();
                    this.tn.omit(";");

                } else {

                    if (!Lang.TYPE.test(type) && !Lang.TYPEREF.test(type))
                        throw Error("illegal message field type: " + type);
                    fld["type"] = type;
                    token = this.tn.next();
                    if (!Lang.NAME.test(token))
                        throw Error("illegal message field name: " + token);
                    fld["name"] = token;
                    this.tn.skip("=");
                    fld["id"] = mkId(this.tn.next());
                    token = this.tn.peek();
                    if (token === "[")
                        this._parseFieldOptions(fld);
                    this.tn.skip(";");

                }
            }
            msg["fields"].push(fld);
            return fld;
        };

        /**
         * Parses a message oneof.
         * @param {!Object} msg Message definition
         * @private
         */
        ParserPrototype._parseMessageOneOf = function(msg) {
            var token = this.tn.next();
            if (!Lang.NAME.test(token))
                throw Error("illegal oneof name: "+token);
            var name = token,
                fld;
            var fields = [];
            this.tn.skip("{");
            while ((token = this.tn.next()) !== "}") {
                fld = this._parseMessageField(msg, "optional", token);
                fld["oneof"] = name;
                fields.push(fld["id"]);
            }
            this.tn.omit(";");
            msg["oneofs"][name] = fields;
        };

        /**
         * Parses a set of field option definitions.
         * @param {!Object} fld Field definition
         * @private
         */
        ParserPrototype._parseFieldOptions = function(fld) {
            this.tn.skip("[");
            var token,
                first = true;
            while ((token = this.tn.peek()) !== ']') {
                if (!first)
                    this.tn.skip(",");
                this._parseOption(fld, true);
                first = false;
            }
            this.tn.next();
        };

        /**
         * Parses an enum.
         * @param {!Object} msg Message definition
         * @private
         */
        ParserPrototype._parseEnum = function(msg) {
            var enm = {
                "name": "",
                "values": [],
                "options": {}
            };
            var token = this.tn.next();
            if (!Lang.NAME.test(token))
                throw Error("illegal name: "+token);
            enm["name"] = token;
            this.tn.skip("{");
            while ((token = this.tn.next()) !== '}') {
                if (token === "option")
                    this._parseOption(enm);
                else {
                    if (!Lang.NAME.test(token))
                        throw Error("illegal name: "+token);
                    this.tn.skip("=");
                    var val = {
                        "name": token,
                        "id": mkId(this.tn.next(), true)
                    };
                    token = this.tn.peek();
                    if (token === "[")
                        this._parseFieldOptions({ "options": {} });
                    this.tn.skip(";");
                    enm["values"].push(val);
                }
            }
            this.tn.omit(";");
            msg["enums"].push(enm);
        };

        /**
         * Parses extension / reserved ranges.
         * @returns {!Array.<!Array.<number>>}
         * @private
         */
        ParserPrototype._parseExtensionRanges = function() {
            var ranges = [];
            var token,
                range,
                value;
            do {
                range = [];
                while (true) {
                    token = this.tn.next();
                    switch (token) {
                        case "min":
                            value = ProtoBuf.ID_MIN;
                            break;
                        case "max":
                            value = ProtoBuf.ID_MAX;
                            break;
                        default:
                            value = mkNumber(token);
                            break;
                    }
                    range.push(value);
                    if (range.length === 2)
                        break;
                    if (this.tn.peek() !== "to") {
                        range.push(value);
                        break;
                    }
                    this.tn.next();
                }
                ranges.push(range);
            } while (this.tn.omit(","));
            this.tn.skip(";");
            return ranges;
        };

        /**
         * Parses an extend block.
         * @param {!Object} parent Parent object
         * @private
         */
        ParserPrototype._parseExtend = function(parent) {
            var token = this.tn.next();
            if (!Lang.TYPEREF.test(token))
                throw Error("illegal extend reference: "+token);
            var ext = {
                "ref": token,
                "fields": []
            };
            this.tn.skip("{");
            while ((token = this.tn.next()) !== '}') {
                if (Lang.RULE.test(token))
                    this._parseMessageField(ext, token);
                else if (Lang.TYPEREF.test(token)) {
                    if (!this.proto3)
                        throw Error("illegal field rule: "+token);
                    this._parseMessageField(ext, "optional", token);
                } else
                    throw Error("illegal extend token: "+token);
            }
            this.tn.omit(";");
            parent["messages"].push(ext);
            return ext;
        };

        // ----- General -----

        /**
         * Returns a string representation of this parser.
         * @returns {string}
         */
        ParserPrototype.toString = function() {
            return "Parser at line "+this.tn.line;
        };

        /**
         * @alias ProtoBuf.DotProto.Parser
         * @expose
         */
        DotProto.Parser = Parser;

        return DotProto;

    })(ProtoBuf, ProtoBuf.Lang);

    /**
     * @alias ProtoBuf.Reflect
     * @expose
     */
    ProtoBuf.Reflect = (function(ProtoBuf) {
        "use strict";

        /**
         * Reflection types.
         * @exports ProtoBuf.Reflect
         * @namespace
         */
        var Reflect = {};

        /**
         * Constructs a Reflect base class.
         * @exports ProtoBuf.Reflect.T
         * @constructor
         * @abstract
         * @param {!ProtoBuf.Builder} builder Builder reference
         * @param {?ProtoBuf.Reflect.T} parent Parent object
         * @param {string} name Object name
         */
        var T = function(builder, parent, name) {

            /**
             * Builder reference.
             * @type {!ProtoBuf.Builder}
             * @expose
             */
            this.builder = builder;

            /**
             * Parent object.
             * @type {?ProtoBuf.Reflect.T}
             * @expose
             */
            this.parent = parent;

            /**
             * Object name in namespace.
             * @type {string}
             * @expose
             */
            this.name = name;

            /**
             * Fully qualified class name
             * @type {string}
             * @expose
             */
            this.className;
        };

        /**
         * @alias ProtoBuf.Reflect.T.prototype
         * @inner
         */
        var TPrototype = T.prototype;

        /**
         * Returns the fully qualified name of this object.
         * @returns {string} Fully qualified name as of ".PATH.TO.THIS"
         * @expose
         */
        TPrototype.fqn = function() {
            var name = this.name,
                ptr = this;
            do {
                ptr = ptr.parent;
                if (ptr == null)
                    break;
                name = ptr.name+"."+name;
            } while (true);
            return name;
        };

        /**
         * Returns a string representation of this Reflect object (its fully qualified name).
         * @param {boolean=} includeClass Set to true to include the class name. Defaults to false.
         * @return String representation
         * @expose
         */
        TPrototype.toString = function(includeClass) {
            return (includeClass ? this.className + " " : "") + this.fqn();
        };

        /**
         * Builds this type.
         * @throws {Error} If this type cannot be built directly
         * @expose
         */
        TPrototype.build = function() {
            throw Error(this.toString(true)+" cannot be built directly");
        };

        /**
         * @alias ProtoBuf.Reflect.T
         * @expose
         */
        Reflect.T = T;

        /**
         * Constructs a new Namespace.
         * @exports ProtoBuf.Reflect.Namespace
         * @param {!ProtoBuf.Builder} builder Builder reference
         * @param {?ProtoBuf.Reflect.Namespace} parent Namespace parent
         * @param {string} name Namespace name
         * @param {Object.<string,*>=} options Namespace options
         * @param {string?} syntax The syntax level of this definition (e.g., proto3)
         * @constructor
         * @extends ProtoBuf.Reflect.T
         */
        var Namespace = function(builder, parent, name, options, syntax) {
            T.call(this, builder, parent, name);

            /**
             * @override
             */
            this.className = "Namespace";

            /**
             * Children inside the namespace.
             * @type {!Array.<ProtoBuf.Reflect.T>}
             */
            this.children = [];

            /**
             * Options.
             * @type {!Object.<string, *>}
             */
            this.options = options || {};

            /**
             * Syntax level (e.g., proto2 or proto3).
             * @type {!string}
             */
            this.syntax = syntax || "proto2";
        };

        /**
         * @alias ProtoBuf.Reflect.Namespace.prototype
         * @inner
         */
        var NamespacePrototype = Namespace.prototype = Object.create(T.prototype);

        /**
         * Returns an array of the namespace's children.
         * @param {ProtoBuf.Reflect.T=} type Filter type (returns instances of this type only). Defaults to null (all children).
         * @return {Array.<ProtoBuf.Reflect.T>}
         * @expose
         */
        NamespacePrototype.getChildren = function(type) {
            type = type || null;
            if (type == null)
                return this.children.slice();
            var children = [];
            for (var i=0, k=this.children.length; i<k; ++i)
                if (this.children[i] instanceof type)
                    children.push(this.children[i]);
            return children;
        };

        /**
         * Adds a child to the namespace.
         * @param {ProtoBuf.Reflect.T} child Child
         * @throws {Error} If the child cannot be added (duplicate)
         * @expose
         */
        NamespacePrototype.addChild = function(child) {
            var other;
            if (other = this.getChild(child.name)) {
                // Try to revert camelcase transformation on collision
                if (other instanceof Message.Field && other.name !== other.originalName && this.getChild(other.originalName) === null)
                    other.name = other.originalName; // Revert previous first (effectively keeps both originals)
                else if (child instanceof Message.Field && child.name !== child.originalName && this.getChild(child.originalName) === null)
                    child.name = child.originalName;
                else
                    throw Error("Duplicate name in namespace "+this.toString(true)+": "+child.name);
            }
            this.children.push(child);
        };

        /**
         * Gets a child by its name or id.
         * @param {string|number} nameOrId Child name or id
         * @return {?ProtoBuf.Reflect.T} The child or null if not found
         * @expose
         */
        NamespacePrototype.getChild = function(nameOrId) {
            var key = typeof nameOrId === 'number' ? 'id' : 'name';
            for (var i=0, k=this.children.length; i<k; ++i)
                if (this.children[i][key] === nameOrId)
                    return this.children[i];
            return null;
        };

        /**
         * Resolves a reflect object inside of this namespace.
         * @param {string|!Array.<string>} qn Qualified name to resolve
         * @param {boolean=} excludeNonNamespace Excludes non-namespace types, defaults to `false`
         * @return {?ProtoBuf.Reflect.Namespace} The resolved type or null if not found
         * @expose
         */
        NamespacePrototype.resolve = function(qn, excludeNonNamespace) {
            var part = typeof qn === 'string' ? qn.split(".") : qn,
                ptr = this,
                i = 0;
            if (part[i] === "") { // Fully qualified name, e.g. ".My.Message'
                while (ptr.parent !== null)
                    ptr = ptr.parent;
                i++;
            }
            var child;
            do {
                do {
                    if (!(ptr instanceof Reflect.Namespace)) {
                        ptr = null;
                        break;
                    }
                    child = ptr.getChild(part[i]);
                    if (!child || !(child instanceof Reflect.T) || (excludeNonNamespace && !(child instanceof Reflect.Namespace))) {
                        ptr = null;
                        break;
                    }
                    ptr = child; i++;
                } while (i < part.length);
                if (ptr != null)
                    break; // Found
                // Else search the parent
                if (this.parent !== null)
                    return this.parent.resolve(qn, excludeNonNamespace);
            } while (ptr != null);
            return ptr;
        };

        /**
         * Determines the shortest qualified name of the specified type, if any, relative to this namespace.
         * @param {!ProtoBuf.Reflect.T} t Reflection type
         * @returns {string} The shortest qualified name or, if there is none, the fqn
         * @expose
         */
        NamespacePrototype.qn = function(t) {
            var part = [], ptr = t;
            do {
                part.unshift(ptr.name);
                ptr = ptr.parent;
            } while (ptr !== null);
            for (var len=1; len <= part.length; len++) {
                var qn = part.slice(part.length-len);
                if (t === this.resolve(qn, t instanceof Reflect.Namespace))
                    return qn.join(".");
            }
            return t.fqn();
        };

        /**
         * Builds the namespace and returns the runtime counterpart.
         * @return {Object.<string,Function|Object>} Runtime namespace
         * @expose
         */
        NamespacePrototype.build = function() {
            /** @dict */
            var ns = {};
            var children = this.children;
            for (var i=0, k=children.length, child; i<k; ++i) {
                child = children[i];
                if (child instanceof Namespace)
                    ns[child.name] = child.build();
            }
            if (Object.defineProperty)
                Object.defineProperty(ns, "$options", { "value": this.buildOpt() });
            return ns;
        };

        /**
         * Builds the namespace's '$options' property.
         * @return {Object.<string,*>}
         */
        NamespacePrototype.buildOpt = function() {
            var opt = {},
                keys = Object.keys(this.options);
            for (var i=0, k=keys.length; i<k; ++i) {
                var key = keys[i],
                    val = this.options[keys[i]];
                // TODO: Options are not resolved, yet.
                // if (val instanceof Namespace) {
                //     opt[key] = val.build();
                // } else {
                opt[key] = val;
                // }
            }
            return opt;
        };

        /**
         * Gets the value assigned to the option with the specified name.
         * @param {string=} name Returns the option value if specified, otherwise all options are returned.
         * @return {*|Object.<string,*>}null} Option value or NULL if there is no such option
         */
        NamespacePrototype.getOption = function(name) {
            if (typeof name === 'undefined')
                return this.options;
            return typeof this.options[name] !== 'undefined' ? this.options[name] : null;
        };

        /**
         * @alias ProtoBuf.Reflect.Namespace
         * @expose
         */
        Reflect.Namespace = Namespace;

        /**
         * Constructs a new Element implementation that checks and converts values for a
         * particular field type, as appropriate.
         *
         * An Element represents a single value: either the value of a singular field,
         * or a value contained in one entry of a repeated field or map field. This
         * class does not implement these higher-level concepts; it only encapsulates
         * the low-level typechecking and conversion.
         *
         * @exports ProtoBuf.Reflect.Element
         * @param {{name: string, wireType: number}} type Resolved data type
         * @param {ProtoBuf.Reflect.T|null} resolvedType Resolved type, if relevant
         * (e.g. submessage field).
         * @param {boolean} isMapKey Is this element a Map key? The value will be
         * converted to string form if so.
         * @param {string} syntax Syntax level of defining message type, e.g.,
         * proto2 or proto3.
         * @constructor
         */
        var Element = function(type, resolvedType, isMapKey, syntax) {

            /**
             * Element type, as a string (e.g., int32).
             * @type {{name: string, wireType: number}}
             */
            this.type = type;

            /**
             * Element type reference to submessage or enum definition, if needed.
             * @type {ProtoBuf.Reflect.T|null}
             */
            this.resolvedType = resolvedType;

            /**
             * Element is a map key.
             * @type {boolean}
             */
            this.isMapKey = isMapKey;

            /**
             * Syntax level of defining message type, e.g., proto2 or proto3.
             * @type {string}
             */
            this.syntax = syntax;

            if (isMapKey && ProtoBuf.MAP_KEY_TYPES.indexOf(type) < 0)
                throw Error("Invalid map key type: " + type.name);
        };

        var ElementPrototype = Element.prototype;

        /**
         * Obtains a (new) default value for the specified type.
         * @param type {string|{name: string, wireType: number}} Field type
         * @returns {*} Default value
         * @inner
         */
        function mkDefault(type) {
            if (typeof type === 'string')
                type = ProtoBuf.TYPES[type];
            if (typeof type.defaultValue === 'undefined')
                throw Error("default value for type "+type.name+" is not supported");
            if (type == ProtoBuf.TYPES["bytes"])
                return new ByteBuffer(0);
            return type.defaultValue;
        }

        /**
         * Returns the default value for this field in proto3.
         * @function
         * @param type {string|{name: string, wireType: number}} the field type
         * @returns {*} Default value
         */
        Element.defaultFieldValue = mkDefault;

        /**
         * Makes a Long from a value.
         * @param {{low: number, high: number, unsigned: boolean}|string|number} value Value
         * @param {boolean=} unsigned Whether unsigned or not, defaults to reuse it from Long-like objects or to signed for
         *  strings and numbers
         * @returns {!Long}
         * @throws {Error} If the value cannot be converted to a Long
         * @inner
         */
        function mkLong(value, unsigned) {
            if (value && typeof value.low === 'number' && typeof value.high === 'number' && typeof value.unsigned === 'boolean'
                && value.low === value.low && value.high === value.high)
                return new ProtoBuf.Long(value.low, value.high, typeof unsigned === 'undefined' ? value.unsigned : unsigned);
            if (typeof value === 'string')
                return ProtoBuf.Long.fromString(value, unsigned || false, 10);
            if (typeof value === 'number')
                return ProtoBuf.Long.fromNumber(value, unsigned || false);
            throw Error("not convertible to Long");
        }

        /**
         * Checks if the given value can be set for an element of this type (singular
         * field or one element of a repeated field or map).
         * @param {*} value Value to check
         * @return {*} Verified, maybe adjusted, value
         * @throws {Error} If the value cannot be verified for this element slot
         * @expose
         */
        ElementPrototype.verifyValue = function(value) {
            var self = this;
            function fail(val, msg) {
                throw Error("Illegal value for "+self.toString(true)+" of type "+self.type.name+": "+val+" ("+msg+")");
            }
            switch (this.type) {
                // Signed 32bit
                case ProtoBuf.TYPES["int32"]:
                case ProtoBuf.TYPES["sint32"]:
                case ProtoBuf.TYPES["sfixed32"]:
                    // Account for !NaN: value === value
                    if (typeof value !== 'number' || (value === value && value % 1 !== 0))
                        fail(typeof value, "not an integer");
                    return value > 4294967295 ? value | 0 : value;

                // Unsigned 32bit
                case ProtoBuf.TYPES["uint32"]:
                case ProtoBuf.TYPES["fixed32"]:
                    if (typeof value !== 'number' || (value === value && value % 1 !== 0))
                        fail(typeof value, "not an integer");
                    return value < 0 ? value >>> 0 : value;

                // Signed 64bit
                case ProtoBuf.TYPES["int64"]:
                case ProtoBuf.TYPES["sint64"]:
                case ProtoBuf.TYPES["sfixed64"]: {
                    if (ProtoBuf.Long)
                        try {
                            return mkLong(value, false);
                        } catch (e) {
                            fail(typeof value, e.message);
                        }
                    else
                        fail(typeof value, "requires Long.js");
                }

                // Unsigned 64bit
                case ProtoBuf.TYPES["uint64"]:
                case ProtoBuf.TYPES["fixed64"]: {
                    if (ProtoBuf.Long)
                        try {
                            return mkLong(value, true);
                        } catch (e) {
                            fail(typeof value, e.message);
                        }
                    else
                        fail(typeof value, "requires Long.js");
                }

                // Bool
                case ProtoBuf.TYPES["bool"]:
                    if (typeof value !== 'boolean')
                        fail(typeof value, "not a boolean");
                    return value;

                // Float
                case ProtoBuf.TYPES["float"]:
                case ProtoBuf.TYPES["double"]:
                    if (typeof value !== 'number')
                        fail(typeof value, "not a number");
                    return value;

                // Length-delimited string
                case ProtoBuf.TYPES["string"]:
                    if (typeof value !== 'string' && !(value && value instanceof String))
                        fail(typeof value, "not a string");
                    return ""+value; // Convert String object to string

                // Length-delimited bytes
                case ProtoBuf.TYPES["bytes"]:
                    if (ByteBuffer.isByteBuffer(value))
                        return value;
                    return ByteBuffer.wrap(value, "base64");

                // Constant enum value
                case ProtoBuf.TYPES["enum"]: {
                    var values = this.resolvedType.getChildren(ProtoBuf.Reflect.Enum.Value);
                    for (i=0; i<values.length; i++)
                        if (values[i].name == value)
                            return values[i].id;
                        else if (values[i].id == value)
                            return values[i].id;

                    if (this.syntax === 'proto3') {
                        // proto3: just make sure it's an integer.
                        if (typeof value !== 'number' || (value === value && value % 1 !== 0))
                            fail(typeof value, "not an integer");
                        if (value > 4294967295 || value < 0)
                            fail(typeof value, "not in range for uint32")
                        return value;
                    } else {
                        // proto2 requires enum values to be valid.
                        fail(value, "not a valid enum value");
                    }
                }
                // Embedded message
                case ProtoBuf.TYPES["group"]:
                case ProtoBuf.TYPES["message"]: {
                    if (!value || typeof value !== 'object')
                        fail(typeof value, "object expected");
                    if (value instanceof this.resolvedType.clazz)
                        return value;
                    if (value instanceof ProtoBuf.Builder.Message) {
                        // Mismatched type: Convert to object (see: https://github.com/dcodeIO/ProtoBuf.js/issues/180)
                        var obj = {};
                        for (var i in value)
                            if (value.hasOwnProperty(i))
                                obj[i] = value[i];
                        value = obj;
                    }
                    // Else let's try to construct one from a key-value object
                    return new (this.resolvedType.clazz)(value); // May throw for a hundred of reasons
                }
            }

            // We should never end here
            throw Error("[INTERNAL] Illegal value for "+this.toString(true)+": "+value+" (undefined type "+this.type+")");
        };

        /**
         * Calculates the byte length of an element on the wire.
         * @param {number} id Field number
         * @param {*} value Field value
         * @returns {number} Byte length
         * @throws {Error} If the value cannot be calculated
         * @expose
         */
        ElementPrototype.calculateLength = function(id, value) {
            if (value === null) return 0; // Nothing to encode
            // Tag has already been written
            var n;
            switch (this.type) {
                case ProtoBuf.TYPES["int32"]:
                    return value < 0 ? ByteBuffer.calculateVarint64(value) : ByteBuffer.calculateVarint32(value);
                case ProtoBuf.TYPES["uint32"]:
                    return ByteBuffer.calculateVarint32(value);
                case ProtoBuf.TYPES["sint32"]:
                    return ByteBuffer.calculateVarint32(ByteBuffer.zigZagEncode32(value));
                case ProtoBuf.TYPES["fixed32"]:
                case ProtoBuf.TYPES["sfixed32"]:
                case ProtoBuf.TYPES["float"]:
                    return 4;
                case ProtoBuf.TYPES["int64"]:
                case ProtoBuf.TYPES["uint64"]:
                    return ByteBuffer.calculateVarint64(value);
                case ProtoBuf.TYPES["sint64"]:
                    return ByteBuffer.calculateVarint64(ByteBuffer.zigZagEncode64(value));
                case ProtoBuf.TYPES["fixed64"]:
                case ProtoBuf.TYPES["sfixed64"]:
                    return 8;
                case ProtoBuf.TYPES["bool"]:
                    return 1;
                case ProtoBuf.TYPES["enum"]:
                    return ByteBuffer.calculateVarint32(value);
                case ProtoBuf.TYPES["double"]:
                    return 8;
                case ProtoBuf.TYPES["string"]:
                    n = ByteBuffer.calculateUTF8Bytes(value);
                    return ByteBuffer.calculateVarint32(n) + n;
                case ProtoBuf.TYPES["bytes"]:
                    if (value.remaining() < 0)
                        throw Error("Illegal value for "+this.toString(true)+": "+value.remaining()+" bytes remaining");
                    return ByteBuffer.calculateVarint32(value.remaining()) + value.remaining();
                case ProtoBuf.TYPES["message"]:
                    n = this.resolvedType.calculate(value);
                    return ByteBuffer.calculateVarint32(n) + n;
                case ProtoBuf.TYPES["group"]:
                    n = this.resolvedType.calculate(value);
                    return n + ByteBuffer.calculateVarint32((id << 3) | ProtoBuf.WIRE_TYPES.ENDGROUP);
            }
            // We should never end here
            throw Error("[INTERNAL] Illegal value to encode in "+this.toString(true)+": "+value+" (unknown type)");
        };

        /**
         * Encodes a value to the specified buffer. Does not encode the key.
         * @param {number} id Field number
         * @param {*} value Field value
         * @param {ByteBuffer} buffer ByteBuffer to encode to
         * @return {ByteBuffer} The ByteBuffer for chaining
         * @throws {Error} If the value cannot be encoded
         * @expose
         */
        ElementPrototype.encodeValue = function(id, value, buffer) {
            if (value === null) return buffer; // Nothing to encode
            // Tag has already been written

            switch (this.type) {
                // 32bit signed varint
                case ProtoBuf.TYPES["int32"]:
                    // "If you use int32 or int64 as the type for a negative number, the resulting varint is always ten bytes
                    // long – it is, effectively, treated like a very large unsigned integer." (see #122)
                    if (value < 0)
                        buffer.writeVarint64(value);
                    else
                        buffer.writeVarint32(value);
                    break;

                // 32bit unsigned varint
                case ProtoBuf.TYPES["uint32"]:
                    buffer.writeVarint32(value);
                    break;

                // 32bit varint zig-zag
                case ProtoBuf.TYPES["sint32"]:
                    buffer.writeVarint32ZigZag(value);
                    break;

                // Fixed unsigned 32bit
                case ProtoBuf.TYPES["fixed32"]:
                    buffer.writeUint32(value);
                    break;

                // Fixed signed 32bit
                case ProtoBuf.TYPES["sfixed32"]:
                    buffer.writeInt32(value);
                    break;

                // 64bit varint as-is
                case ProtoBuf.TYPES["int64"]:
                case ProtoBuf.TYPES["uint64"]:
                    buffer.writeVarint64(value); // throws
                    break;

                // 64bit varint zig-zag
                case ProtoBuf.TYPES["sint64"]:
                    buffer.writeVarint64ZigZag(value); // throws
                    break;

                // Fixed unsigned 64bit
                case ProtoBuf.TYPES["fixed64"]:
                    buffer.writeUint64(value); // throws
                    break;

                // Fixed signed 64bit
                case ProtoBuf.TYPES["sfixed64"]:
                    buffer.writeInt64(value); // throws
                    break;

                // Bool
                case ProtoBuf.TYPES["bool"]:
                    if (typeof value === 'string')
                        buffer.writeVarint32(value.toLowerCase() === 'false' ? 0 : !!value);
                    else
                        buffer.writeVarint32(value ? 1 : 0);
                    break;

                // Constant enum value
                case ProtoBuf.TYPES["enum"]:
                    buffer.writeVarint32(value);
                    break;

                // 32bit float
                case ProtoBuf.TYPES["float"]:
                    buffer.writeFloat32(value);
                    break;

                // 64bit float
                case ProtoBuf.TYPES["double"]:
                    buffer.writeFloat64(value);
                    break;

                // Length-delimited string
                case ProtoBuf.TYPES["string"]:
                    buffer.writeVString(value);
                    break;

                // Length-delimited bytes
                case ProtoBuf.TYPES["bytes"]:
                    if (value.remaining() < 0)
                        throw Error("Illegal value for "+this.toString(true)+": "+value.remaining()+" bytes remaining");
                    var prevOffset = value.offset;
                    buffer.writeVarint32(value.remaining());
                    buffer.append(value);
                    value.offset = prevOffset;
                    break;

                // Embedded message
                case ProtoBuf.TYPES["message"]:
                    var bb = new ByteBuffer().LE();
                    this.resolvedType.encode(value, bb);
                    buffer.writeVarint32(bb.offset);
                    buffer.append(bb.flip());
                    break;

                // Legacy group
                case ProtoBuf.TYPES["group"]:
                    this.resolvedType.encode(value, buffer);
                    buffer.writeVarint32((id << 3) | ProtoBuf.WIRE_TYPES.ENDGROUP);
                    break;

                default:
                    // We should never end here
                    throw Error("[INTERNAL] Illegal value to encode in "+this.toString(true)+": "+value+" (unknown type)");
            }
            return buffer;
        };

        /**
         * Decode one element value from the specified buffer.
         * @param {ByteBuffer} buffer ByteBuffer to decode from
         * @param {number} wireType The field wire type
         * @param {number} id The field number
         * @return {*} Decoded value
         * @throws {Error} If the field cannot be decoded
         * @expose
         */
        ElementPrototype.decode = function(buffer, wireType, id) {
            if (wireType != this.type.wireType)
                throw Error("Unexpected wire type for element");

            var value, nBytes;
            switch (this.type) {
                // 32bit signed varint
                case ProtoBuf.TYPES["int32"]:
                    return buffer.readVarint32() | 0;

                // 32bit unsigned varint
                case ProtoBuf.TYPES["uint32"]:
                    return buffer.readVarint32() >>> 0;

                // 32bit signed varint zig-zag
                case ProtoBuf.TYPES["sint32"]:
                    return buffer.readVarint32ZigZag() | 0;

                // Fixed 32bit unsigned
                case ProtoBuf.TYPES["fixed32"]:
                    return buffer.readUint32() >>> 0;

                case ProtoBuf.TYPES["sfixed32"]:
                    return buffer.readInt32() | 0;

                // 64bit signed varint
                case ProtoBuf.TYPES["int64"]:
                    return buffer.readVarint64();

                // 64bit unsigned varint
                case ProtoBuf.TYPES["uint64"]:
                    return buffer.readVarint64().toUnsigned();

                // 64bit signed varint zig-zag
                case ProtoBuf.TYPES["sint64"]:
                    return buffer.readVarint64ZigZag();

                // Fixed 64bit unsigned
                case ProtoBuf.TYPES["fixed64"]:
                    return buffer.readUint64();

                // Fixed 64bit signed
                case ProtoBuf.TYPES["sfixed64"]:
                    return buffer.readInt64();

                // Bool varint
                case ProtoBuf.TYPES["bool"]:
                    return !!buffer.readVarint32();

                // Constant enum value (varint)
                case ProtoBuf.TYPES["enum"]:
                    // The following Builder.Message#set will already throw
                    return buffer.readVarint32();

                // 32bit float
                case ProtoBuf.TYPES["float"]:
                    return buffer.readFloat();

                // 64bit float
                case ProtoBuf.TYPES["double"]:
                    return buffer.readDouble();

                // Length-delimited string
                case ProtoBuf.TYPES["string"]:
                    return buffer.readVString();

                // Length-delimited bytes
                case ProtoBuf.TYPES["bytes"]: {
                    nBytes = buffer.readVarint32();
                    if (buffer.remaining() < nBytes)
                        throw Error("Illegal number of bytes for "+this.toString(true)+": "+nBytes+" required but got only "+buffer.remaining());
                    value = buffer.clone(); // Offset already set
                    value.limit = value.offset+nBytes;
                    buffer.offset += nBytes;
                    return value;
                }

                // Length-delimited embedded message
                case ProtoBuf.TYPES["message"]: {
                    nBytes = buffer.readVarint32();
                    return this.resolvedType.decode(buffer, nBytes);
                }

                // Legacy group
                case ProtoBuf.TYPES["group"]:
                    return this.resolvedType.decode(buffer, -1, id);
            }

            // We should never end here
            throw Error("[INTERNAL] Illegal decode type");
        };

        /**
         * Converts a value from a string to the canonical element type.
         *
         * Legal only when isMapKey is true.
         *
         * @param {string} str The string value
         * @returns {*} The value
         */
        ElementPrototype.valueFromString = function(str) {
            if (!this.isMapKey) {
                throw Error("valueFromString() called on non-map-key element");
            }

            switch (this.type) {
                case ProtoBuf.TYPES["int32"]:
                case ProtoBuf.TYPES["sint32"]:
                case ProtoBuf.TYPES["sfixed32"]:
                case ProtoBuf.TYPES["uint32"]:
                case ProtoBuf.TYPES["fixed32"]:
                    return this.verifyValue(parseInt(str));

                case ProtoBuf.TYPES["int64"]:
                case ProtoBuf.TYPES["sint64"]:
                case ProtoBuf.TYPES["sfixed64"]:
                case ProtoBuf.TYPES["uint64"]:
                case ProtoBuf.TYPES["fixed64"]:
                      // Long-based fields support conversions from string already.
                      return this.verifyValue(str);

                case ProtoBuf.TYPES["bool"]:
                      return str === "true";

                case ProtoBuf.TYPES["string"]:
                      return this.verifyValue(str);

                case ProtoBuf.TYPES["bytes"]:
                      return ByteBuffer.fromBinary(str);
            }
        };

        /**
         * Converts a value from the canonical element type to a string.
         *
         * It should be the case that `valueFromString(valueToString(val))` returns
         * a value equivalent to `verifyValue(val)` for every legal value of `val`
         * according to this element type.
         *
         * This may be used when the element must be stored or used as a string,
         * e.g., as a map key on an Object.
         *
         * Legal only when isMapKey is true.
         *
         * @param {*} val The value
         * @returns {string} The string form of the value.
         */
        ElementPrototype.valueToString = function(value) {
            if (!this.isMapKey) {
                throw Error("valueToString() called on non-map-key element");
            }

            if (this.type === ProtoBuf.TYPES["bytes"]) {
                return value.toString("binary");
            } else {
                return value.toString();
            }
        };

        /**
         * @alias ProtoBuf.Reflect.Element
         * @expose
         */
        Reflect.Element = Element;

        /**
         * Constructs a new Message.
         * @exports ProtoBuf.Reflect.Message
         * @param {!ProtoBuf.Builder} builder Builder reference
         * @param {!ProtoBuf.Reflect.Namespace} parent Parent message or namespace
         * @param {string} name Message name
         * @param {Object.<string,*>=} options Message options
         * @param {boolean=} isGroup `true` if this is a legacy group
         * @param {string?} syntax The syntax level of this definition (e.g., proto3)
         * @constructor
         * @extends ProtoBuf.Reflect.Namespace
         */
        var Message = function(builder, parent, name, options, isGroup, syntax) {
            Namespace.call(this, builder, parent, name, options, syntax);

            /**
             * @override
             */
            this.className = "Message";

            /**
             * Extensions range.
             * @type {!Array.<number>|undefined}
             * @expose
             */
            this.extensions = undefined;

            /**
             * Runtime message class.
             * @type {?function(new:ProtoBuf.Builder.Message)}
             * @expose
             */
            this.clazz = null;

            /**
             * Whether this is a legacy group or not.
             * @type {boolean}
             * @expose
             */
            this.isGroup = !!isGroup;

            // The following cached collections are used to efficiently iterate over or look up fields when decoding.

            /**
             * Cached fields.
             * @type {?Array.<!ProtoBuf.Reflect.Message.Field>}
             * @private
             */
            this._fields = null;

            /**
             * Cached fields by id.
             * @type {?Object.<number,!ProtoBuf.Reflect.Message.Field>}
             * @private
             */
            this._fieldsById = null;

            /**
             * Cached fields by name.
             * @type {?Object.<string,!ProtoBuf.Reflect.Message.Field>}
             * @private
             */
            this._fieldsByName = null;
        };

        /**
         * @alias ProtoBuf.Reflect.Message.prototype
         * @inner
         */
        var MessagePrototype = Message.prototype = Object.create(Namespace.prototype);

        /**
         * Builds the message and returns the runtime counterpart, which is a fully functional class.
         * @see ProtoBuf.Builder.Message
         * @param {boolean=} rebuild Whether to rebuild or not, defaults to false
         * @return {ProtoBuf.Reflect.Message} Message class
         * @throws {Error} If the message cannot be built
         * @expose
         */
        MessagePrototype.build = function(rebuild) {
            if (this.clazz && !rebuild)
                return this.clazz;

            // Create the runtime Message class in its own scope
            var clazz = (function(ProtoBuf, T) {

                var fields = T.getChildren(ProtoBuf.Reflect.Message.Field),
                    oneofs = T.getChildren(ProtoBuf.Reflect.Message.OneOf);

                /**
                 * Constructs a new runtime Message.
                 * @name ProtoBuf.Builder.Message
                 * @class Barebone of all runtime messages.
                 * @param {!Object.<string,*>|string} values Preset values
                 * @param {...string} var_args
                 * @constructor
                 * @throws {Error} If the message cannot be created
                 */
                var Message = function(values, var_args) {
                    ProtoBuf.Builder.Message.call(this);

                    // Create virtual oneof properties
                    for (var i=0, k=oneofs.length; i<k; ++i)
                        this[oneofs[i].name] = null;
                    // Create fields and set default values
                    for (i=0, k=fields.length; i<k; ++i) {
                        var field = fields[i];
                        this[field.name] =
                            field.repeated ? [] :
                            (field.map ? new ProtoBuf.Map(field) : null);
                        if ((field.required || T.syntax === 'proto3') &&
                            field.defaultValue !== null)
                            this[field.name] = field.defaultValue;
                    }

                    if (arguments.length > 0) {
                        var value;
                        // Set field values from a values object
                        if (arguments.length === 1 && values !== null && typeof values === 'object' &&
                            /* not _another_ Message */ (typeof values.encode !== 'function' || values instanceof Message) &&
                            /* not a repeated field */ !Array.isArray(values) &&
                            /* not a Map */ !(values instanceof ProtoBuf.Map) &&
                            /* not a ByteBuffer */ !ByteBuffer.isByteBuffer(values) &&
                            /* not an ArrayBuffer */ !(values instanceof ArrayBuffer) &&
                            /* not a Long */ !(ProtoBuf.Long && values instanceof ProtoBuf.Long)) {
                            this.$set(values);
                        } else // Set field values from arguments, in declaration order
                            for (i=0, k=arguments.length; i<k; ++i)
                                if (typeof (value = arguments[i]) !== 'undefined')
                                    this.$set(fields[i].name, value); // May throw
                    }
                };

                /**
                 * @alias ProtoBuf.Builder.Message.prototype
                 * @inner
                 */
                var MessagePrototype = Message.prototype = Object.create(ProtoBuf.Builder.Message.prototype);

                /**
                 * Adds a value to a repeated field.
                 * @name ProtoBuf.Builder.Message#add
                 * @function
                 * @param {string} key Field name
                 * @param {*} value Value to add
                 * @param {boolean=} noAssert Whether to assert the value or not (asserts by default)
                 * @returns {!ProtoBuf.Builder.Message} this
                 * @throws {Error} If the value cannot be added
                 * @expose
                 */
                MessagePrototype.add = function(key, value, noAssert) {
                    var field = T._fieldsByName[key];
                    if (!noAssert) {
                        if (!field)
                            throw Error(this+"#"+key+" is undefined");
                        if (!(field instanceof ProtoBuf.Reflect.Message.Field))
                            throw Error(this+"#"+key+" is not a field: "+field.toString(true)); // May throw if it's an enum or embedded message
                        if (!field.repeated)
                            throw Error(this+"#"+key+" is not a repeated field");
                        value = field.verifyValue(value, true);
                    }
                    if (this[key] === null)
                        this[key] = [];
                    this[key].push(value);
                    return this;
                };

                /**
                 * Adds a value to a repeated field. This is an alias for {@link ProtoBuf.Builder.Message#add}.
                 * @name ProtoBuf.Builder.Message#$add
                 * @function
                 * @param {string} key Field name
                 * @param {*} value Value to add
                 * @param {boolean=} noAssert Whether to assert the value or not (asserts by default)
                 * @returns {!ProtoBuf.Builder.Message} this
                 * @throws {Error} If the value cannot be added
                 * @expose
                 */
                MessagePrototype.$add = MessagePrototype.add;

                /**
                 * Sets a field's value.
                 * @name ProtoBuf.Builder.Message#set
                 * @function
                 * @param {string|!Object.<string,*>} keyOrObj String key or plain object holding multiple values
                 * @param {(*|boolean)=} value Value to set if key is a string, otherwise omitted
                 * @param {boolean=} noAssert Whether to not assert for an actual field / proper value type, defaults to `false`
                 * @returns {!ProtoBuf.Builder.Message} this
                 * @throws {Error} If the value cannot be set
                 * @expose
                 */
                MessagePrototype.set = function(keyOrObj, value, noAssert) {
                    if (keyOrObj && typeof keyOrObj === 'object') {
                        noAssert = value;
                        for (var ikey in keyOrObj)
                            if (keyOrObj.hasOwnProperty(ikey) && typeof (value = keyOrObj[ikey]) !== 'undefined')
                                this.$set(ikey, value, noAssert);
                        return this;
                    }
                    var field = T._fieldsByName[keyOrObj];
                    if (!noAssert) {
                        if (!field)
                            throw Error(this+"#"+keyOrObj+" is not a field: undefined");
                        if (!(field instanceof ProtoBuf.Reflect.Message.Field))
                            throw Error(this+"#"+keyOrObj+" is not a field: "+field.toString(true));
                        this[field.name] = (value = field.verifyValue(value)); // May throw
                    } else
                        this[keyOrObj] = value;
                    if (field && field.oneof) { // Field is part of an OneOf (not a virtual OneOf field)
                        var currentField = this[field.oneof.name]; // Virtual field references currently set field
                        if (value !== null) {
                            if (currentField !== null && currentField !== field.name)
                                this[currentField] = null; // Clear currently set field
                            this[field.oneof.name] = field.name; // Point virtual field at this field
                        } else if (/* value === null && */currentField === keyOrObj)
                            this[field.oneof.name] = null; // Clear virtual field (current field explicitly cleared)
                    }
                    return this;
                };

                /**
                 * Sets a field's value. This is an alias for [@link ProtoBuf.Builder.Message#set}.
                 * @name ProtoBuf.Builder.Message#$set
                 * @function
                 * @param {string|!Object.<string,*>} keyOrObj String key or plain object holding multiple values
                 * @param {(*|boolean)=} value Value to set if key is a string, otherwise omitted
                 * @param {boolean=} noAssert Whether to not assert the value, defaults to `false`
                 * @throws {Error} If the value cannot be set
                 * @expose
                 */
                MessagePrototype.$set = MessagePrototype.set;

                /**
                 * Gets a field's value.
                 * @name ProtoBuf.Builder.Message#get
                 * @function
                 * @param {string} key Key
                 * @param {boolean=} noAssert Whether to not assert for an actual field, defaults to `false`
                 * @return {*} Value
                 * @throws {Error} If there is no such field
                 * @expose
                 */
                MessagePrototype.get = function(key, noAssert) {
                    if (noAssert)
                        return this[key];
                    var field = T._fieldsByName[key];
                    if (!field || !(field instanceof ProtoBuf.Reflect.Message.Field))
                        throw Error(this+"#"+key+" is not a field: undefined");
                    if (!(field instanceof ProtoBuf.Reflect.Message.Field))
                        throw Error(this+"#"+key+" is not a field: "+field.toString(true));
                    return this[field.name];
                };

                /**
                 * Gets a field's value. This is an alias for {@link ProtoBuf.Builder.Message#$get}.
                 * @name ProtoBuf.Builder.Message#$get
                 * @function
                 * @param {string} key Key
                 * @return {*} Value
                 * @throws {Error} If there is no such field
                 * @expose
                 */
                MessagePrototype.$get = MessagePrototype.get;

                // Getters and setters

                for (var i=0; i<fields.length; i++) {
                    var field = fields[i];
                    // no setters for extension fields as these are named by their fqn
                    if (field instanceof ProtoBuf.Reflect.Message.ExtensionField)
                        continue;

                    if (T.builder.options['populateAccessors'])
                        (function(field) {
                            // set/get[SomeValue]
                            var Name = field.originalName.replace(/(_[a-zA-Z])/g, function(match) {
                                return match.toUpperCase().replace('_','');
                            });
                            Name = Name.substring(0,1).toUpperCase() + Name.substring(1);

                            // set/get_[some_value] FIXME: Do we really need these?
                            var name = field.originalName.replace(/([A-Z])/g, function(match) {
                                return "_"+match;
                            });

                            /**
                             * The current field's unbound setter function.
                             * @function
                             * @param {*} value
                             * @param {boolean=} noAssert
                             * @returns {!ProtoBuf.Builder.Message}
                             * @inner
                             */
                            var setter = function(value, noAssert) {
                                this[field.name] = noAssert ? value : field.verifyValue(value);
                                return this;
                            };

                            /**
                             * The current field's unbound getter function.
                             * @function
                             * @returns {*}
                             * @inner
                             */
                            var getter = function() {
                                return this[field.name];
                            };

                            if (T.getChild("set"+Name) === null)
                                /**
                                 * Sets a value. This method is present for each field, but only if there is no name conflict with
                                 *  another field.
                                 * @name ProtoBuf.Builder.Message#set[SomeField]
                                 * @function
                                 * @param {*} value Value to set
                                 * @param {boolean=} noAssert Whether to not assert the value, defaults to `false`
                                 * @returns {!ProtoBuf.Builder.Message} this
                                 * @abstract
                                 * @throws {Error} If the value cannot be set
                                 */
                                MessagePrototype["set"+Name] = setter;

                            if (T.getChild("set_"+name) === null)
                                /**
                                 * Sets a value. This method is present for each field, but only if there is no name conflict with
                                 *  another field.
                                 * @name ProtoBuf.Builder.Message#set_[some_field]
                                 * @function
                                 * @param {*} value Value to set
                                 * @param {boolean=} noAssert Whether to not assert the value, defaults to `false`
                                 * @returns {!ProtoBuf.Builder.Message} this
                                 * @abstract
                                 * @throws {Error} If the value cannot be set
                                 */
                                MessagePrototype["set_"+name] = setter;

                            if (T.getChild("get"+Name) === null)
                                /**
                                 * Gets a value. This method is present for each field, but only if there is no name conflict with
                                 *  another field.
                                 * @name ProtoBuf.Builder.Message#get[SomeField]
                                 * @function
                                 * @abstract
                                 * @return {*} The value
                                 */
                                MessagePrototype["get"+Name] = getter;

                            if (T.getChild("get_"+name) === null)
                                /**
                                 * Gets a value. This method is present for each field, but only if there is no name conflict with
                                 *  another field.
                                 * @name ProtoBuf.Builder.Message#get_[some_field]
                                 * @function
                                 * @return {*} The value
                                 * @abstract
                                 */
                                MessagePrototype["get_"+name] = getter;

                        })(field);
                }

                // En-/decoding

                /**
                 * Encodes the message.
                 * @name ProtoBuf.Builder.Message#$encode
                 * @function
                 * @param {(!ByteBuffer|boolean)=} buffer ByteBuffer to encode to. Will create a new one and flip it if omitted.
                 * @param {boolean=} noVerify Whether to not verify field values, defaults to `false`
                 * @return {!ByteBuffer} Encoded message as a ByteBuffer
                 * @throws {Error} If the message cannot be encoded or if required fields are missing. The later still
                 *  returns the encoded ByteBuffer in the `encoded` property on the error.
                 * @expose
                 * @see ProtoBuf.Builder.Message#encode64
                 * @see ProtoBuf.Builder.Message#encodeHex
                 * @see ProtoBuf.Builder.Message#encodeAB
                 */
                MessagePrototype.encode = function(buffer, noVerify) {
                    if (typeof buffer === 'boolean')
                        noVerify = buffer,
                        buffer = undefined;
                    var isNew = false;
                    if (!buffer)
                        buffer = new ByteBuffer(),
                        isNew = true;
                    var le = buffer.littleEndian;
                    try {
                        T.encode(this, buffer.LE(), noVerify);
                        return (isNew ? buffer.flip() : buffer).LE(le);
                    } catch (e) {
                        buffer.LE(le);
                        throw(e);
                    }
                };

                /**
                 * Encodes a message using the specified data payload.
                 * @param {!Object.<string,*>} data Data payload
                 * @param {(!ByteBuffer|boolean)=} buffer ByteBuffer to encode to. Will create a new one and flip it if omitted.
                 * @param {boolean=} noVerify Whether to not verify field values, defaults to `false`
                 * @return {!ByteBuffer} Encoded message as a ByteBuffer
                 * @expose
                 */
                Message.encode = function(data, buffer, noVerify) {
                    return new Message(data).encode(buffer, noVerify);
                };

                /**
                 * Calculates the byte length of the message.
                 * @name ProtoBuf.Builder.Message#calculate
                 * @function
                 * @returns {number} Byte length
                 * @throws {Error} If the message cannot be calculated or if required fields are missing.
                 * @expose
                 */
                MessagePrototype.calculate = function() {
                    return T.calculate(this);
                };

                /**
                 * Encodes the varint32 length-delimited message.
                 * @name ProtoBuf.Builder.Message#encodeDelimited
                 * @function
                 * @param {(!ByteBuffer|boolean)=} buffer ByteBuffer to encode to. Will create a new one and flip it if omitted.
                 * @param {boolean=} noVerify Whether to not verify field values, defaults to `false`
                 * @return {!ByteBuffer} Encoded message as a ByteBuffer
                 * @throws {Error} If the message cannot be encoded or if required fields are missing. The later still
                 *  returns the encoded ByteBuffer in the `encoded` property on the error.
                 * @expose
                 */
                MessagePrototype.encodeDelimited = function(buffer, noVerify) {
                    var isNew = false;
                    if (!buffer)
                        buffer = new ByteBuffer(),
                        isNew = true;
                    var enc = new ByteBuffer().LE();
                    T.encode(this, enc, noVerify).flip();
                    buffer.writeVarint32(enc.remaining());
                    buffer.append(enc);
                    return isNew ? buffer.flip() : buffer;
                };

                /**
                 * Directly encodes the message to an ArrayBuffer.
                 * @name ProtoBuf.Builder.Message#encodeAB
                 * @function
                 * @return {ArrayBuffer} Encoded message as ArrayBuffer
                 * @throws {Error} If the message cannot be encoded or if required fields are missing. The later still
                 *  returns the encoded ArrayBuffer in the `encoded` property on the error.
                 * @expose
                 */
                MessagePrototype.encodeAB = function() {
                    try {
                        return this.encode().toArrayBuffer();
                    } catch (e) {
                        if (e["encoded"]) e["encoded"] = e["encoded"].toArrayBuffer();
                        throw(e);
                    }
                };

                /**
                 * Returns the message as an ArrayBuffer. This is an alias for {@link ProtoBuf.Builder.Message#encodeAB}.
                 * @name ProtoBuf.Builder.Message#toArrayBuffer
                 * @function
                 * @return {ArrayBuffer} Encoded message as ArrayBuffer
                 * @throws {Error} If the message cannot be encoded or if required fields are missing. The later still
                 *  returns the encoded ArrayBuffer in the `encoded` property on the error.
                 * @expose
                 */
                MessagePrototype.toArrayBuffer = MessagePrototype.encodeAB;

                /**
                 * Directly encodes the message to a node Buffer.
                 * @name ProtoBuf.Builder.Message#encodeNB
                 * @function
                 * @return {!Buffer}
                 * @throws {Error} If the message cannot be encoded, not running under node.js or if required fields are
                 *  missing. The later still returns the encoded node Buffer in the `encoded` property on the error.
                 * @expose
                 */
                MessagePrototype.encodeNB = function() {
                    try {
                        return this.encode().toBuffer();
                    } catch (e) {
                        if (e["encoded"]) e["encoded"] = e["encoded"].toBuffer();
                        throw(e);
                    }
                };

                /**
                 * Returns the message as a node Buffer. This is an alias for {@link ProtoBuf.Builder.Message#encodeNB}.
                 * @name ProtoBuf.Builder.Message#toBuffer
                 * @function
                 * @return {!Buffer}
                 * @throws {Error} If the message cannot be encoded or if required fields are missing. The later still
                 *  returns the encoded node Buffer in the `encoded` property on the error.
                 * @expose
                 */
                MessagePrototype.toBuffer = MessagePrototype.encodeNB;

                /**
                 * Directly encodes the message to a base64 encoded string.
                 * @name ProtoBuf.Builder.Message#encode64
                 * @function
                 * @return {string} Base64 encoded string
                 * @throws {Error} If the underlying buffer cannot be encoded or if required fields are missing. The later
                 *  still returns the encoded base64 string in the `encoded` property on the error.
                 * @expose
                 */
                MessagePrototype.encode64 = function() {
                    try {
                        return this.encode().toBase64();
                    } catch (e) {
                        if (e["encoded"]) e["encoded"] = e["encoded"].toBase64();
                        throw(e);
                    }
                };

                /**
                 * Returns the message as a base64 encoded string. This is an alias for {@link ProtoBuf.Builder.Message#encode64}.
                 * @name ProtoBuf.Builder.Message#toBase64
                 * @function
                 * @return {string} Base64 encoded string
                 * @throws {Error} If the message cannot be encoded or if required fields are missing. The later still
                 *  returns the encoded base64 string in the `encoded` property on the error.
                 * @expose
                 */
                MessagePrototype.toBase64 = MessagePrototype.encode64;

                /**
                 * Directly encodes the message to a hex encoded string.
                 * @name ProtoBuf.Builder.Message#encodeHex
                 * @function
                 * @return {string} Hex encoded string
                 * @throws {Error} If the underlying buffer cannot be encoded or if required fields are missing. The later
                 *  still returns the encoded hex string in the `encoded` property on the error.
                 * @expose
                 */
                MessagePrototype.encodeHex = function() {
                    try {
                        return this.encode().toHex();
                    } catch (e) {
                        if (e["encoded"]) e["encoded"] = e["encoded"].toHex();
                        throw(e);
                    }
                };

                /**
                 * Returns the message as a hex encoded string. This is an alias for {@link ProtoBuf.Builder.Message#encodeHex}.
                 * @name ProtoBuf.Builder.Message#toHex
                 * @function
                 * @return {string} Hex encoded string
                 * @throws {Error} If the message cannot be encoded or if required fields are missing. The later still
                 *  returns the encoded hex string in the `encoded` property on the error.
                 * @expose
                 */
                MessagePrototype.toHex = MessagePrototype.encodeHex;

                /**
                 * Clones a message object or field value to a raw object.
                 * @param {*} obj Object to clone
                 * @param {boolean} binaryAsBase64 Whether to include binary data as base64 strings or as a buffer otherwise
                 * @param {boolean} longsAsStrings Whether to encode longs as strings
                 * @param {!ProtoBuf.Reflect.T=} resolvedType The resolved field type if a field
                 * @returns {*} Cloned object
                 * @inner
                 */
                function cloneRaw(obj, binaryAsBase64, longsAsStrings, resolvedType) {
                    if (obj === null || typeof obj !== 'object') {
                        // Convert enum values to their respective names
                        if (resolvedType && resolvedType instanceof ProtoBuf.Reflect.Enum) {
                            var name = ProtoBuf.Reflect.Enum.getName(resolvedType.object, obj);
                            if (name !== null)
                                return name;
                        }
                        // Pass-through string, number, boolean, null...
                        return obj;
                    }
                    // Convert ByteBuffers to raw buffer or strings
                    if (ByteBuffer.isByteBuffer(obj))
                        return binaryAsBase64 ? obj.toBase64() : obj.toBuffer();
                    // Convert Longs to proper objects or strings
                    if (ProtoBuf.Long.isLong(obj))
                        return longsAsStrings ? obj.toString() : ProtoBuf.Long.fromValue(obj);
                    var clone;
                    // Clone arrays
                    if (Array.isArray(obj)) {
                        clone = [];
                        obj.forEach(function(v, k) {
                            clone[k] = cloneRaw(v, binaryAsBase64, longsAsStrings, resolvedType);
                        });
                        return clone;
                    }
                    clone = {};
                    // Convert maps to objects
                    if (obj instanceof ProtoBuf.Map) {
                        var it = obj.entries();
                        for (var e = it.next(); !e.done; e = it.next())
                            clone[obj.keyElem.valueToString(e.value[0])] = cloneRaw(e.value[1], binaryAsBase64, longsAsStrings, obj.valueElem.resolvedType);
                        return clone;
                    }
                    // Everything else is a non-null object
                    var type = obj.$type,
                        field = undefined;
                    for (var i in obj)
                        if (obj.hasOwnProperty(i)) {
                            if (type && (field = type.getChild(i)))
                                clone[i] = cloneRaw(obj[i], binaryAsBase64, longsAsStrings, field.resolvedType);
                            else
                                clone[i] = cloneRaw(obj[i], binaryAsBase64, longsAsStrings);
                        }
                    return clone;
                }

                /**
                 * Returns the message's raw payload.
                 * @param {boolean=} binaryAsBase64 Whether to include binary data as base64 strings instead of Buffers, defaults to `false`
                 * @param {boolean} longsAsStrings Whether to encode longs as strings
                 * @returns {Object.<string,*>} Raw payload
                 * @expose
                 */
                MessagePrototype.toRaw = function(binaryAsBase64, longsAsStrings) {
                    return cloneRaw(this, !!binaryAsBase64, !!longsAsStrings, this.$type);
                };

                /**
                 * Encodes a message to JSON.
                 * @returns {string} JSON string
                 * @expose
                 */
                MessagePrototype.encodeJSON = function() {
                    return JSON.stringify(
                        cloneRaw(this,
                             /* binary-as-base64 */ true,
                             /* longs-as-strings */ true,
                             this.$type
                        )
                    );
                };

                /**
                 * Decodes a message from the specified buffer or string.
                 * @name ProtoBuf.Builder.Message.decode
                 * @function
                 * @param {!ByteBuffer|!ArrayBuffer|!Buffer|string} buffer Buffer to decode from
                 * @param {(number|string)=} length Message length. Defaults to decode all the remainig data.
                 * @param {string=} enc Encoding if buffer is a string: hex, utf8 (not recommended), defaults to base64
                 * @return {!ProtoBuf.Builder.Message} Decoded message
                 * @throws {Error} If the message cannot be decoded or if required fields are missing. The later still
                 *  returns the decoded message with missing fields in the `decoded` property on the error.
                 * @expose
                 * @see ProtoBuf.Builder.Message.decode64
                 * @see ProtoBuf.Builder.Message.decodeHex
                 */
                Message.decode = function(buffer, length, enc) {
                    if (typeof length === 'string')
                        enc = length,
                        length = -1;
                    if (typeof buffer === 'string')
                        buffer = ByteBuffer.wrap(buffer, enc ? enc : "base64");
                    buffer = ByteBuffer.isByteBuffer(buffer) ? buffer : ByteBuffer.wrap(buffer); // May throw
                    var le = buffer.littleEndian;
                    try {
                        var msg = T.decode(buffer.LE());
                        buffer.LE(le);
                        return msg;
                    } catch (e) {
                        buffer.LE(le);
                        throw(e);
                    }
                };

                /**
                 * Decodes a varint32 length-delimited message from the specified buffer or string.
                 * @name ProtoBuf.Builder.Message.decodeDelimited
                 * @function
                 * @param {!ByteBuffer|!ArrayBuffer|!Buffer|string} buffer Buffer to decode from
                 * @param {string=} enc Encoding if buffer is a string: hex, utf8 (not recommended), defaults to base64
                 * @return {ProtoBuf.Builder.Message} Decoded message or `null` if not enough bytes are available yet
                 * @throws {Error} If the message cannot be decoded or if required fields are missing. The later still
                 *  returns the decoded message with missing fields in the `decoded` property on the error.
                 * @expose
                 */
                Message.decodeDelimited = function(buffer, enc) {
                    if (typeof buffer === 'string')
                        buffer = ByteBuffer.wrap(buffer, enc ? enc : "base64");
                    buffer = ByteBuffer.isByteBuffer(buffer) ? buffer : ByteBuffer.wrap(buffer); // May throw
                    if (buffer.remaining() < 1)
                        return null;
                    var off = buffer.offset,
                        len = buffer.readVarint32();
                    if (buffer.remaining() < len) {
                        buffer.offset = off;
                        return null;
                    }
                    try {
                        var msg = T.decode(buffer.slice(buffer.offset, buffer.offset + len).LE());
                        buffer.offset += len;
                        return msg;
                    } catch (err) {
                        buffer.offset += len;
                        throw err;
                    }
                };

                /**
                 * Decodes the message from the specified base64 encoded string.
                 * @name ProtoBuf.Builder.Message.decode64
                 * @function
                 * @param {string} str String to decode from
                 * @return {!ProtoBuf.Builder.Message} Decoded message
                 * @throws {Error} If the message cannot be decoded or if required fields are missing. The later still
                 *  returns the decoded message with missing fields in the `decoded` property on the error.
                 * @expose
                 */
                Message.decode64 = function(str) {
                    return Message.decode(str, "base64");
                };

                /**
                 * Decodes the message from the specified hex encoded string.
                 * @name ProtoBuf.Builder.Message.decodeHex
                 * @function
                 * @param {string} str String to decode from
                 * @return {!ProtoBuf.Builder.Message} Decoded message
                 * @throws {Error} If the message cannot be decoded or if required fields are missing. The later still
                 *  returns the decoded message with missing fields in the `decoded` property on the error.
                 * @expose
                 */
                Message.decodeHex = function(str) {
                    return Message.decode(str, "hex");
                };

                /**
                 * Decodes the message from a JSON string.
                 * @name ProtoBuf.Builder.Message.decodeJSON
                 * @function
                 * @param {string} str String to decode from
                 * @return {!ProtoBuf.Builder.Message} Decoded message
                 * @throws {Error} If the message cannot be decoded or if required fields are
                 * missing.
                 * @expose
                 */
                Message.decodeJSON = function(str) {
                    return new Message(JSON.parse(str));
                };

                // Utility

                /**
                 * Returns a string representation of this Message.
                 * @name ProtoBuf.Builder.Message#toString
                 * @function
                 * @return {string} String representation as of ".Fully.Qualified.MessageName"
                 * @expose
                 */
                MessagePrototype.toString = function() {
                    return T.toString();
                };

                // Properties

                /**
                 * Message options.
                 * @name ProtoBuf.Builder.Message.$options
                 * @type {Object.<string,*>}
                 * @expose
                 */
                var $optionsS; // cc needs this

                /**
                 * Message options.
                 * @name ProtoBuf.Builder.Message#$options
                 * @type {Object.<string,*>}
                 * @expose
                 */
                var $options;

                /**
                 * Reflection type.
                 * @name ProtoBuf.Builder.Message.$type
                 * @type {!ProtoBuf.Reflect.Message}
                 * @expose
                 */
                var $typeS;

                /**
                 * Reflection type.
                 * @name ProtoBuf.Builder.Message#$type
                 * @type {!ProtoBuf.Reflect.Message}
                 * @expose
                 */
                var $type;

                if (Object.defineProperty)
                    Object.defineProperty(Message, '$options', { "value": T.buildOpt() }),
                    Object.defineProperty(MessagePrototype, "$options", { "value": Message["$options"] }),
                    Object.defineProperty(Message, "$type", { "value": T }),
                    Object.defineProperty(MessagePrototype, "$type", { "value": T });

                return Message;

            })(ProtoBuf, this);

            // Static enums and prototyped sub-messages / cached collections
            this._fields = [];
            this._fieldsById = {};
            this._fieldsByName = {};
            for (var i=0, k=this.children.length, child; i<k; i++) {
                child = this.children[i];
                if (child instanceof Enum || child instanceof Message || child instanceof Service) {
                    if (clazz.hasOwnProperty(child.name))
                        throw Error("Illegal reflect child of "+this.toString(true)+": "+child.toString(true)+" cannot override static property '"+child.name+"'");
                    clazz[child.name] = child.build();
                } else if (child instanceof Message.Field)
                    child.build(),
                    this._fields.push(child),
                    this._fieldsById[child.id] = child,
                    this._fieldsByName[child.name] = child;
                else if (!(child instanceof Message.OneOf) && !(child instanceof Extension)) // Not built
                    throw Error("Illegal reflect child of "+this.toString(true)+": "+this.children[i].toString(true));
            }

            return this.clazz = clazz;
        };

        /**
         * Encodes a runtime message's contents to the specified buffer.
         * @param {!ProtoBuf.Builder.Message} message Runtime message to encode
         * @param {ByteBuffer} buffer ByteBuffer to write to
         * @param {boolean=} noVerify Whether to not verify field values, defaults to `false`
         * @return {ByteBuffer} The ByteBuffer for chaining
         * @throws {Error} If required fields are missing or the message cannot be encoded for another reason
         * @expose
         */
        MessagePrototype.encode = function(message, buffer, noVerify) {
            var fieldMissing = null,
                field;
            for (var i=0, k=this._fields.length, val; i<k; ++i) {
                field = this._fields[i];
                val = message[field.name];
                if (field.required && val === null) {
                    if (fieldMissing === null)
                        fieldMissing = field;
                } else
                    field.encode(noVerify ? val : field.verifyValue(val), buffer, message);
            }
            if (fieldMissing !== null) {
                var err = Error("Missing at least one required field for "+this.toString(true)+": "+fieldMissing);
                err["encoded"] = buffer; // Still expose what we got
                throw(err);
            }
            return buffer;
        };

        /**
         * Calculates a runtime message's byte length.
         * @param {!ProtoBuf.Builder.Message} message Runtime message to encode
         * @returns {number} Byte length
         * @throws {Error} If required fields are missing or the message cannot be calculated for another reason
         * @expose
         */
        MessagePrototype.calculate = function(message) {
            for (var n=0, i=0, k=this._fields.length, field, val; i<k; ++i) {
                field = this._fields[i];
                val = message[field.name];
                if (field.required && val === null)
                   throw Error("Missing at least one required field for "+this.toString(true)+": "+field);
                else
                    n += field.calculate(val, message);
            }
            return n;
        };

        /**
         * Skips all data until the end of the specified group has been reached.
         * @param {number} expectedId Expected GROUPEND id
         * @param {!ByteBuffer} buf ByteBuffer
         * @returns {boolean} `true` if a value as been skipped, `false` if the end has been reached
         * @throws {Error} If it wasn't possible to find the end of the group (buffer overrun or end tag mismatch)
         * @inner
         */
        function skipTillGroupEnd(expectedId, buf) {
            var tag = buf.readVarint32(), // Throws on OOB
                wireType = tag & 0x07,
                id = tag >>> 3;
            switch (wireType) {
                case ProtoBuf.WIRE_TYPES.VARINT:
                    do tag = buf.readUint8();
                    while ((tag & 0x80) === 0x80);
                    break;
                case ProtoBuf.WIRE_TYPES.BITS64:
                    buf.offset += 8;
                    break;
                case ProtoBuf.WIRE_TYPES.LDELIM:
                    tag = buf.readVarint32(); // reads the varint
                    buf.offset += tag;        // skips n bytes
                    break;
                case ProtoBuf.WIRE_TYPES.STARTGROUP:
                    skipTillGroupEnd(id, buf);
                    break;
                case ProtoBuf.WIRE_TYPES.ENDGROUP:
                    if (id === expectedId)
                        return false;
                    else
                        throw Error("Illegal GROUPEND after unknown group: "+id+" ("+expectedId+" expected)");
                case ProtoBuf.WIRE_TYPES.BITS32:
                    buf.offset += 4;
                    break;
                default:
                    throw Error("Illegal wire type in unknown group "+expectedId+": "+wireType);
            }
            return true;
        }

        /**
         * Decodes an encoded message and returns the decoded message.
         * @param {ByteBuffer} buffer ByteBuffer to decode from
         * @param {number=} length Message length. Defaults to decode all remaining data.
         * @param {number=} expectedGroupEndId Expected GROUPEND id if this is a legacy group
         * @return {ProtoBuf.Builder.Message} Decoded message
         * @throws {Error} If the message cannot be decoded
         * @expose
         */
        MessagePrototype.decode = function(buffer, length, expectedGroupEndId) {
            length = typeof length === 'number' ? length : -1;
            var start = buffer.offset,
                msg = new (this.clazz)(),
                tag, wireType, id, field;
            while (buffer.offset < start+length || (length === -1 && buffer.remaining() > 0)) {
                tag = buffer.readVarint32();
                wireType = tag & 0x07;
                id = tag >>> 3;
                if (wireType === ProtoBuf.WIRE_TYPES.ENDGROUP) {
                    if (id !== expectedGroupEndId)
                        throw Error("Illegal group end indicator for "+this.toString(true)+": "+id+" ("+(expectedGroupEndId ? expectedGroupEndId+" expected" : "not a group")+")");
                    break;
                }
                if (!(field = this._fieldsById[id])) {
                    // "messages created by your new code can be parsed by your old code: old binaries simply ignore the new field when parsing."
                    switch (wireType) {
                        case ProtoBuf.WIRE_TYPES.VARINT:
                            buffer.readVarint32();
                            break;
                        case ProtoBuf.WIRE_TYPES.BITS32:
                            buffer.offset += 4;
                            break;
                        case ProtoBuf.WIRE_TYPES.BITS64:
                            buffer.offset += 8;
                            break;
                        case ProtoBuf.WIRE_TYPES.LDELIM:
                            var len = buffer.readVarint32();
                            buffer.offset += len;
                            break;
                        case ProtoBuf.WIRE_TYPES.STARTGROUP:
                            while (skipTillGroupEnd(id, buffer)) {}
                            break;
                        default:
                            throw Error("Illegal wire type for unknown field "+id+" in "+this.toString(true)+"#decode: "+wireType);
                    }
                    continue;
                }
                if (field.repeated && !field.options["packed"]) {
                    msg[field.name].push(field.decode(wireType, buffer));
                } else if (field.map) {
                    var keyval = field.decode(wireType, buffer);
                    msg[field.name].set(keyval[0], keyval[1]);
                } else {
                    msg[field.name] = field.decode(wireType, buffer);
                    if (field.oneof) { // Field is part of an OneOf (not a virtual OneOf field)
                        var currentField = msg[field.oneof.name]; // Virtual field references currently set field
                        if (currentField !== null && currentField !== field.name)
                            msg[currentField] = null; // Clear currently set field
                        msg[field.oneof.name] = field.name; // Point virtual field at this field
                    }
                }
            }

            // Check if all required fields are present and set default values for optional fields that are not
            for (var i=0, k=this._fields.length; i<k; ++i) {
                field = this._fields[i];
                if (msg[field.name] === null) {
                    if (this.syntax === "proto3") { // Proto3 sets default values by specification
                        msg[field.name] = field.defaultValue;
                    } else if (field.required) {
                        var err = Error("Missing at least one required field for " + this.toString(true) + ": " + field.name);
                        err["decoded"] = msg; // Still expose what we got
                        throw(err);
                    } else if (ProtoBuf.populateDefaults && field.defaultValue !== null)
                        msg[field.name] = field.defaultValue;
                }
            }
            return msg;
        };

        /**
         * @alias ProtoBuf.Reflect.Message
         * @expose
         */
        Reflect.Message = Message;

        /**
         * Constructs a new Message Field.
         * @exports ProtoBuf.Reflect.Message.Field
         * @param {!ProtoBuf.Builder} builder Builder reference
         * @param {!ProtoBuf.Reflect.Message} message Message reference
         * @param {string} rule Rule, one of requried, optional, repeated
         * @param {string?} keytype Key data type, if any.
         * @param {string} type Data type, e.g. int32
         * @param {string} name Field name
         * @param {number} id Unique field id
         * @param {Object.<string,*>=} options Options
         * @param {!ProtoBuf.Reflect.Message.OneOf=} oneof Enclosing OneOf
         * @param {string?} syntax The syntax level of this definition (e.g., proto3)
         * @constructor
         * @extends ProtoBuf.Reflect.T
         */
        var Field = function(builder, message, rule, keytype, type, name, id, options, oneof, syntax) {
            T.call(this, builder, message, name);

            /**
             * @override
             */
            this.className = "Message.Field";

            /**
             * Message field required flag.
             * @type {boolean}
             * @expose
             */
            this.required = rule === "required";

            /**
             * Message field repeated flag.
             * @type {boolean}
             * @expose
             */
            this.repeated = rule === "repeated";

            /**
             * Message field map flag.
             * @type {boolean}
             * @expose
             */
            this.map = rule === "map";

            /**
             * Message field key type. Type reference string if unresolved, protobuf
             * type if resolved. Valid only if this.map === true, null otherwise.
             * @type {string|{name: string, wireType: number}|null}
             * @expose
             */
            this.keyType = keytype || null;

            /**
             * Message field type. Type reference string if unresolved, protobuf type if
             * resolved. In a map field, this is the value type.
             * @type {string|{name: string, wireType: number}}
             * @expose
             */
            this.type = type;

            /**
             * Resolved type reference inside the global namespace.
             * @type {ProtoBuf.Reflect.T|null}
             * @expose
             */
            this.resolvedType = null;

            /**
             * Unique message field id.
             * @type {number}
             * @expose
             */
            this.id = id;

            /**
             * Message field options.
             * @type {!Object.<string,*>}
             * @dict
             * @expose
             */
            this.options = options || {};

            /**
             * Default value.
             * @type {*}
             * @expose
             */
            this.defaultValue = null;

            /**
             * Enclosing OneOf.
             * @type {?ProtoBuf.Reflect.Message.OneOf}
             * @expose
             */
            this.oneof = oneof || null;

            /**
             * Syntax level of this definition (e.g., proto3).
             * @type {string}
             * @expose
             */
            this.syntax = syntax || 'proto2';

            /**
             * Original field name.
             * @type {string}
             * @expose
             */
            this.originalName = this.name; // Used to revert camelcase transformation on naming collisions

            /**
             * Element implementation. Created in build() after types are resolved.
             * @type {ProtoBuf.Element}
             * @expose
             */
            this.element = null;

            /**
             * Key element implementation, for map fields. Created in build() after
             * types are resolved.
             * @type {ProtoBuf.Element}
             * @expose
             */
            this.keyElement = null;

            // Convert field names to camel case notation if the override is set
            if (this.builder.options['convertFieldsToCamelCase'] && !(this instanceof Message.ExtensionField))
                this.name = ProtoBuf.Util.toCamelCase(this.name);
        };

        /**
         * @alias ProtoBuf.Reflect.Message.Field.prototype
         * @inner
         */
        var FieldPrototype = Field.prototype = Object.create(T.prototype);

        /**
         * Builds the field.
         * @override
         * @expose
         */
        FieldPrototype.build = function() {
            this.element = new Element(this.type, this.resolvedType, false, this.syntax);
            if (this.map)
                this.keyElement = new Element(this.keyType, undefined, true, this.syntax);

            // In proto3, fields do not have field presence, and every field is set to
            // its type's default value ("", 0, 0.0, or false).
            if (this.syntax === 'proto3' && !this.repeated && !this.map)
                this.defaultValue = Element.defaultFieldValue(this.type);

            // Otherwise, default values are present when explicitly specified
            else if (typeof this.options['default'] !== 'undefined')
                this.defaultValue = this.verifyValue(this.options['default']);
        };

        /**
         * Checks if the given value can be set for this field.
         * @param {*} value Value to check
         * @param {boolean=} skipRepeated Whether to skip the repeated value check or not. Defaults to false.
         * @return {*} Verified, maybe adjusted, value
         * @throws {Error} If the value cannot be set for this field
         * @expose
         */
        FieldPrototype.verifyValue = function(value, skipRepeated) {
            skipRepeated = skipRepeated || false;
            var self = this;
            function fail(val, msg) {
                throw Error("Illegal value for "+self.toString(true)+" of type "+self.type.name+": "+val+" ("+msg+")");
            }
            if (value === null) { // NULL values for optional fields
                if (this.required)
                    fail(typeof value, "required");
                if (this.syntax === 'proto3' && this.type !== ProtoBuf.TYPES["message"])
                    fail(typeof value, "proto3 field without field presence cannot be null");
                return null;
            }
            var i;
            if (this.repeated && !skipRepeated) { // Repeated values as arrays
                if (!Array.isArray(value))
                    value = [value];
                var res = [];
                for (i=0; i<value.length; i++)
                    res.push(this.element.verifyValue(value[i]));
                return res;
            }
            if (this.map && !skipRepeated) { // Map values as objects
                if (!(value instanceof ProtoBuf.Map)) {
                    // If not already a Map, attempt to convert.
                    if (!(value instanceof Object)) {
                        fail(typeof value,
                             "expected ProtoBuf.Map or raw object for map field");
                    }
                    return new ProtoBuf.Map(this, value);
                } else {
                    return value;
                }
            }
            // All non-repeated fields expect no array
            if (!this.repeated && Array.isArray(value))
                fail(typeof value, "no array expected");

            return this.element.verifyValue(value);
        };

        /**
         * Determines whether the field will have a presence on the wire given its
         * value.
         * @param {*} value Verified field value
         * @param {!ProtoBuf.Builder.Message} message Runtime message
         * @return {boolean} Whether the field will be present on the wire
         */
        FieldPrototype.hasWirePresence = function(value, message) {
            if (this.syntax !== 'proto3')
                return (value !== null);
            if (this.oneof && message[this.oneof.name] === this.name)
                return true;
            switch (this.type) {
                case ProtoBuf.TYPES["int32"]:
                case ProtoBuf.TYPES["sint32"]:
                case ProtoBuf.TYPES["sfixed32"]:
                case ProtoBuf.TYPES["uint32"]:
                case ProtoBuf.TYPES["fixed32"]:
                    return value !== 0;

                case ProtoBuf.TYPES["int64"]:
                case ProtoBuf.TYPES["sint64"]:
                case ProtoBuf.TYPES["sfixed64"]:
                case ProtoBuf.TYPES["uint64"]:
                case ProtoBuf.TYPES["fixed64"]:
                    return value.low !== 0 || value.high !== 0;

                case ProtoBuf.TYPES["bool"]:
                    return value;

                case ProtoBuf.TYPES["float"]:
                case ProtoBuf.TYPES["double"]:
                    return value !== 0.0;

                case ProtoBuf.TYPES["string"]:
                    return value.length > 0;

                case ProtoBuf.TYPES["bytes"]:
                    return value.remaining() > 0;

                case ProtoBuf.TYPES["enum"]:
                    return value !== 0;

                case ProtoBuf.TYPES["message"]:
                    return value !== null;
                default:
                    return true;
            }
        };

        /**
         * Encodes the specified field value to the specified buffer.
         * @param {*} value Verified field value
         * @param {ByteBuffer} buffer ByteBuffer to encode to
         * @param {!ProtoBuf.Builder.Message} message Runtime message
         * @return {ByteBuffer} The ByteBuffer for chaining
         * @throws {Error} If the field cannot be encoded
         * @expose
         */
        FieldPrototype.encode = function(value, buffer, message) {
            if (this.type === null || typeof this.type !== 'object')
                throw Error("[INTERNAL] Unresolved type in "+this.toString(true)+": "+this.type);
            if (value === null || (this.repeated && value.length == 0))
                return buffer; // Optional omitted
            try {
                if (this.repeated) {
                    var i;
                    // "Only repeated fields of primitive numeric types (types which use the varint, 32-bit, or 64-bit wire
                    // types) can be declared 'packed'."
                    if (this.options["packed"] && ProtoBuf.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0) {
                        // "All of the elements of the field are packed into a single key-value pair with wire type 2
                        // (length-delimited). Each element is encoded the same way it would be normally, except without a
                        // tag preceding it."
                        buffer.writeVarint32((this.id << 3) | ProtoBuf.WIRE_TYPES.LDELIM);
                        buffer.ensureCapacity(buffer.offset += 1); // We do not know the length yet, so let's assume a varint of length 1
                        var start = buffer.offset; // Remember where the contents begin
                        for (i=0; i<value.length; i++)
                            this.element.encodeValue(this.id, value[i], buffer);
                        var len = buffer.offset-start,
                            varintLen = ByteBuffer.calculateVarint32(len);
                        if (varintLen > 1) { // We need to move the contents
                            var contents = buffer.slice(start, buffer.offset);
                            start += varintLen-1;
                            buffer.offset = start;
                            buffer.append(contents);
                        }
                        buffer.writeVarint32(len, start-varintLen);
                    } else {
                        // "If your message definition has repeated elements (without the [packed=true] option), the encoded
                        // message has zero or more key-value pairs with the same tag number"
                        for (i=0; i<value.length; i++)
                            buffer.writeVarint32((this.id << 3) | this.type.wireType),
                            this.element.encodeValue(this.id, value[i], buffer);
                    }
                } else if (this.map) {
                    // Write out each map entry as a submessage.
                    value.forEach(function(val, key, m) {
                        // Compute the length of the submessage (key, val) pair.
                        var length =
                            ByteBuffer.calculateVarint32((1 << 3) | this.keyType.wireType) +
                            this.keyElement.calculateLength(1, key) +
                            ByteBuffer.calculateVarint32((2 << 3) | this.type.wireType) +
                            this.element.calculateLength(2, val);

                        // Submessage with wire type of length-delimited.
                        buffer.writeVarint32((this.id << 3) | ProtoBuf.WIRE_TYPES.LDELIM);
                        buffer.writeVarint32(length);

                        // Write out the key and val.
                        buffer.writeVarint32((1 << 3) | this.keyType.wireType);
                        this.keyElement.encodeValue(1, key, buffer);
                        buffer.writeVarint32((2 << 3) | this.type.wireType);
                        this.element.encodeValue(2, val, buffer);
                    }, this);
                } else {
                    if (this.hasWirePresence(value, message)) {
                        buffer.writeVarint32((this.id << 3) | this.type.wireType);
                        this.element.encodeValue(this.id, value, buffer);
                    }
                }
            } catch (e) {
                throw Error("Illegal value for "+this.toString(true)+": "+value+" ("+e+")");
            }
            return buffer;
        };

        /**
         * Calculates the length of this field's value on the network level.
         * @param {*} value Field value
         * @param {!ProtoBuf.Builder.Message} message Runtime message
         * @returns {number} Byte length
         * @expose
         */
        FieldPrototype.calculate = function(value, message) {
            value = this.verifyValue(value); // May throw
            if (this.type === null || typeof this.type !== 'object')
                throw Error("[INTERNAL] Unresolved type in "+this.toString(true)+": "+this.type);
            if (value === null || (this.repeated && value.length == 0))
                return 0; // Optional omitted
            var n = 0;
            try {
                if (this.repeated) {
                    var i, ni;
                    if (this.options["packed"] && ProtoBuf.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0) {
                        n += ByteBuffer.calculateVarint32((this.id << 3) | ProtoBuf.WIRE_TYPES.LDELIM);
                        ni = 0;
                        for (i=0; i<value.length; i++)
                            ni += this.element.calculateLength(this.id, value[i]);
                        n += ByteBuffer.calculateVarint32(ni);
                        n += ni;
                    } else {
                        for (i=0; i<value.length; i++)
                            n += ByteBuffer.calculateVarint32((this.id << 3) | this.type.wireType),
                            n += this.element.calculateLength(this.id, value[i]);
                    }
                } else if (this.map) {
                    // Each map entry becomes a submessage.
                    value.forEach(function(val, key, m) {
                        // Compute the length of the submessage (key, val) pair.
                        var length =
                            ByteBuffer.calculateVarint32((1 << 3) | this.keyType.wireType) +
                            this.keyElement.calculateLength(1, key) +
                            ByteBuffer.calculateVarint32((2 << 3) | this.type.wireType) +
                            this.element.calculateLength(2, val);

                        n += ByteBuffer.calculateVarint32((this.id << 3) | ProtoBuf.WIRE_TYPES.LDELIM);
                        n += ByteBuffer.calculateVarint32(length);
                        n += length;
                    }, this);
                } else {
                    if (this.hasWirePresence(value, message)) {
                        n += ByteBuffer.calculateVarint32((this.id << 3) | this.type.wireType);
                        n += this.element.calculateLength(this.id, value);
                    }
                }
            } catch (e) {
                throw Error("Illegal value for "+this.toString(true)+": "+value+" ("+e+")");
            }
            return n;
        };

        /**
         * Decode the field value from the specified buffer.
         * @param {number} wireType Leading wire type
         * @param {ByteBuffer} buffer ByteBuffer to decode from
         * @param {boolean=} skipRepeated Whether to skip the repeated check or not. Defaults to false.
         * @return {*} Decoded value: array for packed repeated fields, [key, value] for
         *             map fields, or an individual value otherwise.
         * @throws {Error} If the field cannot be decoded
         * @expose
         */
        FieldPrototype.decode = function(wireType, buffer, skipRepeated) {
            var value, nBytes;

            // We expect wireType to match the underlying type's wireType unless we see
            // a packed repeated field, or unless this is a map field.
            var wireTypeOK =
                (!this.map && wireType == this.type.wireType) ||
                (!skipRepeated && this.repeated && this.options["packed"] &&
                 wireType == ProtoBuf.WIRE_TYPES.LDELIM) ||
                (this.map && wireType == ProtoBuf.WIRE_TYPES.LDELIM);
            if (!wireTypeOK)
                throw Error("Illegal wire type for field "+this.toString(true)+": "+wireType+" ("+this.type.wireType+" expected)");

            // Handle packed repeated fields.
            if (wireType == ProtoBuf.WIRE_TYPES.LDELIM && this.repeated && this.options["packed"] && ProtoBuf.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0) {
                if (!skipRepeated) {
                    nBytes = buffer.readVarint32();
                    nBytes = buffer.offset + nBytes; // Limit
                    var values = [];
                    while (buffer.offset < nBytes)
                        values.push(this.decode(this.type.wireType, buffer, true));
                    return values;
                }
                // Read the next value otherwise...
            }

            // Handle maps.
            if (this.map) {
                // Read one (key, value) submessage, and return [key, value]
                var key = Element.defaultFieldValue(this.keyType);
                value = Element.defaultFieldValue(this.type);

                // Read the length
                nBytes = buffer.readVarint32();
                if (buffer.remaining() < nBytes)
                    throw Error("Illegal number of bytes for "+this.toString(true)+": "+nBytes+" required but got only "+buffer.remaining());

                // Get a sub-buffer of this key/value submessage
                var msgbuf = buffer.clone();
                msgbuf.limit = msgbuf.offset + nBytes;
                buffer.offset += nBytes;

                while (msgbuf.remaining() > 0) {
                    var tag = msgbuf.readVarint32();
                    wireType = tag & 0x07;
                    var id = tag >>> 3;
                    if (id === 1) {
                        key = this.keyElement.decode(msgbuf, wireType, id);
                    } else if (id === 2) {
                        value = this.element.decode(msgbuf, wireType, id);
                    } else {
                        throw Error("Unexpected tag in map field key/value submessage");
                    }
                }

                return [key, value];
            }

            // Handle singular and non-packed repeated field values.
            return this.element.decode(buffer, wireType, this.id);
        };

        /**
         * @alias ProtoBuf.Reflect.Message.Field
         * @expose
         */
        Reflect.Message.Field = Field;

        /**
         * Constructs a new Message ExtensionField.
         * @exports ProtoBuf.Reflect.Message.ExtensionField
         * @param {!ProtoBuf.Builder} builder Builder reference
         * @param {!ProtoBuf.Reflect.Message} message Message reference
         * @param {string} rule Rule, one of requried, optional, repeated
         * @param {string} type Data type, e.g. int32
         * @param {string} name Field name
         * @param {number} id Unique field id
         * @param {!Object.<string,*>=} options Options
         * @constructor
         * @extends ProtoBuf.Reflect.Message.Field
         */
        var ExtensionField = function(builder, message, rule, type, name, id, options) {
            Field.call(this, builder, message, rule, /* keytype = */ null, type, name, id, options);

            /**
             * Extension reference.
             * @type {!ProtoBuf.Reflect.Extension}
             * @expose
             */
            this.extension;
        };

        // Extends Field
        ExtensionField.prototype = Object.create(Field.prototype);

        /**
         * @alias ProtoBuf.Reflect.Message.ExtensionField
         * @expose
         */
        Reflect.Message.ExtensionField = ExtensionField;

        /**
         * Constructs a new Message OneOf.
         * @exports ProtoBuf.Reflect.Message.OneOf
         * @param {!ProtoBuf.Builder} builder Builder reference
         * @param {!ProtoBuf.Reflect.Message} message Message reference
         * @param {string} name OneOf name
         * @constructor
         * @extends ProtoBuf.Reflect.T
         */
        var OneOf = function(builder, message, name) {
            T.call(this, builder, message, name);

            /**
             * Enclosed fields.
             * @type {!Array.<!ProtoBuf.Reflect.Message.Field>}
             * @expose
             */
            this.fields = [];
        };

        /**
         * @alias ProtoBuf.Reflect.Message.OneOf
         * @expose
         */
        Reflect.Message.OneOf = OneOf;

        /**
         * Constructs a new Enum.
         * @exports ProtoBuf.Reflect.Enum
         * @param {!ProtoBuf.Builder} builder Builder reference
         * @param {!ProtoBuf.Reflect.T} parent Parent Reflect object
         * @param {string} name Enum name
         * @param {Object.<string,*>=} options Enum options
         * @param {string?} syntax The syntax level (e.g., proto3)
         * @constructor
         * @extends ProtoBuf.Reflect.Namespace
         */
        var Enum = function(builder, parent, name, options, syntax) {
            Namespace.call(this, builder, parent, name, options, syntax);

            /**
             * @override
             */
            this.className = "Enum";

            /**
             * Runtime enum object.
             * @type {Object.<string,number>|null}
             * @expose
             */
            this.object = null;
        };

        /**
         * Gets the string name of an enum value.
         * @param {!ProtoBuf.Builder.Enum} enm Runtime enum
         * @param {number} value Enum value
         * @returns {?string} Name or `null` if not present
         * @expose
         */
        Enum.getName = function(enm, value) {
            var keys = Object.keys(enm);
            for (var i=0, key; i<keys.length; ++i)
                if (enm[key = keys[i]] === value)
                    return key;
            return null;
        };

        /**
         * @alias ProtoBuf.Reflect.Enum.prototype
         * @inner
         */
        var EnumPrototype = Enum.prototype = Object.create(Namespace.prototype);

        /**
         * Builds this enum and returns the runtime counterpart.
         * @param {boolean} rebuild Whether to rebuild or not, defaults to false
         * @returns {!Object.<string,number>}
         * @expose
         */
        EnumPrototype.build = function(rebuild) {
            if (this.object && !rebuild)
                return this.object;
            var enm = new ProtoBuf.Builder.Enum(),
                values = this.getChildren(Enum.Value);
            for (var i=0, k=values.length; i<k; ++i)
                enm[values[i]['name']] = values[i]['id'];
            if (Object.defineProperty)
                Object.defineProperty(enm, '$options', {
                    "value": this.buildOpt(),
                    "enumerable": false
                });
            return this.object = enm;
        };

        /**
         * @alias ProtoBuf.Reflect.Enum
         * @expose
         */
        Reflect.Enum = Enum;

        /**
         * Constructs a new Enum Value.
         * @exports ProtoBuf.Reflect.Enum.Value
         * @param {!ProtoBuf.Builder} builder Builder reference
         * @param {!ProtoBuf.Reflect.Enum} enm Enum reference
         * @param {string} name Field name
         * @param {number} id Unique field id
         * @constructor
         * @extends ProtoBuf.Reflect.T
         */
        var Value = function(builder, enm, name, id) {
            T.call(this, builder, enm, name);

            /**
             * @override
             */
            this.className = "Enum.Value";

            /**
             * Unique enum value id.
             * @type {number}
             * @expose
             */
            this.id = id;
        };

        // Extends T
        Value.prototype = Object.create(T.prototype);

        /**
         * @alias ProtoBuf.Reflect.Enum.Value
         * @expose
         */
        Reflect.Enum.Value = Value;

        /**
         * An extension (field).
         * @exports ProtoBuf.Reflect.Extension
         * @constructor
         * @param {!ProtoBuf.Builder} builder Builder reference
         * @param {!ProtoBuf.Reflect.T} parent Parent object
         * @param {string} name Object name
         * @param {!ProtoBuf.Reflect.Message.Field} field Extension field
         */
        var Extension = function(builder, parent, name, field) {
            T.call(this, builder, parent, name);

            /**
             * Extended message field.
             * @type {!ProtoBuf.Reflect.Message.Field}
             * @expose
             */
            this.field = field;
        };

        // Extends T
        Extension.prototype = Object.create(T.prototype);

        /**
         * @alias ProtoBuf.Reflect.Extension
         * @expose
         */
        Reflect.Extension = Extension;

        /**
         * Constructs a new Service.
         * @exports ProtoBuf.Reflect.Service
         * @param {!ProtoBuf.Builder} builder Builder reference
         * @param {!ProtoBuf.Reflect.Namespace} root Root
         * @param {string} name Service name
         * @param {Object.<string,*>=} options Options
         * @constructor
         * @extends ProtoBuf.Reflect.Namespace
         */
        var Service = function(builder, root, name, options) {
            Namespace.call(this, builder, root, name, options);

            /**
             * @override
             */
            this.className = "Service";

            /**
             * Built runtime service class.
             * @type {?function(new:ProtoBuf.Builder.Service)}
             */
            this.clazz = null;
        };

        /**
         * @alias ProtoBuf.Reflect.Service.prototype
         * @inner
         */
        var ServicePrototype = Service.prototype = Object.create(Namespace.prototype);

        /**
         * Builds the service and returns the runtime counterpart, which is a fully functional class.
         * @see ProtoBuf.Builder.Service
         * @param {boolean=} rebuild Whether to rebuild or not
         * @return {Function} Service class
         * @throws {Error} If the message cannot be built
         * @expose
         */
        ServicePrototype.build = function(rebuild) {
            if (this.clazz && !rebuild)
                return this.clazz;

            // Create the runtime Service class in its own scope
            return this.clazz = (function(ProtoBuf, T) {

                /**
                 * Constructs a new runtime Service.
                 * @name ProtoBuf.Builder.Service
                 * @param {function(string, ProtoBuf.Builder.Message, function(Error, ProtoBuf.Builder.Message=))=} rpcImpl RPC implementation receiving the method name and the message
                 * @class Barebone of all runtime services.
                 * @constructor
                 * @throws {Error} If the service cannot be created
                 */
                var Service = function(rpcImpl) {
                    ProtoBuf.Builder.Service.call(this);

                    /**
                     * Service implementation.
                     * @name ProtoBuf.Builder.Service#rpcImpl
                     * @type {!function(string, ProtoBuf.Builder.Message, function(Error, ProtoBuf.Builder.Message=))}
                     * @expose
                     */
                    this.rpcImpl = rpcImpl || function(name, msg, callback) {
                        // This is what a user has to implement: A function receiving the method name, the actual message to
                        // send (type checked) and the callback that's either provided with the error as its first
                        // argument or null and the actual response message.
                        setTimeout(callback.bind(this, Error("Not implemented, see: https://github.com/dcodeIO/ProtoBuf.js/wiki/Services")), 0); // Must be async!
                    };
                };

                /**
                 * @alias ProtoBuf.Builder.Service.prototype
                 * @inner
                 */
                var ServicePrototype = Service.prototype = Object.create(ProtoBuf.Builder.Service.prototype);

                /**
                 * Asynchronously performs an RPC call using the given RPC implementation.
                 * @name ProtoBuf.Builder.Service.[Method]
                 * @function
                 * @param {!function(string, ProtoBuf.Builder.Message, function(Error, ProtoBuf.Builder.Message=))} rpcImpl RPC implementation
                 * @param {ProtoBuf.Builder.Message} req Request
                 * @param {function(Error, (ProtoBuf.Builder.Message|ByteBuffer|Buffer|string)=)} callback Callback receiving
                 *  the error if any and the response either as a pre-parsed message or as its raw bytes
                 * @abstract
                 */

                /**
                 * Asynchronously performs an RPC call using the instance's RPC implementation.
                 * @name ProtoBuf.Builder.Service#[Method]
                 * @function
                 * @param {ProtoBuf.Builder.Message} req Request
                 * @param {function(Error, (ProtoBuf.Builder.Message|ByteBuffer|Buffer|string)=)} callback Callback receiving
                 *  the error if any and the response either as a pre-parsed message or as its raw bytes
                 * @abstract
                 */

                var rpc = T.getChildren(ProtoBuf.Reflect.Service.RPCMethod);
                for (var i=0; i<rpc.length; i++) {
                    (function(method) {

                        // service#Method(message, callback)
                        ServicePrototype[method.name] = function(req, callback) {
                            try {
                                try {
                                    // If given as a buffer, decode the request. Will throw a TypeError if not a valid buffer.
                                    req = method.resolvedRequestType.clazz.decode(ByteBuffer.wrap(req));
                                } catch (err) {
                                    if (!(err instanceof TypeError))
                                        throw err;
                                }
                                if (req === null || typeof req !== 'object')
                                    throw Error("Illegal arguments");
                                if (!(req instanceof method.resolvedRequestType.clazz))
                                    req = new method.resolvedRequestType.clazz(req);
                                this.rpcImpl(method.fqn(), req, function(err, res) { // Assumes that this is properly async
                                    if (err) {
                                        callback(err);
                                        return;
                                    }
                                    // Coalesce to empty string when service response has empty content
                                    if (res === null)
                                        res = ''
                                    try { res = method.resolvedResponseType.clazz.decode(res); } catch (notABuffer) {}
                                    if (!res || !(res instanceof method.resolvedResponseType.clazz)) {
                                        callback(Error("Illegal response type received in service method "+ T.name+"#"+method.name));
                                        return;
                                    }
                                    callback(null, res);
                                });
                            } catch (err) {
                                setTimeout(callback.bind(this, err), 0);
                            }
                        };

                        // Service.Method(rpcImpl, message, callback)
                        Service[method.name] = function(rpcImpl, req, callback) {
                            new Service(rpcImpl)[method.name](req, callback);
                        };

                        if (Object.defineProperty)
                            Object.defineProperty(Service[method.name], "$options", { "value": method.buildOpt() }),
                            Object.defineProperty(ServicePrototype[method.name], "$options", { "value": Service[method.name]["$options"] });
                    })(rpc[i]);
                }

                // Properties

                /**
                 * Service options.
                 * @name ProtoBuf.Builder.Service.$options
                 * @type {Object.<string,*>}
                 * @expose
                 */
                var $optionsS; // cc needs this

                /**
                 * Service options.
                 * @name ProtoBuf.Builder.Service#$options
                 * @type {Object.<string,*>}
                 * @expose
                 */
                var $options;

                /**
                 * Reflection type.
                 * @name ProtoBuf.Builder.Service.$type
                 * @type {!ProtoBuf.Reflect.Service}
                 * @expose
                 */
                var $typeS;

                /**
                 * Reflection type.
                 * @name ProtoBuf.Builder.Service#$type
                 * @type {!ProtoBuf.Reflect.Service}
                 * @expose
                 */
                var $type;

                if (Object.defineProperty)
                    Object.defineProperty(Service, "$options", { "value": T.buildOpt() }),
                    Object.defineProperty(ServicePrototype, "$options", { "value": Service["$options"] }),
                    Object.defineProperty(Service, "$type", { "value": T }),
                    Object.defineProperty(ServicePrototype, "$type", { "value": T });

                return Service;

            })(ProtoBuf, this);
        };

        /**
         * @alias ProtoBuf.Reflect.Service
         * @expose
         */
        Reflect.Service = Service;

        /**
         * Abstract service method.
         * @exports ProtoBuf.Reflect.Service.Method
         * @param {!ProtoBuf.Builder} builder Builder reference
         * @param {!ProtoBuf.Reflect.Service} svc Service
         * @param {string} name Method name
         * @param {Object.<string,*>=} options Options
         * @constructor
         * @extends ProtoBuf.Reflect.T
         */
        var Method = function(builder, svc, name, options) {
            T.call(this, builder, svc, name);

            /**
             * @override
             */
            this.className = "Service.Method";

            /**
             * Options.
             * @type {Object.<string, *>}
             * @expose
             */
            this.options = options || {};
        };

        /**
         * @alias ProtoBuf.Reflect.Service.Method.prototype
         * @inner
         */
        var MethodPrototype = Method.prototype = Object.create(T.prototype);

        /**
         * Builds the method's '$options' property.
         * @name ProtoBuf.Reflect.Service.Method#buildOpt
         * @function
         * @return {Object.<string,*>}
         */
        MethodPrototype.buildOpt = NamespacePrototype.buildOpt;

        /**
         * @alias ProtoBuf.Reflect.Service.Method
         * @expose
         */
        Reflect.Service.Method = Method;

        /**
         * RPC service method.
         * @exports ProtoBuf.Reflect.Service.RPCMethod
         * @param {!ProtoBuf.Builder} builder Builder reference
         * @param {!ProtoBuf.Reflect.Service} svc Service
         * @param {string} name Method name
         * @param {string} request Request message name
         * @param {string} response Response message name
         * @param {boolean} request_stream Whether requests are streamed
         * @param {boolean} response_stream Whether responses are streamed
         * @param {Object.<string,*>=} options Options
         * @constructor
         * @extends ProtoBuf.Reflect.Service.Method
         */
        var RPCMethod = function(builder, svc, name, request, response, request_stream, response_stream, options) {
            Method.call(this, builder, svc, name, options);

            /**
             * @override
             */
            this.className = "Service.RPCMethod";

            /**
             * Request message name.
             * @type {string}
             * @expose
             */
            this.requestName = request;

            /**
             * Response message name.
             * @type {string}
             * @expose
             */
            this.responseName = response;

            /**
             * Whether requests are streamed
             * @type {bool}
             * @expose
             */
            this.requestStream = request_stream;

            /**
             * Whether responses are streamed
             * @type {bool}
             * @expose
             */
            this.responseStream = response_stream;

            /**
             * Resolved request message type.
             * @type {ProtoBuf.Reflect.Message}
             * @expose
             */
            this.resolvedRequestType = null;

            /**
             * Resolved response message type.
             * @type {ProtoBuf.Reflect.Message}
             * @expose
             */
            this.resolvedResponseType = null;
        };

        // Extends Method
        RPCMethod.prototype = Object.create(Method.prototype);

        /**
         * @alias ProtoBuf.Reflect.Service.RPCMethod
         * @expose
         */
        Reflect.Service.RPCMethod = RPCMethod;

        return Reflect;

    })(ProtoBuf);

    /**
     * @alias ProtoBuf.Builder
     * @expose
     */
    ProtoBuf.Builder = (function(ProtoBuf, Lang, Reflect) {
        "use strict";

        /**
         * Constructs a new Builder.
         * @exports ProtoBuf.Builder
         * @class Provides the functionality to build protocol messages.
         * @param {Object.<string,*>=} options Options
         * @constructor
         */
        var Builder = function(options) {

            /**
             * Namespace.
             * @type {ProtoBuf.Reflect.Namespace}
             * @expose
             */
            this.ns = new Reflect.Namespace(this, null, ""); // Global namespace

            /**
             * Namespace pointer.
             * @type {ProtoBuf.Reflect.T}
             * @expose
             */
            this.ptr = this.ns;

            /**
             * Resolved flag.
             * @type {boolean}
             * @expose
             */
            this.resolved = false;

            /**
             * The current building result.
             * @type {Object.<string,ProtoBuf.Builder.Message|Object>|null}
             * @expose
             */
            this.result = null;

            /**
             * Imported files.
             * @type {Array.<string>}
             * @expose
             */
            this.files = {};

            /**
             * Import root override.
             * @type {?string}
             * @expose
             */
            this.importRoot = null;

            /**
             * Options.
             * @type {!Object.<string, *>}
             * @expose
             */
            this.options = options || {};
        };

        /**
         * @alias ProtoBuf.Builder.prototype
         * @inner
         */
        var BuilderPrototype = Builder.prototype;

        // ----- Definition tests -----

        /**
         * Tests if a definition most likely describes a message.
         * @param {!Object} def
         * @returns {boolean}
         * @expose
         */
        Builder.isMessage = function(def) {
            // Messages require a string name
            if (typeof def["name"] !== 'string')
                return false;
            // Messages do not contain values (enum) or rpc methods (service)
            if (typeof def["values"] !== 'undefined' || typeof def["rpc"] !== 'undefined')
                return false;
            return true;
        };

        /**
         * Tests if a definition most likely describes a message field.
         * @param {!Object} def
         * @returns {boolean}
         * @expose
         */
        Builder.isMessageField = function(def) {
            // Message fields require a string rule, name and type and an id
            if (typeof def["rule"] !== 'string' || typeof def["name"] !== 'string' || typeof def["type"] !== 'string' || typeof def["id"] === 'undefined')
                return false;
            return true;
        };

        /**
         * Tests if a definition most likely describes an enum.
         * @param {!Object} def
         * @returns {boolean}
         * @expose
         */
        Builder.isEnum = function(def) {
            // Enums require a string name
            if (typeof def["name"] !== 'string')
                return false;
            // Enums require at least one value
            if (typeof def["values"] === 'undefined' || !Array.isArray(def["values"]) || def["values"].length === 0)
                return false;
            return true;
        };

        /**
         * Tests if a definition most likely describes a service.
         * @param {!Object} def
         * @returns {boolean}
         * @expose
         */
        Builder.isService = function(def) {
            // Services require a string name and an rpc object
            if (typeof def["name"] !== 'string' || typeof def["rpc"] !== 'object' || !def["rpc"])
                return false;
            return true;
        };

        /**
         * Tests if a definition most likely describes an extended message
         * @param {!Object} def
         * @returns {boolean}
         * @expose
         */
        Builder.isExtend = function(def) {
            // Extends rquire a string ref
            if (typeof def["ref"] !== 'string')
                return false;
            return true;
        };

        // ----- Building -----

        /**
         * Resets the pointer to the root namespace.
         * @returns {!ProtoBuf.Builder} this
         * @expose
         */
        BuilderPrototype.reset = function() {
            this.ptr = this.ns;
            return this;
        };

        /**
         * Defines a namespace on top of the current pointer position and places the pointer on it.
         * @param {string} namespace
         * @return {!ProtoBuf.Builder} this
         * @expose
         */
        BuilderPrototype.define = function(namespace) {
            if (typeof namespace !== 'string' || !Lang.TYPEREF.test(namespace))
                throw Error("illegal namespace: "+namespace);
            namespace.split(".").forEach(function(part) {
                var ns = this.ptr.getChild(part);
                if (ns === null) // Keep existing
                    this.ptr.addChild(ns = new Reflect.Namespace(this, this.ptr, part));
                this.ptr = ns;
            }, this);
            return this;
        };

        /**
         * Creates the specified definitions at the current pointer position.
         * @param {!Array.<!Object>} defs Messages, enums or services to create
         * @returns {!ProtoBuf.Builder} this
         * @throws {Error} If a message definition is invalid
         * @expose
         */
        BuilderPrototype.create = function(defs) {
            if (!defs)
                return this; // Nothing to create
            if (!Array.isArray(defs))
                defs = [defs];
            else {
                if (defs.length === 0)
                    return this;
                defs = defs.slice();
            }

            // It's quite hard to keep track of scopes and memory here, so let's do this iteratively.
            var stack = [defs];
            while (stack.length > 0) {
                defs = stack.pop();

                if (!Array.isArray(defs)) // Stack always contains entire namespaces
                    throw Error("not a valid namespace: "+JSON.stringify(defs));

                while (defs.length > 0) {
                    var def = defs.shift(); // Namespaces always contain an array of messages, enums and services

                    if (Builder.isMessage(def)) {
                        var obj = new Reflect.Message(this, this.ptr, def["name"], def["options"], def["isGroup"], def["syntax"]);

                        // Create OneOfs
                        var oneofs = {};
                        if (def["oneofs"])
                            Object.keys(def["oneofs"]).forEach(function(name) {
                                obj.addChild(oneofs[name] = new Reflect.Message.OneOf(this, obj, name));
                            }, this);

                        // Create fields
                        if (def["fields"])
                            def["fields"].forEach(function(fld) {
                                if (obj.getChild(fld["id"]|0) !== null)
                                    throw Error("duplicate or invalid field id in "+obj.name+": "+fld['id']);
                                if (fld["options"] && typeof fld["options"] !== 'object')
                                    throw Error("illegal field options in "+obj.name+"#"+fld["name"]);
                                var oneof = null;
                                if (typeof fld["oneof"] === 'string' && !(oneof = oneofs[fld["oneof"]]))
                                    throw Error("illegal oneof in "+obj.name+"#"+fld["name"]+": "+fld["oneof"]);
                                fld = new Reflect.Message.Field(this, obj, fld["rule"], fld["keytype"], fld["type"], fld["name"], fld["id"], fld["options"], oneof, def["syntax"]);
                                if (oneof)
                                    oneof.fields.push(fld);
                                obj.addChild(fld);
                            }, this);

                        // Push children to stack
                        var subObj = [];
                        if (def["enums"])
                            def["enums"].forEach(function(enm) {
                                subObj.push(enm);
                            });
                        if (def["messages"])
                            def["messages"].forEach(function(msg) {
                                subObj.push(msg);
                            });
                        if (def["services"])
                            def["services"].forEach(function(svc) {
                                subObj.push(svc);
                            });

                        // Set extension ranges
                        if (def["extensions"]) {
                            if (typeof def["extensions"][0] === 'number') // pre 5.0.1
                                obj.extensions = [ def["extensions"] ];
                            else
                                obj.extensions = def["extensions"];
                        }

                        // Create on top of current namespace
                        this.ptr.addChild(obj);
                        if (subObj.length > 0) {
                            stack.push(defs); // Push the current level back
                            defs = subObj; // Continue processing sub level
                            subObj = null;
                            this.ptr = obj; // And move the pointer to this namespace
                            obj = null;
                            continue;
                        }
                        subObj = null;

                    } else if (Builder.isEnum(def)) {

                        obj = new Reflect.Enum(this, this.ptr, def["name"], def["options"], def["syntax"]);
                        def["values"].forEach(function(val) {
                            obj.addChild(new Reflect.Enum.Value(this, obj, val["name"], val["id"]));
                        }, this);
                        this.ptr.addChild(obj);

                    } else if (Builder.isService(def)) {

                        obj = new Reflect.Service(this, this.ptr, def["name"], def["options"]);
                        Object.keys(def["rpc"]).forEach(function(name) {
                            var mtd = def["rpc"][name];
                            obj.addChild(new Reflect.Service.RPCMethod(this, obj, name, mtd["request"], mtd["response"], !!mtd["request_stream"], !!mtd["response_stream"], mtd["options"]));
                        }, this);
                        this.ptr.addChild(obj);

                    } else if (Builder.isExtend(def)) {

                        obj = this.ptr.resolve(def["ref"], true);
                        if (obj) {
                            def["fields"].forEach(function(fld) {
                                if (obj.getChild(fld['id']|0) !== null)
                                    throw Error("duplicate extended field id in "+obj.name+": "+fld['id']);
                                // Check if field id is allowed to be extended
                                if (obj.extensions) {
                                    var valid = false;
                                    obj.extensions.forEach(function(range) {
                                        if (fld["id"] >= range[0] && fld["id"] <= range[1])
                                            valid = true;
                                    });
                                    if (!valid)
                                        throw Error("illegal extended field id in "+obj.name+": "+fld['id']+" (not within valid ranges)");
                                }
                                // Convert extension field names to camel case notation if the override is set
                                var name = fld["name"];
                                if (this.options['convertFieldsToCamelCase'])
                                    name = ProtoBuf.Util.toCamelCase(name);
                                // see #161: Extensions use their fully qualified name as their runtime key and...
                                var field = new Reflect.Message.ExtensionField(this, obj, fld["rule"], fld["type"], this.ptr.fqn()+'.'+name, fld["id"], fld["options"]);
                                // ...are added on top of the current namespace as an extension which is used for
                                // resolving their type later on (the extension always keeps the original name to
                                // prevent naming collisions)
                                var ext = new Reflect.Extension(this, this.ptr, fld["name"], field);
                                field.extension = ext;
                                this.ptr.addChild(ext);
                                obj.addChild(field);
                            }, this);

                        } else if (!/\.?google\.protobuf\./.test(def["ref"])) // Silently skip internal extensions
                            throw Error("extended message "+def["ref"]+" is not defined");

                    } else
                        throw Error("not a valid definition: "+JSON.stringify(def));

                    def = null;
                    obj = null;
                }
                // Break goes here
                defs = null;
                this.ptr = this.ptr.parent; // Namespace done, continue at parent
            }
            this.resolved = false; // Require re-resolve
            this.result = null; // Require re-build
            return this;
        };

        /**
         * Propagates syntax to all children.
         * @param {!Object} parent
         * @inner
         */
        function propagateSyntax(parent) {
            if (parent['messages']) {
                parent['messages'].forEach(function(child) {
                    child["syntax"] = parent["syntax"];
                    propagateSyntax(child);
                });
            }
            if (parent['enums']) {
                parent['enums'].forEach(function(child) {
                    child["syntax"] = parent["syntax"];
                });
            }
        }

        /**
         * Imports another definition into this builder.
         * @param {Object.<string,*>} json Parsed import
         * @param {(string|{root: string, file: string})=} filename Imported file name
         * @returns {!ProtoBuf.Builder} this
         * @throws {Error} If the definition or file cannot be imported
         * @expose
         */
        BuilderPrototype["import"] = function(json, filename) {
            var delim = '/';

            // Make sure to skip duplicate imports

            if (typeof filename === 'string') {

                if (ProtoBuf.Util.IS_NODE)
                    filename = require("path")['resolve'](filename);
                if (this.files[filename] === true)
                    return this.reset();
                this.files[filename] = true;

            } else if (typeof filename === 'object') { // Object with root, file.

                var root = filename.root;
                if (ProtoBuf.Util.IS_NODE)
                    root = require("path")['resolve'](root);
                if (root.indexOf("\\") >= 0 || filename.file.indexOf("\\") >= 0)
                    delim = '\\';
                var fname = root + delim + filename.file;
                if (this.files[fname] === true)
                    return this.reset();
                this.files[fname] = true;
            }

            // Import imports

            if (json['imports'] && json['imports'].length > 0) {
                var importRoot,
                    resetRoot = false;

                if (typeof filename === 'object') { // If an import root is specified, override

                    this.importRoot = filename["root"]; resetRoot = true; // ... and reset afterwards
                    importRoot = this.importRoot;
                    filename = filename["file"];
                    if (importRoot.indexOf("\\") >= 0 || filename.indexOf("\\") >= 0)
                        delim = '\\';

                } else if (typeof filename === 'string') {

                    if (this.importRoot) // If import root is overridden, use it
                        importRoot = this.importRoot;
                    else { // Otherwise compute from filename
                        if (filename.indexOf("/") >= 0) { // Unix
                            importRoot = filename.replace(/\/[^\/]*$/, "");
                            if (/* /file.proto */ importRoot === "")
                                importRoot = "/";
                        } else if (filename.indexOf("\\") >= 0) { // Windows
                            importRoot = filename.replace(/\\[^\\]*$/, "");
                            delim = '\\';
                        } else
                            importRoot = ".";
                    }

                } else
                    importRoot = null;

                for (var i=0; i<json['imports'].length; i++) {
                    if (typeof json['imports'][i] === 'string') { // Import file
                        if (!importRoot)
                            throw Error("cannot determine import root");
                        var importFilename = json['imports'][i];
                        if (importFilename === "google/protobuf/descriptor.proto")
                            continue; // Not needed and therefore not used
                        importFilename = importRoot + delim + importFilename;
                        if (this.files[importFilename] === true)
                            continue; // Already imported
                        if (/\.proto$/i.test(importFilename) && !ProtoBuf.DotProto)       // If this is a light build
                            importFilename = importFilename.replace(/\.proto$/, ".json"); // always load the JSON file
                        var contents = ProtoBuf.Util.fetch(importFilename);
                        if (contents === null)
                            throw Error("failed to import '"+importFilename+"' in '"+filename+"': file not found");
                        if (/\.json$/i.test(importFilename)) // Always possible
                            this["import"](JSON.parse(contents+""), importFilename); // May throw
                        else
                            this["import"](ProtoBuf.DotProto.Parser.parse(contents), importFilename); // May throw
                    } else // Import structure
                        if (!filename)
                            this["import"](json['imports'][i]);
                        else if (/\.(\w+)$/.test(filename)) // With extension: Append _importN to the name portion to make it unique
                            this["import"](json['imports'][i], filename.replace(/^(.+)\.(\w+)$/, function($0, $1, $2) { return $1+"_import"+i+"."+$2; }));
                        else // Without extension: Append _importN to make it unique
                            this["import"](json['imports'][i], filename+"_import"+i);
                }
                if (resetRoot) // Reset import root override when all imports are done
                    this.importRoot = null;
            }

            // Import structures

            if (json['package'])
                this.define(json['package']);
            if (json['syntax'])
                propagateSyntax(json);
            var base = this.ptr;
            if (json['options'])
                Object.keys(json['options']).forEach(function(key) {
                    base.options[key] = json['options'][key];
                });
            if (json['messages'])
                this.create(json['messages']),
                this.ptr = base;
            if (json['enums'])
                this.create(json['enums']),
                this.ptr = base;
            if (json['services'])
                this.create(json['services']),
                this.ptr = base;
            if (json['extends'])
                this.create(json['extends']);

            return this.reset();
        };

        /**
         * Resolves all namespace objects.
         * @throws {Error} If a type cannot be resolved
         * @returns {!ProtoBuf.Builder} this
         * @expose
         */
        BuilderPrototype.resolveAll = function() {
            // Resolve all reflected objects
            var res;
            if (this.ptr == null || typeof this.ptr.type === 'object')
                return this; // Done (already resolved)

            if (this.ptr instanceof Reflect.Namespace) { // Resolve children

                this.ptr.children.forEach(function(child) {
                    this.ptr = child;
                    this.resolveAll();
                }, this);

            } else if (this.ptr instanceof Reflect.Message.Field) { // Resolve type

                if (!Lang.TYPE.test(this.ptr.type)) {
                    if (!Lang.TYPEREF.test(this.ptr.type))
                        throw Error("illegal type reference in "+this.ptr.toString(true)+": "+this.ptr.type);
                    res = (this.ptr instanceof Reflect.Message.ExtensionField ? this.ptr.extension.parent : this.ptr.parent).resolve(this.ptr.type, true);
                    if (!res)
                        throw Error("unresolvable type reference in "+this.ptr.toString(true)+": "+this.ptr.type);
                    this.ptr.resolvedType = res;
                    if (res instanceof Reflect.Enum) {
                        this.ptr.type = ProtoBuf.TYPES["enum"];
                        if (this.ptr.syntax === 'proto3' && res.syntax !== 'proto3')
                            throw Error("proto3 message cannot reference proto2 enum");
                    }
                    else if (res instanceof Reflect.Message)
                        this.ptr.type = res.isGroup ? ProtoBuf.TYPES["group"] : ProtoBuf.TYPES["message"];
                    else
                        throw Error("illegal type reference in "+this.ptr.toString(true)+": "+this.ptr.type);
                } else
                    this.ptr.type = ProtoBuf.TYPES[this.ptr.type];

                // If it's a map field, also resolve the key type. The key type can be only a numeric, string, or bool type
                // (i.e., no enums or messages), so we don't need to resolve against the current namespace.
                if (this.ptr.map) {
                    if (!Lang.TYPE.test(this.ptr.keyType))
                        throw Error("illegal key type for map field in "+this.ptr.toString(true)+": "+this.ptr.keyType);
                    this.ptr.keyType = ProtoBuf.TYPES[this.ptr.keyType];
                }

            } else if (this.ptr instanceof ProtoBuf.Reflect.Service.Method) {

                if (this.ptr instanceof ProtoBuf.Reflect.Service.RPCMethod) {
                    res = this.ptr.parent.resolve(this.ptr.requestName, true);
                    if (!res || !(res instanceof ProtoBuf.Reflect.Message))
                        throw Error("Illegal type reference in "+this.ptr.toString(true)+": "+this.ptr.requestName);
                    this.ptr.resolvedRequestType = res;
                    res = this.ptr.parent.resolve(this.ptr.responseName, true);
                    if (!res || !(res instanceof ProtoBuf.Reflect.Message))
                        throw Error("Illegal type reference in "+this.ptr.toString(true)+": "+this.ptr.responseName);
                    this.ptr.resolvedResponseType = res;
                } else // Should not happen as nothing else is implemented
                    throw Error("illegal service type in "+this.ptr.toString(true));

            } else if (
                !(this.ptr instanceof ProtoBuf.Reflect.Message.OneOf) && // Not built
                !(this.ptr instanceof ProtoBuf.Reflect.Extension) && // Not built
                !(this.ptr instanceof ProtoBuf.Reflect.Enum.Value) // Built in enum
            )
                throw Error("illegal object in namespace: "+typeof(this.ptr)+": "+this.ptr);

            return this.reset();
        };

        /**
         * Builds the protocol. This will first try to resolve all definitions and, if this has been successful,
         * return the built package.
         * @param {(string|Array.<string>)=} path Specifies what to return. If omitted, the entire namespace will be returned.
         * @returns {!ProtoBuf.Builder.Message|!Object.<string,*>}
         * @throws {Error} If a type could not be resolved
         * @expose
         */
        BuilderPrototype.build = function(path) {
            this.reset();
            if (!this.resolved)
                this.resolveAll(),
                this.resolved = true,
                this.result = null; // Require re-build
            if (this.result === null) // (Re-)Build
                this.result = this.ns.build();
            if (!path)
                return this.result;
            var part = typeof path === 'string' ? path.split(".") : path,
                ptr = this.result; // Build namespace pointer (no hasChild etc.)
            for (var i=0; i<part.length; i++)
                if (ptr[part[i]])
                    ptr = ptr[part[i]];
                else {
                    ptr = null;
                    break;
                }
            return ptr;
        };

        /**
         * Similar to {@link ProtoBuf.Builder#build}, but looks up the internal reflection descriptor.
         * @param {string=} path Specifies what to return. If omitted, the entire namespace wiil be returned.
         * @param {boolean=} excludeNonNamespace Excludes non-namespace types like fields, defaults to `false`
         * @returns {?ProtoBuf.Reflect.T} Reflection descriptor or `null` if not found
         */
        BuilderPrototype.lookup = function(path, excludeNonNamespace) {
            return path ? this.ns.resolve(path, excludeNonNamespace) : this.ns;
        };

        /**
         * Returns a string representation of this object.
         * @return {string} String representation as of "Builder"
         * @expose
         */
        BuilderPrototype.toString = function() {
            return "Builder";
        };

        // ----- Base classes -----
        // Exist for the sole purpose of being able to "... instanceof ProtoBuf.Builder.Message" etc.

        /**
         * @alias ProtoBuf.Builder.Message
         */
        Builder.Message = function() {};

        /**
         * @alias ProtoBuf.Builder.Enum
         */
        Builder.Enum = function() {};

        /**
         * @alias ProtoBuf.Builder.Message
         */
        Builder.Service = function() {};

        return Builder;

    })(ProtoBuf, ProtoBuf.Lang, ProtoBuf.Reflect);

    /**
     * @alias ProtoBuf.Map
     * @expose
     */
    ProtoBuf.Map = (function(ProtoBuf, Reflect) {
        "use strict";

        /**
         * Constructs a new Map. A Map is a container that is used to implement map
         * fields on message objects. It closely follows the ES6 Map API; however,
         * it is distinct because we do not want to depend on external polyfills or
         * on ES6 itself.
         *
         * @exports ProtoBuf.Map
         * @param {!ProtoBuf.Reflect.Field} field Map field
         * @param {Object.<string,*>=} contents Initial contents
         * @constructor
         */
        var Map = function(field, contents) {
            if (!field.map)
                throw Error("field is not a map");

            /**
             * The field corresponding to this map.
             * @type {!ProtoBuf.Reflect.Field}
             */
            this.field = field;

            /**
             * Element instance corresponding to key type.
             * @type {!ProtoBuf.Reflect.Element}
             */
            this.keyElem = new Reflect.Element(field.keyType, null, true, field.syntax);

            /**
             * Element instance corresponding to value type.
             * @type {!ProtoBuf.Reflect.Element}
             */
            this.valueElem = new Reflect.Element(field.type, field.resolvedType, false, field.syntax);

            /**
             * Internal map: stores mapping of (string form of key) -> (key, value)
             * pair.
             *
             * We provide map semantics for arbitrary key types, but we build on top
             * of an Object, which has only string keys. In order to avoid the need
             * to convert a string key back to its native type in many situations,
             * we store the native key value alongside the value. Thus, we only need
             * a one-way mapping from a key type to its string form that guarantees
             * uniqueness and equality (i.e., str(K1) === str(K2) if and only if K1
             * === K2).
             *
             * @type {!Object<string, {key: *, value: *}>}
             */
            this.map = {};

            /**
             * Returns the number of elements in the map.
             */
            Object.defineProperty(this, "size", {
                get: function() { return Object.keys(this.map).length; }
            });

            // Fill initial contents from a raw object.
            if (contents) {
                var keys = Object.keys(contents);
                for (var i = 0; i < keys.length; i++) {
                    var key = this.keyElem.valueFromString(keys[i]);
                    var val = this.valueElem.verifyValue(contents[keys[i]]);
                    this.map[this.keyElem.valueToString(key)] =
                        { key: key, value: val };
                }
            }
        };

        var MapPrototype = Map.prototype;

        /**
         * Helper: return an iterator over an array.
         * @param {!Array<*>} arr the array
         * @returns {!Object} an iterator
         * @inner
         */
        function arrayIterator(arr) {
            var idx = 0;
            return {
                next: function() {
                    if (idx < arr.length)
                        return { done: false, value: arr[idx++] };
                    return { done: true };
                }
            }
        }

        /**
         * Clears the map.
         */
        MapPrototype.clear = function() {
            this.map = {};
        };

        /**
         * Deletes a particular key from the map.
         * @returns {boolean} Whether any entry with this key was deleted.
         */
        MapPrototype["delete"] = function(key) {
            var keyValue = this.keyElem.valueToString(this.keyElem.verifyValue(key));
            var hadKey = keyValue in this.map;
            delete this.map[keyValue];
            return hadKey;
        };

        /**
         * Returns an iterator over [key, value] pairs in the map.
         * @returns {Object} The iterator
         */
        MapPrototype.entries = function() {
            var entries = [];
            var strKeys = Object.keys(this.map);
            for (var i = 0, entry; i < strKeys.length; i++)
                entries.push([(entry=this.map[strKeys[i]]).key, entry.value]);
            return arrayIterator(entries);
        };

        /**
         * Returns an iterator over keys in the map.
         * @returns {Object} The iterator
         */
        MapPrototype.keys = function() {
            var keys = [];
            var strKeys = Object.keys(this.map);
            for (var i = 0; i < strKeys.length; i++)
                keys.push(this.map[strKeys[i]].key);
            return arrayIterator(keys);
        };

        /**
         * Returns an iterator over values in the map.
         * @returns {!Object} The iterator
         */
        MapPrototype.values = function() {
            var values = [];
            var strKeys = Object.keys(this.map);
            for (var i = 0; i < strKeys.length; i++)
                values.push(this.map[strKeys[i]].value);
            return arrayIterator(values);
        };

        /**
         * Iterates over entries in the map, calling a function on each.
         * @param {function(this:*, *, *, *)} cb The callback to invoke with value, key, and map arguments.
         * @param {Object=} thisArg The `this` value for the callback
         */
        MapPrototype.forEach = function(cb, thisArg) {
            var strKeys = Object.keys(this.map);
            for (var i = 0, entry; i < strKeys.length; i++)
                cb.call(thisArg, (entry=this.map[strKeys[i]]).value, entry.key, this);
        };

        /**
         * Sets a key in the map to the given value.
         * @param {*} key The key
         * @param {*} value The value
         * @returns {!ProtoBuf.Map} The map instance
         */
        MapPrototype.set = function(key, value) {
            var keyValue = this.keyElem.verifyValue(key);
            var valValue = this.valueElem.verifyValue(value);
            this.map[this.keyElem.valueToString(keyValue)] =
                { key: keyValue, value: valValue };
            return this;
        };

        /**
         * Gets the value corresponding to a key in the map.
         * @param {*} key The key
         * @returns {*|undefined} The value, or `undefined` if key not present
         */
        MapPrototype.get = function(key) {
            var keyValue = this.keyElem.valueToString(this.keyElem.verifyValue(key));
            if (!(keyValue in this.map))
                return undefined;
            return this.map[keyValue].value;
        };

        /**
         * Determines whether the given key is present in the map.
         * @param {*} key The key
         * @returns {boolean} `true` if the key is present
         */
        MapPrototype.has = function(key) {
            var keyValue = this.keyElem.valueToString(this.keyElem.verifyValue(key));
            return (keyValue in this.map);
        };

        return Map;
    })(ProtoBuf, ProtoBuf.Reflect);


    /**
     * Loads a .proto string and returns the Builder.
     * @param {string} proto .proto file contents
     * @param {(ProtoBuf.Builder|string|{root: string, file: string})=} builder Builder to append to. Will create a new one if omitted.
     * @param {(string|{root: string, file: string})=} filename The corresponding file name if known. Must be specified for imports.
     * @return {ProtoBuf.Builder} Builder to create new messages
     * @throws {Error} If the definition cannot be parsed or built
     * @expose
     */
    ProtoBuf.loadProto = function(proto, builder, filename) {
        if (typeof builder === 'string' || (builder && typeof builder["file"] === 'string' && typeof builder["root"] === 'string'))
            filename = builder,
            builder = undefined;
        return ProtoBuf.loadJson(ProtoBuf.DotProto.Parser.parse(proto), builder, filename);
    };

    /**
     * Loads a .proto string and returns the Builder. This is an alias of {@link ProtoBuf.loadProto}.
     * @function
     * @param {string} proto .proto file contents
     * @param {(ProtoBuf.Builder|string)=} builder Builder to append to. Will create a new one if omitted.
     * @param {(string|{root: string, file: string})=} filename The corresponding file name if known. Must be specified for imports.
     * @return {ProtoBuf.Builder} Builder to create new messages
     * @throws {Error} If the definition cannot be parsed or built
     * @expose
     */
    ProtoBuf.protoFromString = ProtoBuf.loadProto; // Legacy

    /**
     * Loads a .proto file and returns the Builder.
     * @param {string|{root: string, file: string}} filename Path to proto file or an object specifying 'file' with
     *  an overridden 'root' path for all imported files.
     * @param {function(?Error, !ProtoBuf.Builder=)=} callback Callback that will receive `null` as the first and
     *  the Builder as its second argument on success, otherwise the error as its first argument. If omitted, the
     *  file will be read synchronously and this function will return the Builder.
     * @param {ProtoBuf.Builder=} builder Builder to append to. Will create a new one if omitted.
     * @return {?ProtoBuf.Builder|undefined} The Builder if synchronous (no callback specified, will be NULL if the
     *   request has failed), else undefined
     * @expose
     */
    ProtoBuf.loadProtoFile = function(filename, callback, builder) {
        if (callback && typeof callback === 'object')
            builder = callback,
            callback = null;
        else if (!callback || typeof callback !== 'function')
            callback = null;
        if (callback)
            return ProtoBuf.Util.fetch(typeof filename === 'string' ? filename : filename["root"]+"/"+filename["file"], function(contents) {
                if (contents === null) {
                    callback(Error("Failed to fetch file"));
                    return;
                }
                try {
                    callback(null, ProtoBuf.loadProto(contents, builder, filename));
                } catch (e) {
                    callback(e);
                }
            });
        var contents = ProtoBuf.Util.fetch(typeof filename === 'object' ? filename["root"]+"/"+filename["file"] : filename);
        return contents === null ? null : ProtoBuf.loadProto(contents, builder, filename);
    };

    /**
     * Loads a .proto file and returns the Builder. This is an alias of {@link ProtoBuf.loadProtoFile}.
     * @function
     * @param {string|{root: string, file: string}} filename Path to proto file or an object specifying 'file' with
     *  an overridden 'root' path for all imported files.
     * @param {function(?Error, !ProtoBuf.Builder=)=} callback Callback that will receive `null` as the first and
     *  the Builder as its second argument on success, otherwise the error as its first argument. If omitted, the
     *  file will be read synchronously and this function will return the Builder.
     * @param {ProtoBuf.Builder=} builder Builder to append to. Will create a new one if omitted.
     * @return {!ProtoBuf.Builder|undefined} The Builder if synchronous (no callback specified, will be NULL if the
     *   request has failed), else undefined
     * @expose
     */
    ProtoBuf.protoFromFile = ProtoBuf.loadProtoFile; // Legacy


    /**
     * Constructs a new empty Builder.
     * @param {Object.<string,*>=} options Builder options, defaults to global options set on ProtoBuf
     * @return {!ProtoBuf.Builder} Builder
     * @expose
     */
    ProtoBuf.newBuilder = function(options) {
        options = options || {};
        if (typeof options['convertFieldsToCamelCase'] === 'undefined')
            options['convertFieldsToCamelCase'] = ProtoBuf.convertFieldsToCamelCase;
        if (typeof options['populateAccessors'] === 'undefined')
            options['populateAccessors'] = ProtoBuf.populateAccessors;
        return new ProtoBuf.Builder(options);
    };

    /**
     * Loads a .json definition and returns the Builder.
     * @param {!*|string} json JSON definition
     * @param {(ProtoBuf.Builder|string|{root: string, file: string})=} builder Builder to append to. Will create a new one if omitted.
     * @param {(string|{root: string, file: string})=} filename The corresponding file name if known. Must be specified for imports.
     * @return {ProtoBuf.Builder} Builder to create new messages
     * @throws {Error} If the definition cannot be parsed or built
     * @expose
     */
    ProtoBuf.loadJson = function(json, builder, filename) {
        if (typeof builder === 'string' || (builder && typeof builder["file"] === 'string' && typeof builder["root"] === 'string'))
            filename = builder,
            builder = null;
        if (!builder || typeof builder !== 'object')
            builder = ProtoBuf.newBuilder();
        if (typeof json === 'string')
            json = JSON.parse(json);
        builder["import"](json, filename);
        builder.resolveAll();
        return builder;
    };

    /**
     * Loads a .json file and returns the Builder.
     * @param {string|!{root: string, file: string}} filename Path to json file or an object specifying 'file' with
     *  an overridden 'root' path for all imported files.
     * @param {function(?Error, !ProtoBuf.Builder=)=} callback Callback that will receive `null` as the first and
     *  the Builder as its second argument on success, otherwise the error as its first argument. If omitted, the
     *  file will be read synchronously and this function will return the Builder.
     * @param {ProtoBuf.Builder=} builder Builder to append to. Will create a new one if omitted.
     * @return {?ProtoBuf.Builder|undefined} The Builder if synchronous (no callback specified, will be NULL if the
     *   request has failed), else undefined
     * @expose
     */
    ProtoBuf.loadJsonFile = function(filename, callback, builder) {
        if (callback && typeof callback === 'object')
            builder = callback,
            callback = null;
        else if (!callback || typeof callback !== 'function')
            callback = null;
        if (callback)
            return ProtoBuf.Util.fetch(typeof filename === 'string' ? filename : filename["root"]+"/"+filename["file"], function(contents) {
                if (contents === null) {
                    callback(Error("Failed to fetch file"));
                    return;
                }
                try {
                    callback(null, ProtoBuf.loadJson(JSON.parse(contents), builder, filename));
                } catch (e) {
                    callback(e);
                }
            });
        var contents = ProtoBuf.Util.fetch(typeof filename === 'object' ? filename["root"]+"/"+filename["file"] : filename);
        return contents === null ? null : ProtoBuf.loadJson(JSON.parse(contents), builder, filename);
    };

    return ProtoBuf;
});

(function() {
    'use strict';

    function validatePrivKey(privKey) {
        if (privKey === undefined || !(privKey instanceof ArrayBuffer) || privKey.byteLength != 32) {
            throw new Error("Invalid private key");
        }
    }
    function validatePubKeyFormat(pubKey) {
        if (pubKey === undefined || ((pubKey.byteLength != 33 || new Uint8Array(pubKey)[0] != 5) && pubKey.byteLength != 32)) {
            throw new Error("Invalid public key");
        }
        if (pubKey.byteLength == 33) {
            return pubKey.slice(1);
        } else {
            console.error("WARNING: Expected pubkey of length 33, please report the ST and client that generated the pubkey");
            return pubKey;
        }
    }

    function processKeys(raw_keys) {
        // prepend version byte
        var origPub = new Uint8Array(raw_keys.pubKey);
        var pub = new Uint8Array(33);
        pub.set(origPub, 1);
        pub[0] = 5;

        return { pubKey: pub.buffer, privKey: raw_keys.privKey };
    }

    function wrapCurve25519(curve25519) {
        return {
            // Curve 25519 crypto
            createKeyPair: function(privKey) {
                validatePrivKey(privKey);
                var raw_keys = curve25519.keyPair(privKey);
                if (raw_keys instanceof Promise) {
                    return raw_keys.then(processKeys);
                } else {
                    return processKeys(raw_keys);
                }
            },
            ECDHE: function(pubKey, privKey) {
                pubKey = validatePubKeyFormat(pubKey);
                validatePrivKey(privKey);

                if (pubKey === undefined || pubKey.byteLength != 32) {
                    throw new Error("Invalid public key");
                }

                return curve25519.sharedSecret(pubKey, privKey);
            },
            Ed25519Sign: function(privKey, message) {
                validatePrivKey(privKey);

                if (message === undefined) {
                    throw new Error("Invalid message");
                }

                return curve25519.sign(privKey, message);
            },
            Ed25519Verify: function(pubKey, msg, sig) {
                pubKey = validatePubKeyFormat(pubKey);

                if (pubKey === undefined || pubKey.byteLength != 32) {
                    throw new Error("Invalid public key");
                }

                if (msg === undefined) {
                    throw new Error("Invalid message");
                }

                if (sig === undefined || sig.byteLength != 64) {
                    throw new Error("Invalid signature");
                }

                return curve25519.verify(pubKey, msg, sig);
            }
        };
    }

    Internal.Curve       = wrapCurve25519(Internal.curve25519);
    Internal.Curve.async = wrapCurve25519(Internal.curve25519_async);

    function wrapCurve(curve) {
        return {
            generateKeyPair: function() {
                var privKey = Internal.crypto.getRandomBytes(32);
                return curve.createKeyPair(privKey);
            },
            createKeyPair: function(privKey) {
                return curve.createKeyPair(privKey);
            },
            calculateAgreement: function(pubKey, privKey) {
                return curve.ECDHE(pubKey, privKey);
            },
            verifySignature: function(pubKey, msg, sig) {
                return curve.Ed25519Verify(pubKey, msg, sig);
            },
            calculateSignature: function(privKey, message) {
                return curve.Ed25519Sign(privKey, message);
            }
        };
    }

    libsignal.Curve       = wrapCurve(Internal.Curve);
    libsignal.Curve.async = wrapCurve(Internal.Curve.async);

})();

/*
 * vim: ts=4:sw=4
 */

var Internal = Internal || {};

(function() {
    'use strict';

    var crypto = self.crypto;

    if (!crypto || !crypto.subtle || typeof crypto.getRandomValues !== 'function') {
        throw new Error('WebCrypto not found');
    }

    Internal.crypto = {
        getRandomBytes: function(size) {
            var array = new Uint8Array(size);
            crypto.getRandomValues(array);
            return array.buffer;
        },
        encrypt: function(key, data, iv) {
            return crypto.subtle.importKey('raw', key, {name: 'AES-CBC'}, false, ['encrypt']).then(function(key) {
                return crypto.subtle.encrypt({name: 'AES-CBC', iv: new Uint8Array(iv)}, key, data);
            });
        },
        decrypt: function(key, data, iv) {
            return crypto.subtle.importKey('raw', key, {name: 'AES-CBC'}, false, ['decrypt']).then(function(key) {
                return crypto.subtle.decrypt({name: 'AES-CBC', iv: new Uint8Array(iv)}, key, data);
            });
        },
        sign: function(key, data) {
            return crypto.subtle.importKey('raw', key, {name: 'HMAC', hash: {name: 'SHA-256'}}, false, ['sign']).then(function(key) {
                return crypto.subtle.sign( {name: 'HMAC', hash: 'SHA-256'}, key, data);
            });
        },

        hash: function(data) {
            return crypto.subtle.digest({name: 'SHA-512'}, data);
        },

        HKDF: function(input, salt, info) {
            // Specific implementation of RFC 5869 that only returns the first 3 32-byte chunks
            // TODO: We dont always need the third chunk, we might skip it
            return Internal.crypto.sign(salt, input).then(function(PRK) {
                var infoBuffer = new ArrayBuffer(info.byteLength + 1 + 32);
                var infoArray = new Uint8Array(infoBuffer);
                infoArray.set(new Uint8Array(info), 32);
                infoArray[infoArray.length - 1] = 1;
                return Internal.crypto.sign(PRK, infoBuffer.slice(32)).then(function(T1) {
                    infoArray.set(new Uint8Array(T1));
                    infoArray[infoArray.length - 1] = 2;
                    return Internal.crypto.sign(PRK, infoBuffer).then(function(T2) {
                        infoArray.set(new Uint8Array(T2));
                        infoArray[infoArray.length - 1] = 3;
                        return Internal.crypto.sign(PRK, infoBuffer).then(function(T3) {
                            return [ T1, T2, T3 ];
                        });
                    });
                });
            });
        },

        // Curve 25519 crypto
        createKeyPair: function(privKey) {
            if (privKey === undefined) {
                privKey = Internal.crypto.getRandomBytes(32);
            }
            return Internal.Curve.async.createKeyPair(privKey);
        },
        ECDHE: function(pubKey, privKey) {
            return Internal.Curve.async.ECDHE(pubKey, privKey);
        },
        Ed25519Sign: function(privKey, message) {
            return Internal.Curve.async.Ed25519Sign(privKey, message);
        },
        Ed25519Verify: function(pubKey, msg, sig) {
            return Internal.Curve.async.Ed25519Verify(pubKey, msg, sig);
        }
    };


    // HKDF for TextSecure has a bit of additional handling - salts always end up being 32 bytes
    Internal.HKDF = function(input, salt, info) {
        if (salt.byteLength != 32) {
            throw new Error("Got salt of incorrect length");
        }

        return Internal.crypto.HKDF(input, salt,  util.toArrayBuffer(info));
    };

    Internal.verifyMAC = function(data, key, mac, length) {
        return Internal.crypto.sign(key, data).then(function(calculated_mac) {
            if (mac.byteLength != length  || calculated_mac.byteLength < length) {
                throw new Error("Bad MAC length");
            }
            var a = new Uint8Array(calculated_mac);
            var b = new Uint8Array(mac);
            var result = 0;
            for (var i=0; i < mac.byteLength; ++i) {
                result = result | (a[i] ^ b[i]);
            }
            if (result !== 0) {
                console.log('Our MAC  ', dcodeIO.ByteBuffer.wrap(calculated_mac).toHex());
                console.log('Their MAC', dcodeIO.ByteBuffer.wrap(mac).toHex());
                throw new Error("Bad MAC");
            }
        });
    };

    libsignal.HKDF = {
        deriveSecrets: function(input, salt, info) {
            return Internal.HKDF(input, salt, info);
        }
    };

    libsignal.crypto = {
        encrypt: function(key, data, iv) {
            return Internal.crypto.encrypt(key, data, iv);
        },
        decrypt: function(key, data, iv) {
            return Internal.crypto.decrypt(key, data, iv);
        },
        calculateMAC: function(key, data) {
            return Internal.crypto.sign(key, data);
        },
        verifyMAC: function(data, key, mac, length) {
            return Internal.verifyMAC(data, key, mac, length);
        },
        getRandomBytes: function(size) {
            return Internal.crypto.getRandomBytes(size);
        }
    };

})();

/*
 * vim: ts=4:sw=4
 */

var util = (function() {
    'use strict';

    var StaticArrayBufferProto = new ArrayBuffer().__proto__;

    return {
        toString: function(thing) {
            if (typeof thing == 'string') {
                return thing;
            }
            return new dcodeIO.ByteBuffer.wrap(thing).toString('binary');
        },
        toArrayBuffer: function(thing) {
            if (thing === undefined) {
                return undefined;
            }
            if (thing === Object(thing)) {
                if (thing.__proto__ == StaticArrayBufferProto) {
                    return thing;
                }
            }

            var str;
            if (typeof thing == "string") {
                str = thing;
            } else {
                throw new Error("Tried to convert a non-string of type " + typeof thing + " to an array buffer");
            }
            return new dcodeIO.ByteBuffer.wrap(thing, 'binary').toArrayBuffer();
        },
        isEqual: function(a, b) {
            // TODO: Special-case arraybuffers, etc
            if (a === undefined || b === undefined) {
                return false;
            }
            a = util.toString(a);
            b = util.toString(b);
            var maxLength = Math.max(a.length, b.length);
            if (maxLength < 5) {
                throw new Error("a/b compare too short");
            }
            return a.substring(0, Math.min(maxLength, a.length)) == b.substring(0, Math.min(maxLength, b.length));
        }
    };
})();

function isNonNegativeInteger(n) {
    return (typeof n === 'number' && (n % 1) === 0  && n >= 0);
}

var KeyHelper = {
    generateIdentityKeyPair: function() {
        return Internal.crypto.createKeyPair();
    },

    generateRegistrationId: function() {
        var registrationId = new Uint16Array(Internal.crypto.getRandomBytes(2))[0];
        return registrationId & 0x3fff;
    },

    generateSignedPreKey: function (identityKeyPair, signedKeyId) {
        if (!(identityKeyPair.privKey instanceof ArrayBuffer) ||
            identityKeyPair.privKey.byteLength != 32 ||
            !(identityKeyPair.pubKey instanceof ArrayBuffer) ||
            identityKeyPair.pubKey.byteLength != 33) {
            throw new TypeError('Invalid argument for identityKeyPair');
        }
        if (!isNonNegativeInteger(signedKeyId)) {
            throw new TypeError(
                'Invalid argument for signedKeyId: ' + signedKeyId
            );
        }

        return Internal.crypto.createKeyPair().then(function(keyPair) {
            return Internal.crypto.Ed25519Sign(identityKeyPair.privKey, keyPair.pubKey).then(function(sig) {
                return {
                    keyId      : signedKeyId,
                    keyPair    : keyPair,
                    signature  : sig
                };
            });
        });
    },

    generatePreKey: function(keyId) {
        if (!isNonNegativeInteger(keyId)) {
            throw new TypeError('Invalid argument for keyId: ' + keyId);
        }

        return Internal.crypto.createKeyPair().then(function(keyPair) {
            return { keyId: keyId, keyPair: keyPair };
        });
    }
};

libsignal.KeyHelper = KeyHelper;

var Internal = Internal || {};

Internal.protoText = function() {
	var protoText = {};

	protoText['protos/WhisperTextProtocol.proto'] = 
		'package textsecure;\n' +
		'option java_package = "org.whispersystems.libsignal.protocol";\n' +
		'option java_outer_classname = "WhisperProtos";\n' +
		'message WhisperMessage {\n' +
		'  optional bytes  ephemeralKey    = 1;\n' +
		'  optional uint32 counter         = 2;\n' +
		'  optional uint32 previousCounter = 3;\n' +
		'  optional bytes  ciphertext      = 4; // PushMessageContent\n' +
		'}\n' +
		'message PreKeyWhisperMessage {\n' +
		'  optional uint32 registrationId = 5;\n' +
		'  optional uint32 preKeyId       = 1;\n' +
		'  optional uint32 signedPreKeyId = 6;\n' +
		'  optional bytes  baseKey        = 2;\n' +
		'  optional bytes  identityKey    = 3;\n' +
		'  optional bytes  message        = 4; // WhisperMessage\n' +
		'}\n' +
		'message KeyExchangeMessage {\n' +
		'  optional uint32 id               = 1;\n' +
		'  optional bytes  baseKey          = 2;\n' +
		'  optional bytes  ephemeralKey     = 3;\n' +
		'  optional bytes  identityKey      = 4;\n' +
		'  optional bytes  baseKeySignature = 5;\n' +
		'}\n' +
''	;

	return protoText;
}();
/* vim: ts=4:sw=4 */
var Internal = Internal || {};

Internal.protobuf = function() {
    'use strict';

    function loadProtoBufs(filename) {
        return dcodeIO.ProtoBuf.loadProto(Internal.protoText['protos/' + filename]).build('textsecure');
    }

    var protocolMessages = loadProtoBufs('WhisperTextProtocol.proto');

    return {
        WhisperMessage            : protocolMessages.WhisperMessage,
        PreKeyWhisperMessage      : protocolMessages.PreKeyWhisperMessage
    };
}();

/*
 * vim: ts=4:sw=4
 */

var Internal = Internal || {};

Internal.BaseKeyType = {
  OURS: 1,
  THEIRS: 2
};
Internal.ChainType = {
  SENDING: 1,
  RECEIVING: 2
};

var ARCHIVED_STATES_MAX_LENGTH = 40;

Internal.SessionRecord = function() {
    'use strict';
    var MESSAGE_LOST_THRESHOLD_MS = 1000*60*60*24*7;

    var StaticByteBufferProto = new dcodeIO.ByteBuffer().__proto__;
    var StaticArrayBufferProto = new ArrayBuffer().__proto__;
    var StaticUint8ArrayProto = new Uint8Array().__proto__;

    function isStringable(thing) {
        return (thing === Object(thing) &&
                (thing.__proto__ == StaticArrayBufferProto ||
                    thing.__proto__ == StaticUint8ArrayProto ||
                    thing.__proto__ == StaticByteBufferProto));
    }
    function ensureStringed(thing) {
        if (typeof thing == "string" || typeof thing == "number" || typeof thing == "boolean") {
            return thing;
        } else if (isStringable(thing)) {
            return util.toString(thing);
        } else if (thing instanceof Array) {
            var array = [];
            for (var i = 0; i < thing.length; i++) {
                array[i] = ensureStringed(thing[i]);
            }
            return array;
        } else if (thing === Object(thing)) {
            var obj = {};
            for (var key in thing) {
                obj[key] = ensureStringed(thing[key]);
            }
            return obj;
        } else if (thing === null) {
            return null;
        } else {
            throw new Error("unsure of how to jsonify object of type " + typeof thing);
        }
    }

    function jsonThing(thing) {
        return JSON.stringify(ensureStringed(thing)); //TODO: jquery???
    }

    var SessionRecord = function(identityKey, registrationId) {
        this._sessions = {};
        identityKey = util.toString(identityKey);
        if (typeof identityKey !== 'string') {
            throw new Error('SessionRecord: Invalid identityKey');
        }
        this.identityKey = identityKey;
        this.registrationId = registrationId;

        if (this.registrationId === undefined || typeof this.registrationId !== 'number') {
            this.registrationId = null;
        }
    };

    SessionRecord.deserialize = function(serialized) {
        var data = JSON.parse(serialized);
        var record = new SessionRecord(data.identityKey, data.registrationId);
        record._sessions = data.sessions;
        if (record._sessions === undefined || record._sessions === null || typeof record._sessions !== "object" || Array.isArray(record._sessions)) {
            throw new Error("Error deserializing SessionRecord");
        }
        if (record.identityKey === undefined || record.registrationId === undefined) {
            throw new Error("Error deserializing SessionRecord");
        }
        return record;
    };

    SessionRecord.prototype = {
        serialize: function() {
            return jsonThing({
                sessions       : this._sessions,
                registrationId : this.registrationId,
                identityKey    : this.identityKey
            });
        },
        haveOpenSession: function() {
            return this.registrationId !== null;
        },

        getSessionByBaseKey: function(baseKey) {
            var session = this._sessions[util.toString(baseKey)];
            if (session && session.indexInfo.baseKeyType === Internal.BaseKeyType.OURS) {
                console.log("Tried to lookup a session using our basekey");
                return undefined;
            }
            return session;
        },
        getSessionByRemoteEphemeralKey: function(remoteEphemeralKey) {
            this.detectDuplicateOpenSessions();
            var sessions = this._sessions;

            var searchKey = util.toString(remoteEphemeralKey);

            var openSession;
            for (var key in sessions) {
                if (sessions[key].indexInfo.closed == -1) {
                    openSession = sessions[key];
                }
                if (sessions[key][searchKey] !== undefined) {
                    return sessions[key];
                }
            }
            if (openSession !== undefined) {
                return openSession;
            }

            return undefined;
        },
        getOpenSession: function() {
            var sessions = this._sessions;
            if (sessions === undefined) {
                return undefined;
            }

            this.detectDuplicateOpenSessions();

            for (var key in sessions) {
                if (sessions[key].indexInfo.closed == -1) {
                    return sessions[key];
                }
            }
            return undefined;
        },
        detectDuplicateOpenSessions: function() {
            var openSession;
            var sessions = this._sessions;
            for (var key in sessions) {
                if (sessions[key].indexInfo.closed == -1) {
                    if (openSession !== undefined) {
                        throw new Error("Datastore inconsistensy: multiple open sessions");
                    }
                    openSession = sessions[key];
                }
            }
        },
        updateSessionState: function(session, registrationId) {
            var sessions = this._sessions;

            this.removeOldChains(session);

            if (this.identityKey === null) {
                this.identityKey = session.indexInfo.remoteIdentityKey;
            }
            if (util.toString(this.identityKey) !== util.toString(session.indexInfo.remoteIdentityKey)) {
                var e = new Error("Identity key changed at session save time");
                e.identityKey = session.indexInfo.remoteIdentityKey.toArrayBuffer();
                throw e;
            }

            sessions[util.toString(session.indexInfo.baseKey)] = session;

            this.removeOldSessions();

            var openSessionRemaining = false;
            for (var key in sessions) {
                if (sessions[key].indexInfo.closed == -1) {
                    openSessionRemaining = true;
                }
            }
            if (!openSessionRemaining) { // Used as a flag to get new pre keys for the next session
                this.registrationId = null;
            } else if (this.registrationId === null && registrationId !== undefined) {
                this.registrationId = registrationId;
            } else if (this.registrationId === null) {
                throw new Error("Had open sessions on a record that had no registrationId set");
            }
        },
        getSessions: function() {
            // return an array of sessions ordered by time closed,
            // followed by the open session
            var list = [];
            var openSession;
            for (var k in this._sessions) {
                if (this._sessions[k].indexInfo.closed === -1) {
                    openSession = this._sessions[k];
                } else {
                    list.push(this._sessions[k]);
                }
            }
            list = list.sort(function(s1, s2) {
                return s1.indexInfo.closed - s2.indexInfo.closed;
            });
            if (openSession) {
                list.push(openSession);
            }
            return list;
        },
        archiveCurrentState: function() {
            var open_session = this.getOpenSession();
            if (open_session !== undefined) {
                this.closeSession(open_session);
                this.updateSessionState(open_session);
            }
        },
        closeSession: function(session) {
            if (session.indexInfo.closed > -1) {
                return;
            }
            console.log('closing session', session.indexInfo.baseKey);

            // After this has run, we can still receive messages on ratchet chains which
            // were already open (unless we know we dont need them),
            // but we cannot send messages or step the ratchet

            // Delete current sending ratchet
            delete session[util.toString(session.currentRatchet.ephemeralKeyPair.pubKey)];
            // Move all receive ratchets to the oldRatchetList to mark them for deletion
            for (var i in session) {
                if (session[i].chainKey !== undefined && session[i].chainKey.key !== undefined) {
                    session.oldRatchetList[session.oldRatchetList.length] = {
                        added: Date.now(), ephemeralKey: i
                    };
                }
            }
            session.indexInfo.closed = Date.now();
            this.removeOldChains(session);
        },
        removeOldChains: function(session) {
            // Sending ratchets are always removed when we step because we never need them again
            // Receiving ratchets are added to the oldRatchetList, which we parse
            // here and remove all but the last five.
            while (session.oldRatchetList.length > 5) {
                var index = 0;
                var oldest = session.oldRatchetList[0];
                for (var i = 0; i < session.oldRatchetList.length; i++) {
                    if (session.oldRatchetList[i].added < oldest.added) {
                        oldest = session.oldRatchetList[i];
                        index = i;
                    }
                }
                console.log("Deleting chain closed at", oldest.added);
                delete session[util.toString(oldest.ephemeralKey)];
                session.oldRatchetList.splice(index, 1);
            }
        },
        removeOldSessions: function() {
            // Retain only the last 20 sessions
            var sessions = this._sessions;
            var oldestBaseKey, oldestSession;
            while (Object.keys(sessions).length > ARCHIVED_STATES_MAX_LENGTH) {
                for (var key in sessions) {
                    var session = sessions[key];
                    if (session.indexInfo.closed > -1 && // session is closed
                        (!oldestSession || session.indexInfo.closed < oldestSession.indexInfo.closed)) {
                        oldestBaseKey = key;
                        oldestSession = session;
                    }
                }
                console.log("Deleting session closed at", oldestSession.indexInfo.closed);
                delete sessions[util.toString(oldestBaseKey)];
            }
        },
    };

    return SessionRecord;
}();

function SignalProtocolAddress(name, deviceId) {
  this.name = name;
  this.deviceId = deviceId;
}

SignalProtocolAddress.prototype = {
  getName: function() {
    return this.name;
  },
  getDeviceId: function() {
    return this.deviceId;
  },
  toString: function() {
    return this.name + '.' + this.deviceId;
  },
  equals: function(other) {
    if (!(other instanceof SignalProtocolAddress)) { return false; }
    return other.name === this.name && other.deviceId === this.deviceId;
  }
};

libsignal.SignalProtocolAddress = function(name, deviceId) {
  var address = new SignalProtocolAddress(name, deviceId);

  ['getName', 'getDeviceId', 'toString', 'equals'].forEach(function(method) {
    this[method] = address[method].bind(address);
  }.bind(this));
};

libsignal.SignalProtocolAddress.fromString = function(encodedAddress) {
  if (typeof encodedAddress !== 'string' || !encodedAddress.match(/.*\.\d+/)) {
    throw new Error('Invalid SignalProtocolAddress string');
  }
  var parts = encodedAddress.split('.');
  return new libsignal.SignalProtocolAddress(parts[0], parseInt(parts[1]));
};

function SessionBuilder(storage, remoteAddress) {
  this.remoteAddress = remoteAddress;
  this.storage = storage;
}

SessionBuilder.prototype = {
  processPreKey: function(device) {
    return Internal.SessionLock.queueJobForNumber(this.remoteAddress.toString(), function() {
      return this.storage.isTrustedIdentity(
          this.remoteAddress.getName(), device.identityKey
      ).then(function(trusted) {
        if (!trusted) {
          throw new Error('Identity key changed');
        }

        return Internal.crypto.Ed25519Verify(
          device.identityKey,
          device.signedPreKey.publicKey,
          device.signedPreKey.signature
        );
      }).then(function() {
        return Internal.crypto.createKeyPair();
      }).then(function(baseKey) {
        var devicePreKey = (device.preKey.publicKey);
        return this.initSession(true, baseKey, undefined, device.identityKey,
          devicePreKey, device.signedPreKey.publicKey
        ).then(function(session) {
            session.pendingPreKey = {
                preKeyId    : device.preKey.keyId,
                signedKeyId : device.signedPreKey.keyId,
                baseKey     : baseKey.pubKey
            };
            return session;
        });
      }.bind(this)).then(function(session) {
        var address = this.remoteAddress.toString();
        return this.storage.loadSession(address).then(function(serialized) {
          var record;
          if (serialized !== undefined) {
            record = Internal.SessionRecord.deserialize(serialized);
          } else {
            record = new Internal.SessionRecord(device.identityKey, device.registrationId);
          }

          record.archiveCurrentState();
          record.updateSessionState(session, device.registrationId);
          return Promise.all([
            this.storage.storeSession(address, record.serialize()),
            this.storage.saveIdentity(this.remoteAddress.getName(), record.identityKey)
          ]);
        }.bind(this));
      }.bind(this));
    }.bind(this));
  },
  processV3: function(record, message) {
    var preKeyPair, signedPreKeyPair, session;
    return this.storage.isTrustedIdentity(
        this.remoteAddress.getName(), message.identityKey.toArrayBuffer()
    ).then(function(trusted) {
        if (!trusted) {
            var e = new Error('Unknown identity key');
            e.identityKey = message.identityKey.toArrayBuffer();
            throw e;
        }
        return Promise.all([
            this.storage.loadPreKey(message.preKeyId),
            this.storage.loadSignedPreKey(message.signedPreKeyId),
        ]).then(function(results) {
            preKeyPair       = results[0];
            signedPreKeyPair = results[1];
        });
    }.bind(this)).then(function() {
        session = record.getSessionByBaseKey(message.baseKey);
        if (session) {
          console.log("Duplicate PreKeyMessage for session");
          return;
        }

        session = record.getOpenSession();

        if (signedPreKeyPair === undefined) {
            // Session may or may not be the right one, but if its not, we
            // can't do anything about it ...fall through and let
            // decryptWhisperMessage handle that case
            if (session !== undefined && session.currentRatchet !== undefined) {
                return;
            } else {
                throw new Error("Missing Signed PreKey for PreKeyWhisperMessage");
            }
        }

        if (session !== undefined) {
            record.archiveCurrentState();
        }
        if (message.preKeyId && !preKeyPair) {
            console.log('Invalid prekey id', message.preKeyId);
        }
        return this.initSession(false, preKeyPair, signedPreKeyPair,
            message.identityKey.toArrayBuffer(),
            message.baseKey.toArrayBuffer(), undefined
        ).then(function(new_session) {
            // Note that the session is not actually saved until the very
            // end of decryptWhisperMessage ... to ensure that the sender
            // actually holds the private keys for all reported pubkeys
            record.updateSessionState(new_session, message.registrationId);
            return this.storage.saveIdentity(this.remoteAddress.getName(), message.identityKey.toArrayBuffer()).then(function() {
              return message.preKeyId;
            });
        }.bind(this));
    }.bind(this));
  },
  initSession: function(isInitiator, ourEphemeralKey, ourSignedKey,
                   theirIdentityPubKey, theirEphemeralPubKey,
                   theirSignedPubKey) {
    return this.storage.getIdentityKeyPair().then(function(ourIdentityKey) {
        if (isInitiator) {
            if (ourSignedKey !== undefined) {
                throw new Error("Invalid call to initSession");
            }
            ourSignedKey = ourEphemeralKey;
        } else {
            if (theirSignedPubKey !== undefined) {
                throw new Error("Invalid call to initSession");
            }
            theirSignedPubKey = theirEphemeralPubKey;
        }

        var sharedSecret;
        if (ourEphemeralKey === undefined || theirEphemeralPubKey === undefined) {
            sharedSecret = new Uint8Array(32 * 4);
        } else {
            sharedSecret = new Uint8Array(32 * 5);
        }

        for (var i = 0; i < 32; i++) {
            sharedSecret[i] = 0xff;
        }

        return Promise.all([
            Internal.crypto.ECDHE(theirSignedPubKey, ourIdentityKey.privKey),
            Internal.crypto.ECDHE(theirIdentityPubKey, ourSignedKey.privKey),
            Internal.crypto.ECDHE(theirSignedPubKey, ourSignedKey.privKey)
        ]).then(function(ecRes) {
            if (isInitiator) {
                sharedSecret.set(new Uint8Array(ecRes[0]), 32);
                sharedSecret.set(new Uint8Array(ecRes[1]), 32 * 2);
            } else {
                sharedSecret.set(new Uint8Array(ecRes[0]), 32 * 2);
                sharedSecret.set(new Uint8Array(ecRes[1]), 32);
            }
            sharedSecret.set(new Uint8Array(ecRes[2]), 32 * 3);

            if (ourEphemeralKey !== undefined && theirEphemeralPubKey !== undefined) {
                return Internal.crypto.ECDHE(
                    theirEphemeralPubKey, ourEphemeralKey.privKey
                ).then(function(ecRes4) {
                    sharedSecret.set(new Uint8Array(ecRes4), 32 * 4);
                });
            }
        }).then(function() {
            return Internal.HKDF(sharedSecret.buffer, new ArrayBuffer(32), "WhisperText");
        }).then(function(masterKey) {
            var session = {
                currentRatchet: {
                    rootKey                : masterKey[0],
                    lastRemoteEphemeralKey : theirSignedPubKey,
                    previousCounter        : 0
                },
                indexInfo: {
                    remoteIdentityKey : theirIdentityPubKey,
                    closed            : -1
                },
                oldRatchetList: []
            };

            // If we're initiating we go ahead and set our first sending ephemeral key now,
            // otherwise we figure it out when we first maybeStepRatchet with the remote's ephemeral key
            if (isInitiator) {
                session.indexInfo.baseKey = ourEphemeralKey.pubKey;
                session.indexInfo.baseKeyType = Internal.BaseKeyType.OURS;
                return Internal.crypto.createKeyPair().then(function(ourSendingEphemeralKey) {
                    session.currentRatchet.ephemeralKeyPair = ourSendingEphemeralKey;
                    return this.calculateSendingRatchet(session, theirSignedPubKey).then(function() {
                        return session;
                    });
                }.bind(this));
            } else {
                session.indexInfo.baseKey = theirEphemeralPubKey;
                session.indexInfo.baseKeyType = Internal.BaseKeyType.THEIRS;
                session.currentRatchet.ephemeralKeyPair = ourSignedKey;
                return session;
            }
        }.bind(this));
    }.bind(this));
  },
  calculateSendingRatchet: function(session, remoteKey) {
      var ratchet = session.currentRatchet;

      return Internal.crypto.ECDHE(
          remoteKey, util.toArrayBuffer(ratchet.ephemeralKeyPair.privKey)
      ).then(function(sharedSecret) {
          return Internal.HKDF(
              sharedSecret, util.toArrayBuffer(ratchet.rootKey), "WhisperRatchet"
          );
      }).then(function(masterKey) {
          session[util.toString(ratchet.ephemeralKeyPair.pubKey)] = {
              messageKeys : {},
              chainKey    : { counter : -1, key : masterKey[1] },
              chainType   : Internal.ChainType.SENDING
          };
          ratchet.rootKey = masterKey[0];
      });
  }

};

libsignal.SessionBuilder = function (storage, remoteAddress) {
  var builder = new SessionBuilder(storage, remoteAddress);
  this.processPreKey = builder.processPreKey.bind(builder);
  this.processV3 = builder.processV3.bind(builder);
};

function SessionCipher(storage, remoteAddress) {
  this.remoteAddress = remoteAddress;
  this.storage = storage;
}

SessionCipher.prototype = {
  getRecord: function(encodedNumber) {
      return this.storage.loadSession(encodedNumber).then(function(serialized) {
          if (serialized === undefined) {
              return undefined;
          }
          return Internal.SessionRecord.deserialize(serialized);
      });
  },
  encrypt: function(buffer, encoding) {
    buffer = dcodeIO.ByteBuffer.wrap(buffer, encoding).toArrayBuffer();
    return Internal.SessionLock.queueJobForNumber(this.remoteAddress.toString(), function() {
      if (!(buffer instanceof ArrayBuffer)) {
          throw new Error("Expected buffer to be an ArrayBuffer");
      }

      var address = this.remoteAddress.toString();
      var ourIdentityKey, myRegistrationId, record, session, chain;

      var msg = new Internal.protobuf.WhisperMessage();

      return Promise.all([
          this.storage.getIdentityKeyPair(),
          this.storage.getLocalRegistrationId(),
          this.getRecord(address)
      ]).then(function(results) {
          ourIdentityKey   = results[0];
          myRegistrationId = results[1];
          record           = results[2];
          if (!record) {
              throw new Error("No record for " + address);
          }
          session = record.getOpenSession();
          if (!session) {
              throw new Error("No session to encrypt message for " + address);
          }

          msg.ephemeralKey = util.toArrayBuffer(
              session.currentRatchet.ephemeralKeyPair.pubKey
          );
          chain = session[util.toString(msg.ephemeralKey)];
          if (chain.chainType === Internal.ChainType.RECEIVING) {
              throw new Error("Tried to encrypt on a receiving chain");
          }

          return this.fillMessageKeys(chain, chain.chainKey.counter + 1);
      }.bind(this)).then(function() {
          return Internal.HKDF(
              util.toArrayBuffer(chain.messageKeys[chain.chainKey.counter]),
              new ArrayBuffer(32), "WhisperMessageKeys");
      }).then(function(keys) {
          delete chain.messageKeys[chain.chainKey.counter];
          msg.counter = chain.chainKey.counter;
          msg.previousCounter = session.currentRatchet.previousCounter;

          return Internal.crypto.encrypt(
              keys[0], buffer, keys[2].slice(0, 16)
          ).then(function(ciphertext) {
              msg.ciphertext = ciphertext;
              var encodedMsg = msg.toArrayBuffer();

              var macInput = new Uint8Array(encodedMsg.byteLength + 33*2 + 1);
              macInput.set(new Uint8Array(util.toArrayBuffer(ourIdentityKey.pubKey)));
              macInput.set(new Uint8Array(util.toArrayBuffer(session.indexInfo.remoteIdentityKey)), 33);
              macInput[33*2] = (3 << 4) | 3;
              macInput.set(new Uint8Array(encodedMsg), 33*2 + 1);

              return Internal.crypto.sign(keys[1], macInput.buffer).then(function(mac) {
                  var result = new Uint8Array(encodedMsg.byteLength + 9);
                  result[0] = (3 << 4) | 3;
                  result.set(new Uint8Array(encodedMsg), 1);
                  result.set(new Uint8Array(mac, 0, 8), encodedMsg.byteLength + 1);

                  record.updateSessionState(session);
                  return this.storage.storeSession(address, record.serialize()).then(function() {
                      return result;
                  });
              }.bind(this));
          }.bind(this));
      }.bind(this)).then(function(message) {
          if (session.pendingPreKey !== undefined) {
              var preKeyMsg = new Internal.protobuf.PreKeyWhisperMessage();
              preKeyMsg.identityKey = util.toArrayBuffer(ourIdentityKey.pubKey);
              preKeyMsg.registrationId = myRegistrationId;

              preKeyMsg.baseKey = util.toArrayBuffer(session.pendingPreKey.baseKey);
              preKeyMsg.preKeyId = session.pendingPreKey.preKeyId;
              preKeyMsg.signedPreKeyId = session.pendingPreKey.signedKeyId;

              preKeyMsg.message = message;
              var result = String.fromCharCode((3 << 4) | 3) + util.toString(preKeyMsg.encode());
              return {
                  type           : 3,
                  body           : result,
                  registrationId : record.registrationId
              };

          } else {
              return {
                  type           : 1,
                  body           : util.toString(message),
                  registrationId : record.registrationId
              };
          }
      });
    }.bind(this));
  },
  decryptWithSessionList: function(buffer, sessionList, errors) {
    // Iterate recursively through the list, attempting to decrypt
    // using each one at a time. Stop and return the result if we get
    // a valid result
    if (sessionList.length === 0) {
        return Promise.reject(errors[0]);
    }

    var session = sessionList.pop();
    return this.doDecryptWhisperMessage(buffer, session).then(function(plaintext) {
        return { plaintext: plaintext, session: session };
    }).catch(function(e) {
        errors.push(e);
        return this.decryptWithSessionList(buffer, sessionList, errors);
    }.bind(this));
  },
  decryptWhisperMessage: function(buffer, encoding) {
      buffer = dcodeIO.ByteBuffer.wrap(buffer, encoding).toArrayBuffer();
      return Internal.SessionLock.queueJobForNumber(this.remoteAddress.toString(), function() {
        var address = this.remoteAddress.toString();
        return this.getRecord(address).then(function(record) {
            if (!record) {
                throw new Error("No record for device " + address);
            }
            var errors = [];
            return this.decryptWithSessionList(buffer, record.getSessions(), errors).then(function(result) {
                return this.getRecord(address).then(function(record) {
                    record.updateSessionState(result.session);
                    return this.storage.storeSession(address, record.serialize()).then(function() {
                        return result.plaintext;
                    });
                }.bind(this));
            }.bind(this));
        }.bind(this));
      }.bind(this));
  },
  decryptPreKeyWhisperMessage: function(buffer, encoding) {
      buffer = dcodeIO.ByteBuffer.wrap(buffer, encoding);
      var version = buffer.readUint8();
      if ((version & 0xF) > 3 || (version >> 4) < 3) {  // min version > 3 or max version < 3
          throw new Error("Incompatible version number on PreKeyWhisperMessage");
      }
      return Internal.SessionLock.queueJobForNumber(this.remoteAddress.toString(), function() {
          var address = this.remoteAddress.toString();
          return this.getRecord(address).then(function(record) {
              var preKeyProto = Internal.protobuf.PreKeyWhisperMessage.decode(buffer);
              if (!record) {
                  if (preKeyProto.registrationId === undefined) {
                      throw new Error("No registrationId");
                  }
                  record = new Internal.SessionRecord(
                      util.toString(preKeyProto.identityKey),
                      preKeyProto.registrationId
                  );
              }
              var builder = new SessionBuilder(this.storage, this.remoteAddress);
              return builder.processV3(record, preKeyProto).then(function(preKeyId) {
                  var session = record.getSessionByBaseKey(preKeyProto.baseKey);
                  return this.doDecryptWhisperMessage(
                      preKeyProto.message.toArrayBuffer(), session
                  ).then(function(plaintext) {
                      record.updateSessionState(session);
                      return this.storage.storeSession(address, record.serialize()).then(function() {
                          if (preKeyId !== undefined) {
                              return this.storage.removePreKey(preKeyId);
                          }
                      }.bind(this)).then(function() {
                          return plaintext;
                      });
                  }.bind(this));
              }.bind(this));
          }.bind(this));
      }.bind(this));
  },
  doDecryptWhisperMessage: function(messageBytes, session) {
    if (!messageBytes instanceof ArrayBuffer) {
        throw new Error("Expected messageBytes to be an ArrayBuffer");
    }
    var version = (new Uint8Array(messageBytes))[0];
    if ((version & 0xF) > 3 || (version >> 4) < 3) {  // min version > 3 or max version < 3
        throw new Error("Incompatible version number on WhisperMessage");
    }
    var messageProto = messageBytes.slice(1, messageBytes.byteLength- 8);
    var mac = messageBytes.slice(messageBytes.byteLength - 8, messageBytes.byteLength);

    var message = Internal.protobuf.WhisperMessage.decode(messageProto);
    var remoteEphemeralKey = message.ephemeralKey.toArrayBuffer();

    if (session === undefined) {
        return Promise.reject(new Error("No session found to decrypt message from " + this.remoteAddress.toString()));
    }
    if (session.indexInfo.closed != -1) {
        console.log('decrypting message for closed session');
    }

    return this.maybeStepRatchet(session, remoteEphemeralKey, message.previousCounter).then(function() {
        var chain = session[util.toString(message.ephemeralKey)];
        if (chain.chainType === Internal.ChainType.SENDING) {
            throw new Error("Tried to decrypt on a sending chain");
        }

        return this.fillMessageKeys(chain, message.counter).then(function() {
            var messageKey = chain.messageKeys[message.counter];
            if (messageKey === undefined) {
                var e = new Error("Message key not found. The counter was repeated or the key was not filled.");
                e.name = 'MessageCounterError';
                throw e;
            }
            delete chain.messageKeys[message.counter];
            return Internal.HKDF(util.toArrayBuffer(messageKey), new ArrayBuffer(32), "WhisperMessageKeys");
        });
    }.bind(this)).then(function(keys) {
        return this.storage.getIdentityKeyPair().then(function(ourIdentityKey) {

            var macInput = new Uint8Array(messageProto.byteLength + 33*2 + 1);
            macInput.set(new Uint8Array(util.toArrayBuffer(session.indexInfo.remoteIdentityKey)));
            macInput.set(new Uint8Array(util.toArrayBuffer(ourIdentityKey.pubKey)), 33);
            macInput[33*2] = (3 << 4) | 3;
            macInput.set(new Uint8Array(messageProto), 33*2 + 1);

            return Internal.verifyMAC(macInput.buffer, keys[1], mac, 8);
        }.bind(this)).then(function() {
            return Internal.crypto.decrypt(keys[0], message.ciphertext.toArrayBuffer(), keys[2].slice(0, 16));
        });
    }.bind(this)).then(function(plaintext) {
        delete session.pendingPreKey;
        return plaintext;
    });
  },
  fillMessageKeys: function(chain, counter) {
      if (Object.keys(chain.messageKeys).length >= 1000) {
          console.log("Too many message keys for chain");
          return Promise.resolve(); // Stalker, much?
      }

      if (chain.chainKey.counter >= counter) {
          return Promise.resolve(); // Already calculated
      }

      if (chain.chainKey.key === undefined) {
          throw new Error("Got invalid request to extend chain after it was already closed");
      }

      var key = util.toArrayBuffer(chain.chainKey.key);
      var byteArray = new Uint8Array(1);
      byteArray[0] = 1;
      return Internal.crypto.sign(key, byteArray.buffer).then(function(mac) {
          byteArray[0] = 2;
          return Internal.crypto.sign(key, byteArray.buffer).then(function(key) {
              chain.messageKeys[chain.chainKey.counter + 1] = mac;
              chain.chainKey.key = key;
              chain.chainKey.counter += 1;
              return this.fillMessageKeys(chain, counter);
          }.bind(this));
      }.bind(this));
  },
  maybeStepRatchet: function(session, remoteKey, previousCounter) {
      if (session[util.toString(remoteKey)] !== undefined) {
          return Promise.resolve();
      }

      console.log('New remote ephemeral key');
      var ratchet = session.currentRatchet;

      return Promise.resolve().then(function() {
          var previousRatchet = session[util.toString(ratchet.lastRemoteEphemeralKey)];
          if (previousRatchet !== undefined) {
              return this.fillMessageKeys(previousRatchet, previousCounter).then(function() {
                  delete previousRatchet.chainKey.key;
                  session.oldRatchetList[session.oldRatchetList.length] = {
                      added        : Date.now(),
                      ephemeralKey : ratchet.lastRemoteEphemeralKey
                  };
              });
          }
      }.bind(this)).then(function() {
          return this.calculateRatchet(session, remoteKey, false).then(function() {
              // Now swap the ephemeral key and calculate the new sending chain
              var previousRatchet = util.toString(ratchet.ephemeralKeyPair.pubKey);
              if (session[previousRatchet] !== undefined) {
                  ratchet.previousCounter = session[previousRatchet].chainKey.counter;
                  delete session[previousRatchet];
              }

              return Internal.crypto.createKeyPair().then(function(keyPair) {
                  ratchet.ephemeralKeyPair = keyPair;
                  return this.calculateRatchet(session, remoteKey, true).then(function() {
                      ratchet.lastRemoteEphemeralKey = remoteKey;
                  }.bind(this));
              }.bind(this));
          }.bind(this));
      }.bind(this));
  },
  calculateRatchet: function(session, remoteKey, sending) {
      var ratchet = session.currentRatchet;

      return Internal.crypto.ECDHE(remoteKey, util.toArrayBuffer(ratchet.ephemeralKeyPair.privKey)).then(function(sharedSecret) {
          return Internal.HKDF(sharedSecret, util.toArrayBuffer(ratchet.rootKey), "WhisperRatchet").then(function(masterKey) {
              var ephemeralPublicKey;
              if (sending) {
                  ephemeralPublicKey = ratchet.ephemeralKeyPair.pubKey;
              }
              else {
                  ephemeralPublicKey = remoteKey;
              }
              session[util.toString(ephemeralPublicKey)] = {
                  messageKeys: {},
                  chainKey: { counter: -1, key: masterKey[1] },
                  chainType: sending ? Internal.ChainType.SENDING : Internal.ChainType.RECEIVING
              };
              ratchet.rootKey = masterKey[0];
          });
      });
  },
  getRemoteRegistrationId: function() {
    return Internal.SessionLock.queueJobForNumber(this.remoteAddress.toString(), function() {
      return this.getRecord(this.remoteAddress.toString()).then(function(record) {
          if (record === undefined) {
              return undefined;
          }
          return record.registrationId;
      });
    }.bind(this));
  },
  hasOpenSession: function() {
    return Internal.SessionLock.queueJobForNumber(this.remoteAddress.toString(), function() {
      return this.getRecord(this.remoteAddress.toString()).then(function(record) {
          if (record === undefined) {
              return false;
          }
          return record.haveOpenSession();
      });
    }.bind(this));
  },
  closeOpenSessionForDevice: function() {
    var address = this.remoteAddress.toString();
    return Internal.SessionLock.queueJobForNumber(address, function() {
      return this.getRecord(address).then(function(record) {
        if (record === undefined || record.getOpenSession() === undefined) {
            return;
        }

        record.archiveCurrentState();
        return this.storage.storeSession(address, record.serialize());
      }.bind(this));
    }.bind(this));
  }
};

libsignal.SessionCipher = function(storage, remoteAddress) {
    var cipher = new SessionCipher(storage, remoteAddress);

    // returns a Promise that resolves to a ciphertext object
    this.encrypt = cipher.encrypt.bind(cipher);

    // returns a Promise that inits a session if necessary and resolves
    // to a decrypted plaintext array buffer
    this.decryptPreKeyWhisperMessage = cipher.decryptPreKeyWhisperMessage.bind(cipher);

    // returns a Promise that resolves to decrypted plaintext array buffer
    this.decryptWhisperMessage = cipher.decryptWhisperMessage.bind(cipher);

    this.getRemoteRegistrationId = cipher.getRemoteRegistrationId.bind(cipher);
    this.hasOpenSession = cipher.hasOpenSession.bind(cipher);
    this.closeOpenSessionForDevice = cipher.closeOpenSessionForDevice.bind(cipher);
};

 /*
  * jobQueue manages multiple queues indexed by device to serialize
  * session io ops on the database.
  */
;(function() {
    'use strict';

    Internal.SessionLock = {};
    const jobQueue = {};

    Internal.SessionLock.queueJobForNumber = async function queueJobForNumber(number, job) {
        const running = jobQueue[number];
        jobQueue[number] = job;
        try {
            // Wait for current job to finish first...
            if (running) {
                await running;
            }
        } finally {
            try {
                return await job();
            } finally {
                if (jobQueue[number] === job) {
                    delete jobQueue[number];  // We're the last one, do cleanup.
                }
            }
        }
    };
})();

(function() {
    var VERSION = 0;

    function iterateHash(data, key, count) {
        data = dcodeIO.ByteBuffer.concat([data, key]).toArrayBuffer();
        return Internal.crypto.hash(data).then(function(result) {
            if (--count === 0) {
                return result;
            } else {
                return iterateHash(result, key, count);
            }
        });
    }

    function shortToArrayBuffer(number) {
        return new Uint16Array([number]).buffer;
    }

    function getEncodedChunk(hash, offset) {
        var chunk = ( hash[offset]   * Math.pow(2,32) +
                      hash[offset+1] * Math.pow(2,24) +
                      hash[offset+2] * Math.pow(2,16) +
                      hash[offset+3] * Math.pow(2,8) +
                      hash[offset+4] ) % 100000;
        var s = chunk.toString();
        while (s.length < 5) {
            s = '0' + s;
        }
        return s;
    }

    function getDisplayStringFor(identifier, key, iterations) {
        var bytes = dcodeIO.ByteBuffer.concat([
            shortToArrayBuffer(VERSION), key, identifier
        ]).toArrayBuffer();
        return iterateHash(bytes, key, iterations).then(function(output) {
            output = new Uint8Array(output);
            return getEncodedChunk(output, 0) +
                getEncodedChunk(output, 5) +
                getEncodedChunk(output, 10) +
                getEncodedChunk(output, 15) +
                getEncodedChunk(output, 20) +
                getEncodedChunk(output, 25);
        });
    }

    libsignal.FingerprintGenerator = function(iterations) {
        this.iterations = iterations;
    };
    libsignal.FingerprintGenerator.prototype = {
        createFor: function(localIdentifier, localIdentityKey,
                            remoteIdentifier, remoteIdentityKey) {
            if (typeof localIdentifier !== 'string' ||
                typeof remoteIdentifier !== 'string' ||
                !(localIdentityKey instanceof ArrayBuffer) ||
                !(remoteIdentityKey instanceof ArrayBuffer)) {

              throw new Error('Invalid arguments');
            }

            return Promise.all([
                getDisplayStringFor(localIdentifier, localIdentityKey, this.iterations),
                getDisplayStringFor(remoteIdentifier, remoteIdentityKey, this.iterations)
            ]).then(function(fingerprints) {
                return fingerprints.sort().join('');
            });
        }
    };

})();


})();