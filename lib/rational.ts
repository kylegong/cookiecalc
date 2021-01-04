export interface Rational {
  n: number;
  d: number;
}

export function add(a: Rational, b: Rational): Rational {
  return reduce({ n: a.n * b.d + b.n * a.d, d: a.d * b.d });
}

export function reduce(r: Rational): Rational {
  let [gcd, b] = [r.n, r.d];
  while (b != 0) {
    let t = b;
    b = gcd % b;
    gcd = t;
  }
  return { n: r.n / gcd, d: r.d / gcd };
}

export function toNumber(a: Rational): number {
  return a.n / a.d;
}

export function toString(a: Rational): string {
  const r = reduce(a);
  const rem = r.n % r.d;
  const whole = (r.n - rem) / r.d;
  if (r.d === 1) {
    return `${whole}`;
  }
  const frac = `${rem}/${r.d}`;
  if (whole > 0) {
    return `${whole} ${frac}`;
  }
  return frac;
}

export function parse(s: string): Rational {
  const re = /^((?<w>\d+) )?(?<r>\d+)\/?(?<d>\d+)?$/;
  const match = re.exec(s);
  if (match == null) {
    return { n: 0, d: 1 };
  }
  const w = Number(match.groups.w) || 0;
  const r = Number(match.groups.r);
  const d = Number(match.groups.d) || 1;
  return reduce({ n: r + w * d, d: d });
}
