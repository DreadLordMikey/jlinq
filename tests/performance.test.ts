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

describe('last', () => {
  profile(() => Sequence.range(0, 100000).last(), '100,000, no predicate');
  profile(
    () => Sequence.range(0, 100000).last((e) => e % 750 === 0),
    '100,000, with predicate',
  );
});

describe('lastOrDefault', () => {
  describe('without predicate', () => {
    profile(
      () => Sequence.empty<number>().lastOrDefault(0),
      'returns default value when sequence is empty',
    );
    profile(
      () => Sequence.range(1, 10).lastOrDefault(0),
      'returns last element when sequence is not empty',
    );
  });
  describe('with predicate', () => {
    profile(
      () => Sequence.empty<number>().lastOrDefault(0, (e) => e === 5),
      'returns default value when sequence is empty',
    );
    profile(
      () =>
        from(['foo', 'bar', 'baz']).lastOrDefault(
          'Not Found',
          (e) => e === 'TODO',
        ),
      'returns default value if no elements satisfy predicate condition',
    );
    profile(
      () => from(data).lastOrDefault(null, (e) => e.isActive),
      'returns last element that satisfies predicate condition',
    );
  });
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

describe('single', () => {
  const seq = from([150]);
  profile(() => seq.single(), 'with single element and no predicate');
  profile(
    () => seq.single((e) => e === 150),
    'with single element and predicate',
  );
  profile(
    () => from([1, 2, 3]).single((e) => e === 2),
    'with multiple elements and predicate',
  );
});

describe('singleOrDefault', () => {
  const empty = new Sequence<number>([]);
  const single = new Sequence<number>([1]);
  const multiple = Sequence.range(1, 100);

  profile(() => empty.singleOrDefault(0), 'empty, no predicate');
  profile(() => single.singleOrDefault(0), 'single, no predicate');
  profile(() => {
    try {
      multiple.singleOrDefault(0);
    } catch (e) {
      // Consume
    }
  }, 'multiple, no predicate');

  profile(() => empty.singleOrDefault(0, (e) => e === 5), 'empty, predicate');
  profile(() => single.singleOrDefault(0, (e) => e === 5), 'single, predicate');
  profile(() => {
    try {
      multiple.singleOrDefault(0, (e) => e % 2 == 0);
    } catch (e) {
      // Consume
    }
  }, 'multiple, predicate');
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
