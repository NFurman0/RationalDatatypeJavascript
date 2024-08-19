class Rational {
  constructor(n = 0, d = 1) {
    this.numerator = n;
    this.denominator = d;
  }
  toString(options = "ratio") {
    if(options === "ratio") return this.numerator + "/" + this.denominator;
    if(options === "float") return this.numerator / this.denominator;
  }
  setNumerator(n) {
    this.numerator = n;
  }
  setDenominator(d) {
    this.denominator = d;
  }
  setRatio(n, d) {
    this.numerator = n;
    this.denominator = d;
  }
  clone() {
    return new Rational(this.numerator, this.denominator);
  }
  inverse() {
    return new Rational(this.denominator, this.numerator);
  }
  invert() {
    this.numerator ^= this.denominator;
    this.denominator ^= this.numerator;
    this.numerator ^= this.denominator;
  }

  static gcd(a, b) {
    if(a == 0) return Math.abs(b);
    if(b == 0) return Math.abs(a);
    if(a < 0 || b < 0) return this.gcd(Math.abs(a), Math.abs(b));
    var d = 0;
    while(!(a&1) && !(b&1)) {
      a >>= 1;
      b >>= 1;
      d++;
    }
    while(!(a&1)) a >>= 1;
    while(!(b&1)) b >>= 1;
    while(a !== b) {
      if(a > b) a -= b;
      else b -= a;
      while(!(a&1)) a >>= 1;
      while(!(b&1)) b >>= 1;
    }
    return a << d;
  }
  
  simplify(rat = this) {
    if(rat.denominator < 0) {
      rat.numerator *= -1;
      rat.denominator *= -1;
    }
    var gcd = Rational.gcd(rat.numerator, rat.denominator);
    while(gcd > 1) {
      rat.numerator /= gcd;
      rat.denominator /= gcd;
      gcd = Rational.gcd(rat.numerator, rat.denominator);
    }
    return rat;
  }

  equals(rat) {
    if(typeof rat === "number") {
      if(this.denominator === 0) return (this.numerator/this.denominator) === rat;
      return this.numerator === (rat*this.denominator);
    }
    var rat1 = this.clone().simplify();
    var rat2 = rat.clone().simplify();
    return (rat1.numerator === rat2.numerator) && (rat1.denominator === rat2.denominator);
  }
  strictEquals(rat) {
    if(typeof rat === "number") rat = new Rational(rat, 1);
    return (this.numerator === rat.numerator) && (this.denominator === rat.denominator);
  };

  isReduced() {
    return this.equals(this.clone().simplify);
  }
  isNegative() {
    return (this.numerator < 0) !== (this.denominator < 0);
  }

  multiply(rat) {
    if(typeof rat === "number") {
      this.numerator *= rat;
    } else {
      this.numerator *= rat.numerator;
      this.denominator *= rat.denominator;
    }
    return this;
  }
  divide(rat) {
    if(typeof rat === "number") {
      this.denominator *= rat;
      return this;
    }
    return this.multiply(rat.inverse());
  }
  add(rat) {
    if(typeof rat === "number") {
      this.numerator += rat * this.denominator;
    } else {
      var num2 = rat.numerator;
      this.numerator *= rat.denominator;
      num2 *= this.denominator;
      this.denominator *= rat.denominator;
      this.numerator += num2;
    }
    return this;
  }
  subtract(rat) {
    if(typeof rat === "number") {
      this.numerator -= rat * this.denominator;
      return this;
    }
    var n = rat.clone();
    n.numerator *= -1;
    return this.add(n);
  }

  multiplyAndSimplify(rat) {
    return this.multiply(rat).simplify();
  }
  divideAndSimplify(rat) {
    return this.divide(rat).simplify();
  }
  addAndSimplify(rat) {
    return this.add(rat).simplify();
  }
  subtractAndSimplify(rat) {
    return this.subtract(rat).simplify();
  }
}
