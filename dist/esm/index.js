import React, { useContext, useMemo, useState, useEffect, useCallback, createContext } from 'react';
import { interactWrite as interactWrite$1, readContract as readContract$1 } from 'smartweave';
import Arweave from 'arweave';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
});

var interactWrite = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(arweave, wallet, contractId, input) {
    var tags;
    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tags = [{
              name: "App-Name",
              value: "SmartWeaveAction"
            }, {
              name: "App-Version",
              value: "0.3.0"
            }, {
              name: "Contract-Src",
              value: contractId
            }];
            console.log(wallet);
            console.log(input);
            _context.next = 5;
            return interactWrite$1(arweave, wallet, contractId, input, tags);

          case 5:
            return _context.abrupt("return", _context.sent);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function interactWrite(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();
var readContract = /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(arweave, contractId) {
    return runtime_1.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return readContract$1(arweave, contractId);

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function readContract(_x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

function getSafe(fn, defaultVal) {
  try {
    return fn();
  } catch (e) {
    return defaultVal;
  }
}

var aw = function aw() {
},
    selfAddy = "";

function Arc(_x, _x2) {
  return _Arc.apply(this, arguments);
}

function _Arc() {
  _Arc = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee14(key, swc) {
    var permissions, name, logo, awStat, _awStat, arweave;

    return runtime_1.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _awStat = function _awStat3() {
              _awStat = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee13() {
                return runtime_1.wrap(function _callee13$(_context13) {
                  while (1) {
                    switch (_context13.prev = _context13.next) {
                      case 0:
                        aw = window.arweaveWallet;
                        console.log(aw);
                        _context13.prev = 3;
                        _context13.next = 6;
                        return window.arweaveWallet.connect([].concat(permissions), {
                          name: name,
                          logo: logo
                        });

                      case 6:
                        _context13.next = 11;
                        break;

                      case 8:
                        _context13.prev = 8;
                        _context13.t0 = _context13["catch"](3);
                        console.info("connected");

                      case 11:
                      case "end":
                        return _context13.stop();
                    }
                  }
                }, _callee13, null, [[3, 8]]);
              }));
              return _awStat.apply(this, arguments);
            };

            awStat = function _awStat2() {
              return _awStat.apply(this, arguments);
            };

            permissions = getSafe(key["permissions"], ["ACCESS_ADDRESS"]), name = getSafe(key["name"], ""), logo = getSafe(key["logo"], "");
            window.addEventListener("arweaveWalletLoaded", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
              return runtime_1.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return awStat();

                    case 2:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            })));
            _context14.next = 6;
            return setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2() {
              return runtime_1.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:

                      _context2.next = 3;
                      return awStat();

                    case 3:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2);
            })), 1000);

          case 6:
            _context14.next = 8;
            return window.Arweave.init({
              host: 'arweave.net'
            });

          case 8:
            arweave = _context14.sent;
            _context14.next = 11;
            return new Promise( /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(resolve) {
                return runtime_1.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.t0 = resolve;
                        _context3.next = 3;
                        return window.arweaveWallet.getActiveAddress();

                      case 3:
                        _context3.t1 = _context3.sent;
                        return _context3.abrupt("return", (0, _context3.t0)(_context3.t1));

                      case 5:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x3) {
                return _ref3.apply(this, arguments);
              };
            }());

          case 11:
            selfAddy = _context14.sent;
            return _context14.abrupt("return", {
              transaction: function () {
                var _transaction = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(data) {
                  return runtime_1.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          _context4.next = 2;
                          return arweave.createTransaction(data);

                        case 2:
                          return _context4.abrupt("return", _context4.sent);

                        case 3:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  }, _callee4);
                }));

                function transaction(_x4) {
                  return _transaction.apply(this, arguments);
                }

                return transaction;
              }(),
              post: function () {
                var _post = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(transaction) {
                  return runtime_1.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          _context5.next = 2;
                          return arweave.transactions.post(transaction);

                        case 2:
                          return _context5.abrupt("return", _context5.sent);

                        case 3:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee5);
                }));

                function post(_x5) {
                  return _post.apply(this, arguments);
                }

                return post;
              }(),
              addTag: function addTag(transaction, name, value) {
                transaction.addTag(name, value);
              },
              sign: function () {
                var _sign = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(transaction) {
                  return runtime_1.wrap(function _callee6$(_context6) {
                    while (1) {
                      switch (_context6.prev = _context6.next) {
                        case 0:
                          _context6.next = 2;
                          return arweave.transactions.sign(transaction);

                        case 2:
                        case "end":
                          return _context6.stop();
                      }
                    }
                  }, _callee6);
                }));

                function sign(_x6) {
                  return _sign.apply(this, arguments);
                }

                return sign;
              }(),
              submit: function () {
                var _submit = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7(transaction) {
                  return runtime_1.wrap(function _callee7$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          _context7.next = 2;
                          return arweave.transactions.getUploader(transaction);

                        case 2:
                          return _context7.abrupt("return", _context7.sent);

                        case 3:
                        case "end":
                          return _context7.stop();
                      }
                    }
                  }, _callee7);
                }));

                function submit(_x7) {
                  return _submit.apply(this, arguments);
                }

                return submit;
              }(),
              smartweave: {
                write: function () {
                  var _write = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee8(input, id) {
                    return runtime_1.wrap(function _callee8$(_context8) {
                      while (1) {
                        switch (_context8.prev = _context8.next) {
                          case 0:
                            if (!swc) {
                              _context8.next = 6;
                              break;
                            }

                            _context8.next = 3;
                            return interactWrite(arweave, 'use_wallet', id, input);

                          case 3:
                            _context8.t0 = _context8.sent;
                            _context8.next = 7;
                            break;

                          case 6:
                            _context8.t0 = "";

                          case 7:
                            return _context8.abrupt("return", _context8.t0);

                          case 8:
                          case "end":
                            return _context8.stop();
                        }
                      }
                    }, _callee8);
                  }));

                  function write(_x8, _x9) {
                    return _write.apply(this, arguments);
                  }

                  return write;
                }(),
                read: function () {
                  var _read = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee9(id) {
                    return runtime_1.wrap(function _callee9$(_context9) {
                      while (1) {
                        switch (_context9.prev = _context9.next) {
                          case 0:
                            if (!swc) {
                              _context9.next = 6;
                              break;
                            }

                            _context9.next = 3;
                            return readContract(arweave, id);

                          case 3:
                            _context9.t0 = _context9.sent;
                            _context9.next = 7;
                            break;

                          case 6:
                            _context9.t0 = "";

                          case 7:
                            return _context9.abrupt("return", _context9.t0);

                          case 8:
                          case "end":
                            return _context9.stop();
                        }
                      }
                    }, _callee9);
                  }));

                  function read(_x10) {
                    return _read.apply(this, arguments);
                  }

                  return read;
                }()
              },
              getArweave: function getArweave() {
                return arweave;
              },
              //arconnect specific 
              disconnect: function disconnect() {
                window.arweaveWallet.disconnect();
              },
              getBalance: function () {
                var _getBalance = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee11(walletID, setAttr) {
                  return runtime_1.wrap(function _callee11$(_context11) {
                    while (1) {
                      switch (_context11.prev = _context11.next) {
                        case 0:
                          if (walletID === void 0) {
                            walletID = 'self';
                          }

                          if (setAttr === void 0) {
                            setAttr = function setAttr() {};
                          }

                          // @ts-ignore
                          walletID = walletID == 'self' ? selfAddy : walletID;
                          console.log("self addy in getBalance: ", selfAddy);
                          return _context11.abrupt("return", new Promise( /*#__PURE__*/function () {
                            var _ref4 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee10(resolve) {
                              return runtime_1.wrap(function _callee10$(_context10) {
                                while (1) {
                                  switch (_context10.prev = _context10.next) {
                                    case 0:
                                      _context10.next = 2;
                                      return arweave.wallets.getBalance(walletID).then(function (balance) {
                                        setAttr(balance);
                                        resolve(balance);
                                      });

                                    case 2:
                                    case "end":
                                      return _context10.stop();
                                  }
                                }
                              }, _callee10);
                            }));

                            return function (_x13) {
                              return _ref4.apply(this, arguments);
                            };
                          }()));

                        case 5:
                        case "end":
                          return _context11.stop();
                      }
                    }
                  }, _callee11);
                }));

                function getBalance(_x11, _x12) {
                  return _getBalance.apply(this, arguments);
                }

                return getBalance;
              }(),
              getAddress: function getAddress(setAttr) {
                if (setAttr === void 0) {
                  setAttr = function setAttr() {};
                }

                return new Promise( /*#__PURE__*/function () {
                  var _ref5 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee12(resolve) {
                    return runtime_1.wrap(function _callee12$(_context12) {
                      while (1) {
                        switch (_context12.prev = _context12.next) {
                          case 0:
                            _context12.prev = 0;
                            _context12.next = 3;
                            return window.arweaveWallet.getActiveAddress().then(function (res) {
                              setAttr(res);
                              resolve(res);
                            });

                          case 3:
                            _context12.next = 9;
                            break;

                          case 5:
                            _context12.prev = 5;
                            _context12.t0 = _context12["catch"](0);
                            resolve(selfAddy);
                            setAttr(selfAddy);

                          case 9:
                          case "end":
                            return _context12.stop();
                        }
                      }
                    }, _callee12, null, [[0, 5]]);
                  }));

                  return function (_x14) {
                    return _ref5.apply(this, arguments);
                  };
                }());
              }
            });

          case 13:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));
  return _Arc.apply(this, arguments);
}

