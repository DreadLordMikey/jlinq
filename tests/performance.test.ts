import { from, Sequence } from '../src/Sequence';
import data, { dataRecord } from '../src/data';
import { Action } from '../src/interfaces';

//#region profile
const profile = (action: Action, name?: string, maxTime = 1) => {
  const title = `executes in ${maxTime.toFixed(2)}ms or less ${name ?? ''}`;

  it(title, () => {
    const started = performance.now();
    action();
    const stopped = performance.now();
    const elapsed = stopped - started;

    expect(elapsed).toBeLessThanOrEqual(maxTime);
  });
};
//#endregion

const sourceData: Sequence<dataRecord> = from(data);

describe('all', () => {
  profile(() => {
    sourceData.all((e) => e.isActive);
  });
});

describe('any', () => {
  profile(() => {
    sourceData.any((e) => e.isActive);
  });
});

describe('append', () => {
  // We need a new copy of the data so we don't pollute the original, here.
  const tempData = from(sourceData.toArray());
  const sourceItem = sourceData.elementAt(0);
  const item = { ...sourceItem };
  item.friends = { ...sourceItem.friends };
  item.tags = { ...sourceItem.tags };
  item._id = '1234567890';

  profile(() => {
    tempData.append(item);
  });
});

describe('concat', () => {
  profile(() => Sequence.range(0, 10000).concat(Sequence.range(10000, 10000)));
});

describe('count', () => {
  profile(() => sourceData.count(), 'without a predicate');
  profile(() => sourceData.count((e) => e.isActive), 'with a predicate');
});

describe('first', () => {
  profile(() => sourceData.first(), 'with no predicate');
  profile(() => sourceData.first((d) => d.isActive), 'with predicate');
});

describe('firstOrDefault', () => {
  profile(() => sourceData.firstOrDefault(null), 'with no predicate');
  profile(
    () => sourceData.firstOrDefault(null, (d) => d.isActive),
    'with predicate',
  );
});

describe('elementAt', () =>
  profile(() => {
    sourceData.elementAt(0);
  }));

describe('elementAtOrDefault', () => {
  profile(() => sourceData.elementAtOrDefault(null, -1), 'with invalid index');
  profile(() => sourceData.elementAtOrDefault(null, 0), 'with valid index');
});

describe('empty', () => {
  profile(() => Sequence.empty<number>());
});

describe('select', () =>
  profile(() =>
    sourceData.select((d) => ({
      address: d.address,
      email: d.email,
      name: d.name,
      phone: d.phone,
    })),
  ));

describe('skip', () => {
  const seq = Sequence.range(0, 10000);
  profile(() => seq.skip(100), 'with index within array bounds');
  profile(() => seq.skip(0), 'with index === 0');
  profile(() => seq.skip(-1), 'with index === -1');
  profile(() => seq.skip(seq.count()), 'with index === array.length');
  profile(() => seq.skip(50000), 'with index > array.length');
});

describe('skipWhile', () => {
  const seq = Sequence.range(0, 1000);
  profile(() => {
    seq.skipWhile((n) => n < 50000);
  }, 'where all items pass predicate condition');
  profile(() => {
    seq.skipWhile((n) => n < 1000);
  }, 'where some items pass predicate condition');
});

describe('take', () => {
  profile(() => Sequence.range(0, 1000).take(-1), 'where count < 0');
  profile(
    () => Sequence.range(0, 1000).take(50000),
    'where count > sequence count',
  );
  profile(() => Sequence.range(0, 1000).take(50), 'where count is valid');
});

describe('takeWhile', () => {
  profile(() => Sequence.range(-50, 100).takeWhile((n) => n < 0));
});

describe('toArray', () => {
  profile(() => sourceData.toArray());
});

describe('where', () => {
  profile(() => sourceData.where((e) => e.isActive));
});
