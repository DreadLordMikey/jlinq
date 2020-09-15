// Performance test guidelines
//
// -  The profile method receives as its arguments the name of the method
//    under test, maximum allowed time for the method under test, and a
//    callback function.The callback function takes no parameters, and is
//    expected to invoke the method under test.
//
//    profile() will create a test. This test will describe the method
//    test and its maximum allowed run time. The test will execute the
//    callback function and then evaluate the elapsed time. If the elapsed
//    time is greater than the maximum time, the test fails.
//
// -  Each test must isolate the specific operation under test. The call to the
//    profile method must capture ONLY the method being measured. Do not
//    include any code to set up the test or to analyze the results.
//
// -  The test runner may report a longer execution time than the actual
//    elapsed time. This is because the profile method isolates the callback
//    function and measures ONLY that; the elapsed time for the unit test
//    includes all the code to set up the test and to measure the performance
//    of the callback.

import { from, Sequence } from '../src/Sequence';
import data, { dataRecord } from '../src/data';

//#region profile
let profile = (name: string, maxTime: number, f: Function) => {

  describe(`${name} performance test`, () => {
    it(`${name} executes in ${maxTime}ms or less`, () => {
      let started = performance.now();
      f();
      let stopped = performance.now();
      let elapsed = stopped - started;

      expect(elapsed).toBeLessThanOrEqual(maxTime);
    });
  });
};
//#endregion

let sourceData: Sequence<dataRecord> = from(data);

profile("all", .5, () => { sourceData.all((e) => e.isActive) });
profile("any", .5, () => { sourceData.any((e) => e.isActive) });

// We need a new copy of the data so we don't pollute the original, here.
var tempData = from(sourceData.toArray());
var sourceItem = sourceData.elementAt(0);
var item = { ...sourceItem };
item.friends = { ...sourceItem.friends };
item.tags = { ...sourceItem.tags };
item._id = "1234567890";

profile("append", .5, () => { tempData.append(item) });

profile("count without a predicate", .1, () => sourceData.count());
profile("count with a predicate", .5, () => sourceData.count(e => e.isActive));

profile("elementAt with valid index", .5, () => sourceData.elementAt(0));

profile("elementAtOrDefault with invalid index", .5, () => sourceData.elementAtOrDefault(-1));
profile("elementAtOrDefault with valid index", .5, () => sourceData.elementAtOrDefault(0));

profile("empty", .1, () => Sequence.empty<number>());

profile("select", .5, () => sourceData.select((d) => ({
  address: d.address,
  email: d.email,
  name: d.name,
  phone: d.phone,
})));

profile("toArray", .5, () => sourceData.toArray());

profile("where", .5, () => sourceData.where(e => e.isActive));