var selfAddy$1 = "";
function Arjs(_x, _x2) {
  return _Arjs.apply(this, arguments);
}

function _Arjs() {
  _Arjs = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee14(key, swc) {
    var arweave;
    return runtime_1.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return Arweave.init({
              host: 'arweave.net'
            });

          case 2:
            arweave = _context14.sent;
            key = typeof key == 'string' ? JSON.parse(key) : key;

            if (key['kty']) {
              _context14.next = 6;
              break;
            }

            throw "Data Input is not a arweave key.";

          case 6:
            _context14.next = 8;
            return new Promise( /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(resolve) {
                return runtime_1.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.t0 = resolve;
                        _context3.next = 3;
                        return arweave.wallets.jwkToAddress(key);

                      case 3:
                        _context3.t1 = _context3.sent;
                        return _context3.abrupt("return", (0, _context3.t0)(_context3.t1));

                      case 5:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x3) {
                return _ref3.apply(this, arguments);
              };
            }());

          case 8:
            selfAddy$1 = _context14.sent;
            return _context14.abrupt("return", {
              transaction: function () {
                var _transaction = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(data, _key) {
                  return runtime_1.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          if (_key === void 0) {
                            _key = key;
                          }

                          _context4.next = 3;
                          return arweave.createTransaction(data, _key);

                        case 3:
                          return _context4.abrupt("return", _context4.sent);

                        case 4:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  }, _callee4);
                }));

                function transaction(_x4, _x5) {
                  return _transaction.apply(this, arguments);
                }

                return transaction;
              }(),
              post: function () {
                var _post = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(transaction) {
                  return runtime_1.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          _context5.next = 2;
                          return arweave.transactions.post(transaction);

                        case 2:
                          return _context5.abrupt("return", _context5.sent);

                        case 3:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee5);
                }));

                function post(_x6) {
                  return _post.apply(this, arguments);
                }

                return post;
              }(),
              addTag: function addTag(transaction, name, value) {
                transaction.addTag(name, value);
              },
              sign: function () {
                var _sign = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(transaction, _key) {
                  return runtime_1.wrap(function _callee6$(_context6) {
                    while (1) {
                      switch (_context6.prev = _context6.next) {
                        case 0:
                          if (_key === void 0) {
                            _key = key;
                          }

                          _context6.next = 3;
                          return arweave.transactions.sign(transaction, _key);

                        case 3:
                        case "end":
                          return _context6.stop();
                      }
                    }
                  }, _callee6);
                }));

                function sign(_x7, _x8) {
                  return _sign.apply(this, arguments);
                }

                return sign;
              }(),
              submit: function () {
                var _submit = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7(transaction) {
                  return runtime_1.wrap(function _callee7$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          _context7.next = 2;
                          return arweave.transactions.getUploader(transaction);

                        case 2:
                          return _context7.abrupt("return", _context7.sent);

                        case 3:
                        case "end":
                          return _context7.stop();
                      }
                    }
                  }, _callee7);
                }));

                function submit(_x9) {
                  return _submit.apply(this, arguments);
                }

                return submit;
              }(),
              smartweave: {
                write: function () {
                  var _write = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee8(input, id, _key) {
                    return runtime_1.wrap(function _callee8$(_context8) {
                      while (1) {
                        switch (_context8.prev = _context8.next) {
                          case 0:
                            if (_key === void 0) {
                              _key = key;
                            }

                            if (!swc) {
                              _context8.next = 7;
                              break;
                            }

                            _context8.next = 4;
                            return interactWrite(arweave, _key, id, input);

                          case 4:
                            _context8.t0 = _context8.sent;
                            _context8.next = 8;
                            break;

                          case 7:
                            _context8.t0 = "";

                          case 8:
                            return _context8.abrupt("return", _context8.t0);

                          case 9:
                          case "end":
                            return _context8.stop();
                        }
                      }
                    }, _callee8);
                  }));

                  function write(_x10, _x11, _x12) {
                    return _write.apply(this, arguments);
                  }

                  return write;
                }(),
                read: function () {
                  var _read = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee9(id) {
                    return runtime_1.wrap(function _callee9$(_context9) {
                      while (1) {
                        switch (_context9.prev = _context9.next) {
                          case 0:
                            if (!swc) {
                              _context9.next = 6;
                              break;
                            }

                            _context9.next = 3;
                            return readContract(arweave, id);

                          case 3:
                            _context9.t0 = _context9.sent;
                            _context9.next = 7;
                            break;

                          case 6:
                            _context9.t0 = "";

                          case 7:
                            return _context9.abrupt("return", _context9.t0);

                          case 8:
                          case "end":
                            return _context9.stop();
                        }
                      }
                    }, _callee9);
                  }));

                  function read(_x13) {
                    return _read.apply(this, arguments);
                  }

                  return read;
                }()
              },
              getArweave: function getArweave() {
                return arweave;
              },
              //arweave specific
              getBalance: function () {
                var _getBalance = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee11(walletID, setAttr) {
                  return runtime_1.wrap(function _callee11$(_context11) {
                    while (1) {
                      switch (_context11.prev = _context11.next) {
                        case 0:
                          if (walletID === void 0) {
                            walletID = 'self';
                          }

                          if (setAttr === void 0) {
                            setAttr = function setAttr() {};
                          }

                          // @ts-ignore
                          walletID = walletID == 'self' ? selfAddy$1 : walletID;
                          console.log("self addy in getBalance: ", selfAddy$1);
                          _context11.next = 6;
                          return new Promise( /*#__PURE__*/function () {
                            var _ref4 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee10(resolve) {
                              return runtime_1.wrap(function _callee10$(_context10) {
                                while (1) {
                                  switch (_context10.prev = _context10.next) {
                                    case 0:
                                      _context10.next = 2;
                                      return arweave.wallets.getBalance(walletID).then(function (balance) {
                                        setAttr(balance);
                                        resolve(balance);
                                      });

                                    case 2:
                                    case "end":
                                      return _context10.stop();
                                  }
                                }
                              }, _callee10);
                            }));

                            return function (_x16) {
                              return _ref4.apply(this, arguments);
                            };
                          }());

                        case 6:
                          return _context11.abrupt("return", _context11.sent);

                        case 7:
                        case "end":
                          return _context11.stop();
                      }
                    }
                  }, _callee11);
                }));

                function getBalance(_x14, _x15) {
                  return _getBalance.apply(this, arguments);
                }

                return getBalance;
              }(),
              getAddress: function () {
                var _getAddress = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee13(setAttr) {
                  return runtime_1.wrap(function _callee13$(_context13) {
                    while (1) {
                      switch (_context13.prev = _context13.next) {
                        case 0:
                          if (setAttr === void 0) {
                            setAttr = function setAttr() {};
                          }

                          _context13.next = 3;
                          return new Promise( /*#__PURE__*/function () {
                            var _ref5 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee12(resolve) {
                              return runtime_1.wrap(function _callee12$(_context12) {
                                while (1) {
                                  switch (_context12.prev = _context12.next) {
                                    case 0:
                                      _context12.next = 2;
                                      return arweave.wallets.jwkToAddress(key).then(function (addy) {
                                        setAttr(addy);
                                        resolve(addy);
                                      });

                                    case 2:
                                    case "end":
                                      return _context12.stop();
                                  }
                                }
                              }, _callee12);
                            }));

                            return function (_x18) {
                              return _ref5.apply(this, arguments);
                            };
                          }());

                        case 3:
                          return _context13.abrupt("return", _context13.sent);

                        case 4:
                        case "end":
                          return _context13.stop();
                      }
                    }
                  }, _callee13);
                }));

                function getAddress(_x17) {
                  return _getAddress.apply(this, arguments);
                }

                return getAddress;
              }()
            });

          case 10:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));
  return _Arjs.apply(this, arguments);
}

