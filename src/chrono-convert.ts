import { MINUTE, DAY, HOUR, MONTH, WEEK, YEAR, QUARTER } from "./constants";
import type { Unit } from "./types";

/**
 * Class representing a Time Converter.
 * @example
 * const time = ChronoConvert.minutes(5);
 * console.log(time.toSeconds()); // Outputs the equivalent seconds
 */
class ChronoConvert {
  value: number;

  /**
   * @private
   * @param {number} value - The number of seconds.
   */
  private constructor(value: number) {
    this.value = value;
  }

  /**
   * Creates a ChronoConvert instance from milliseconds.
   * @param {number} value - The number of milliseconds.
   * @returns {ChronoConvert} - New instance of ChronoConvert.
   * @example
   * const time = ChronoConvert.milliseconds(5000);
   * console.log(time.toSeconds()); // Outputs 5
   */
  static milliseconds(value: number): ChronoConvert {
    return new ChronoConvert(value / 1000);
  }

  /**
   * Creates a ChronoConvert instance from milliseconds.
   * @param {number} value - The number of milliseconds.
   * @returns {ChronoConvert} - New instance of ChronoConvert.
   * @example
   * const time = ChronoConvert.ms(5000);
   * console.log(time.toSeconds()); // Outputs 5
   */
  static ms(value: number): ChronoConvert {
    return ChronoConvert.milliseconds(value);
  }

  /**
   * Creates a ChronoConvert instance from seconds.
   * @param {number} value - The number of seconds.
   * @returns {ChronoConvert} - New instance of ChronoConvert.
   * @example
   * const time = ChronoConvert.seconds(5);
   * console.log(time.toSeconds()); // Outputs 5
   */
  static seconds(value: number): ChronoConvert {
    return new ChronoConvert(value);
  }

  /**
   * Creates a ChronoConvert instance from minutes.
   * @param {number} value - The number of minutes.
   * @returns {ChronoConvert} - New instance of ChronoConvert.
   * @example
   * const time = ChronoConvert.minutes(5);
   * console.log(time.toSeconds()); // Outputs 300
   */
  static minutes(value: number): ChronoConvert {
    return new ChronoConvert(value * MINUTE);
  }

  /**
   * Creates a ChronoConvert instance from hours.
   * @param {number} value - The number of hours.
   * @returns {ChronoConvert} - New instance of ChronoConvert.
   * @example
   * const time = ChronoConvert.hours(5);
   * console.log(time.toSeconds()); // Outputs 18000
   */
  static hours(value: number): ChronoConvert {
    return new ChronoConvert(value * HOUR);
  }

  /**
   * Creates a ChronoConvert instance from days.
   * @param {number} value - The number of days.
   * @returns {ChronoConvert} - New instance of ChronoConvert.
   * @example
   * const time = ChronoConvert.days(5);
   * console.log(time.toSeconds()); // Outputs 432000
   */
  static days(value: number): ChronoConvert {
    return new ChronoConvert(value * DAY);
  }

  /**
   * Creates a ChronoConvert instance from weeks.
   * @param {number} value - The number of weeks.
   * @returns {ChronoConvert} - New instance of ChronoConvert.
   * @example
   * const time = ChronoConvert.weeks(5);
   * console.log(time.toSeconds()); // Outputs 3024000
   */
  static weeks(value: number): ChronoConvert {
    return new ChronoConvert(value * WEEK);
  }

  /**
   * Creates a ChronoConvert instance from months.
   * @param {number} value - The number of months.
   * @returns {ChronoConvert} - New instance of ChronoConvert.
   * @example
   * const time = ChronoConvert.months(5);
   * console.log(time.toSeconds()); // Outputs 13140000
   */
  static months(value: number): ChronoConvert {
    return new ChronoConvert(value * MONTH);
  }

  /**
   * Creates a ChronoConvert instance from quarters.
   * @param {number} value - The number of quarters.
   * @returns {ChronoConvert} - New instance of ChronoConvert.
   * @example
   * const time = ChronoConvert.quarters(5);
   * console.log(time.toSeconds()); // Outputs 78840000
   */
  static quarters(value: number): ChronoConvert {
    return new ChronoConvert(value * QUARTER);
  }

  /**
   * Creates a ChronoConvert instance from years.
   * @param {number} value - The number of years.
   * @returns {ChronoConvert} - New instance of ChronoConvert.
   * @example
   * const time = ChronoConvert.years(5);
   * console.log(time.toSeconds()); // Outputs 157680000
   */
  static years(value: number): ChronoConvert {
    return new ChronoConvert(value * YEAR);
  }

  /**
   * @example
   * const time = ChronoConvert.from(1500, 'seconds');
   * console.log(time.toSeconds()); // Outputs 1500
   */
  static from(value: number, unit: Unit) {
    return new ChronoConvert(ChronoConvert.getValueByUnit(value, unit));
  }