function connectors(enabled, swc) {
  return {
    connectAr: function () {
      var _connectAr = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(wallet, key) {
        return runtime_1.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.t0 = wallet;
                _context.next = _context.t0 === "arweave" ? 3 : _context.t0 === "arconnect" ? 11 : 19;
                break;

              case 3:
                if (!(enabled.indexOf(wallet) != -1)) {
                  _context.next = 9;
                  break;
                }

                _context.next = 6;
                return Arjs(key, swc);

              case 6:
                _context.t1 = _context.sent;
                _context.next = 10;
                break;

              case 9:
                _context.t1 = "";

              case 10:
                return _context.abrupt("return", _context.t1);

              case 11:
                if (!(enabled.indexOf(wallet) != -1)) {
                  _context.next = 17;
                  break;
                }

                _context.next = 14;
                return Arc(key, swc);

              case 14:
                _context.t2 = _context.sent;
                _context.next = 18;
                break;

              case 17:
                _context.t2 = "";

              case 18:
                return _context.abrupt("return", _context.t2);

              case 19:
                throw new console.error("error here");

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function connectAr(_x, _x2) {
        return _connectAr.apply(this, arguments);
      }

      return connectAr;
    }()
  };
}

var sessType = "session";
var MySessionStorage = {
  getItem: function getItem(key) {
    if (typeof window !== 'undefined') {
      // @ts-ignore
      var value = null;

      if (window.localStorage.getItem(key) != null) {
        value = window.localStorage.getItem(key);
      } else {
        value = window.sessionStorage.getItem(key);
      }

      return value;
    }

    return null;
  },
  setItem: function setItem(key, object) {
    if (typeof window !== 'undefined') sessType != "session" ? window.localStorage.setItem(key, object) : window.sessionStorage.setItem(key, object);
  }
},
    session = {
  getSession: function getSession(sessItem) {
    if (MySessionStorage.getItem(sessItem) != null) {
      var value = MySessionStorage.getItem(sessItem);
      return typeof value == "string" ? value : // @ts-ignore
      JSON.parse(value);
    } else return null;
  },
  setSession: function setSession(sessItem, sess) {
    MySessionStorage.setItem(sessItem, sess);
  },
  storageType: function storageType(setType) {
    sessType = setType;
  },
  delSession: function delSession(key) {
    if (window.localStorage.getItem(key) != null) {
      window.localStorage.removeItem(key);
    }

    if (window.sessionStorage.getItem(key) != null) {
      window.sessionStorage.removeItem(key);
    }
  }
};

var UseArjsContext = /*#__PURE__*/createContext(null);
function useArjs() {
  var walletContext = useContext(UseArjsContext);

  if (walletContext === null) {
    throw new Error('useArjs() can only be used inside of <ArjsProvider />, ' + 'please declare it at a higher level.');
  }

  var wallet = walletContext.wallet,
      arweave = walletContext.arweave;
  return useMemo(function () {
    // @ts-ignore
    return _extends({}, arweave, wallet);
  }, [wallet, arweave]);
}
function ArjsProvider(_ref) {
  var connectors$1 = _ref.connectors,
      _ref$enableSWC = _ref.enableSWC,
      enableSWC = _ref$enableSWC === void 0 ? false : _ref$enableSWC,
      children = _ref.children;
  var walletContext = useContext(UseArjsContext);

  if (walletContext !== null) {
    throw new Error('<ArjsProvider /> has already been declared.');
  }

  var _useState = useState('disconnected'),
      status = _useState[0],
      setStatus = _useState[1],
      _useState2 = useState('disconnected'),
      provider = _useState2[0],
      setProvider = _useState2[1],
      _useState3 = useState({}),
      arweave = _useState3[0],
      setArweave = _useState3[1];

  var list = [];

  for (var connector in connectors$1) {
    if (connector == "arweave" && connectors$1[connector]) {
      list.push(connector);
    }

    if (connector == "arconnect" && connectors$1[connector]) list.push(connector);
  }

  var _useState4 = useState(list),
      enabledList = _useState4[0],
      setEnabledList = _useState4[1];

  useEffect(function () {
    setEnabledList(list);
  }, []);
  var Aggr = useMemo(function () {
    return connectors(enabledList, enableSWC);
  }, [enabledList]);
  var disconnect = useCallback(function () {
    setStatus('disconnected');
    session.delSession("walletSession");
    session.delSession("arweaveWallet");
  }, []);
  var connect = useCallback( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(connector, perms) {
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              disconnect();
              setStatus('connecting');
              setProvider(connector);
              _context2.next = 5;
              return Aggr.connectAr(connector, perms).then( /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(result) {
                  return runtime_1.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.t0 = setArweave;
                          _context.next = 3;
                          return result;

                        case 3:
                          _context.t1 = _context.sent;
                          _context.next = 6;
                          return (0, _context.t0)(_context.t1);

                        case 6:
                          setStatus('connected');

                        case 7:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function (_x3) {
                  return _ref3.apply(this, arguments);
                };
              }())["catch"](function (err) {
                setStatus('failed');
                throw "failed to connect to " + connector + ": " + err;
              });

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }(), [disconnect]);
  var wallet = useMemo(function () {
    return {
      connect: connect,
      status: status,
      arweave: arweave,
      provider: provider,
      disconnect: disconnect
    };
  }, [connect, status, arweave, provider, disconnect]);
  return React.createElement(UseArjsContext.Provider, {
    value: {
      wallet: wallet,
      arweave: arweave
    }
  }, children);
}

export { ArjsProvider, connectors, useArjs };
//# sourceMappingURL=index.js.map