  private fixValue(value: number): number {
    return Math.round(value * 10000) / 10000;
  }

  private static getValueByUnit(value: number, unit: Unit): number {
    const valueByUnit: Record<Unit, number> = {
      milliseconds: value / 1000,
      ms: value / 1000,
      seconds: value,
      minutes: value * MINUTE,
      hours: value * HOUR,
      days: value * DAY,
      weeks: value * WEEK,
      months: value * MONTH,
      quarters: value * QUARTER,
      years: value * YEAR,
    };

    return valueByUnit[unit];
  }

  /**
   * @example
   * const time = ChronoConvert.minutes(5).add(5, 'seconds');
   * console.log(time.toSeconds()); // Outputs 305
   */
  add(value: number, unit: Unit): ChronoConvert {
    return new ChronoConvert(
      this.value + ChronoConvert.getValueByUnit(value, unit)
    );
  }

  /**
   * @example
   * const time = ChronoConvert.minutes(5).subtract(5, 'seconds');
   * console.log(time.toSeconds()); // Outputs 295
   */
  subtract(value: number, unit: Unit): ChronoConvert {
    return new ChronoConvert(
      this.value - ChronoConvert.getValueByUnit(value, unit)
    );
  }

  /**
   * @example
   * const time = ChronoConvert.minutes(5).to('seconds');
   * console.log(time); // Outputs 300
   */
  to(unit: Unit): number {
    const valueByUnit: Record<Unit, number> = {
      milliseconds: this.toMilliseconds(),
      ms: this.toMilliseconds(),
      seconds: this.toSeconds(),
      minutes: this.toMinutes(),
      hours: this.toHours(),
      days: this.toDays(),
      weeks: this.toWeeks(),
      months: this.toMonths(),
      quarters: this.toQuarters(),
      years: this.toYears(),
    };

    return valueByUnit[unit];
  }

  /**
   * Converts the time to milliseconds.
   * @returns {number} - The time in milliseconds.
   * @example
   * const time = ChronoConvert.seconds(2);
   * console.log(time.toMilliseconds()); // Outputs 2000
   */
  toMilliseconds(): number {
    return this.fixValue(this.value * 1000);
  }

  /**
   * Converts the time to milliseconds.
   * @returns {number} - The time in milliseconds.
   * @example
   * const time = ChronoConvert.seconds(2);
   * console.log(time.toMs()); // Outputs 2000
   */
  toMs(): number {
    return this.toMilliseconds();
  }

  /**
   * Converts the time to seconds.
   * @returns {number} - The time in seconds.
   * @example
   * const time = ChronoConvert.minutes(2);
   * console.log(time.toSeconds()); // Outputs 120
   */
  toSeconds(): number {
    return this.fixValue(this.value);
  }

  /**
   * Converts the time to minutes.
   * @returns {number} - The time in minutes.
   * @example
   * const time = ChronoConvert.seconds(120);
   * console.log(time.toMinutes()); // Outputs 2
   */
  toMinutes(): number {
    return this.fixValue(this.value / MINUTE);
  }

  /**
   * Converts the time to hours.
   * @returns {number} - The time in hours.
   * @example
   * const time = ChronoConvert.seconds(7200);
   * console.log(time.toHours()); // Outputs 2
   */
  toHours(): number {
    return this.fixValue(this.value / HOUR);
  }

  /**
   * Converts the time to days.
   * @returns {number} - The time in days.
   * @example
   * const time = ChronoConvert.seconds(172800);
   * console.log(time.toDays()); // Outputs 2
   */
  toDays(): number {
    return this.fixValue(this.value / DAY);
  }

  /**
   * Converts the time to weeks.
   * @returns {number} - The time in weeks.
   * @example
   * const time = ChronoConvert.seconds(1209600);
   * console.log(time.toWeeks()); // Outputs 2
   */
  toWeeks(): number {
    return this.fixValue(this.value / WEEK);
  }

  /**
   * Converts the time to months.
   * @returns {number} - The time in months.
   * @example
   * const time = ChronoConvert.seconds(5256000);
   * console.log(time.toMonths()); // Outputs 2
   */
  toMonths(): number {
    return this.fixValue(this.value / MONTH);
  }

  /**
   * Converts the time to quarters.
   * @returns {number} - The time in quarters.
   * @example
   * const time = ChronoConvert.seconds(15768000);
   * console.log(time.toQuarters()); // Outputs 2
   */
  toQuarters(): number {
    return this.fixValue(this.value / QUARTER);
  }

  /**
   * Converts the time to years.
   * @returns {number} - The time in years.
   * @example
   * const time = ChronoConvert.seconds(63072000);
   * console.log(time.toYears()); // Outputs 2
   */
  toYears(): number {
    return this.fixValue(this.value / YEAR);
  }

  toString(): string {
    return `${this.value}`;
  }
}

export default ChronoConvert;
