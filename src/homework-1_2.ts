console.log('typescript oop\n'.toUpperCase());
// 1. Создайте абстрактный класс Car с двумя методами drive (ехать) и refuel (заправка)
// а также с двумя свойствами mileage (общий пробег машины) и fuel (количество бензина в машине).
// 2. Наследоваться от абстрактного класса Car и реализовать методы абстрактного класса drive (ехать)
// и refuel (заправка). Метод drive должен принимать количество километров и обновлять свойство
// mileage и уменьшать значение свойства fuel если бензин закончился то нужно вернуть сообщение
// о том что нужно заправиться. Метод refuel должен увеличивать свойство fuel. Обязательно делать
// проверку переданных данных. Свойства fuel и mileage должны быть protected.
// 3. Создать публичный get для получения свойств fuel и mileage.

/** Class representing a Car */
abstract class Car {
    protected _mileage: number;
    protected _fuel: number;
    protected static _fuelConsumptionPer100Km: number;
    protected static _fuelTankVolume: number;

    constructor(mileage: number, fuel: number) {
        this._mileage = mileage;
        this._fuel = fuel;
    }

    protected abstract _calcMileageReserve(): number;

    public abstract get mileage(): number;

    public abstract get fuel(): number;

    public abstract drive(distance: number): void | string;

    public abstract refuel(fuelToFillUp: number): void | string;
}

/**
 * Class representing Toyota
 * @extends Car
 */
class Toyota extends Car {
    protected static _fuelConsumptionPer100Km = 10;
    protected static _fuelTankVolume = 60;

    /**
     * Create an instance of Toyota
     * @param {number} _mileage The mileage of the Toyota instance
     * @param {number} _fuel The fuel level of the Toyota instance
     */
    constructor(_mileage: number = 0, _fuel: number = Toyota._fuelTankVolume) {
        super(_mileage, _fuel);
    }

    /** Get mileage */
    public get mileage(): number {
        return this._mileage;
    }

    /** Get fuel level */
    public get fuel(): number {
        return this._fuel;
    }

    /**
     * Calculate the mileage reserve according to the current fuel level
     * @protected
     */
    protected _calcMileageReserve(): number {
        return this._fuel / Toyota._fuelConsumptionPer100Km * 100;
    }

    /**
     * Represents the Toyota driving process
     * @param {number} distance The distance to be covered by the Toyota
     */
    public drive(distance: number): void | string {
        if (this._fuel === 0) {
            return console.log('Can\'t drive further. Need to refuel!');
        }

        if (this._calcMileageReserve() < distance) {
            const currentMileageReserve = this._calcMileageReserve(); // needed for return message
            this._mileage += currentMileageReserve;
            this._fuel = 0;
            return console.log(`Not enough fuel to drive ${distance} km. The ${Toyota.name} has driven ${currentMileageReserve.toFixed(2)} km and the fuel remainder of ${(Toyota._fuelConsumptionPer100Km * currentMileageReserve / 100).toFixed(2)} litres was used. Need to refuel now!`);
        }

        this._mileage += distance;
        this._fuel -= Toyota._fuelConsumptionPer100Km * distance / 100;
    }

    /**
     * Represents the Toyota refueling process
     * @param {number} fuelToFillUp The amount of fuel that the driver wants to fill up
     */
    public refuel(fuelToFillUp: number = Toyota._fuelTankVolume - this._fuel): void | string {
        if (this._fuel + fuelToFillUp > Toyota._fuelTankVolume) {
            return console.log(`${fuelToFillUp} litres of fuel is too much for ${Toyota.name} fuel tank which volume is ${Toyota._fuelTankVolume} litres. The current fuel level is ${this._fuel.toFixed(2)} litres, so the fuel tank can be filled up maximum for ${(Toyota._fuelTankVolume - this._fuel).toFixed(2)} litres`);
        }

        this._fuel += fuelToFillUp;
    }
}

// Create the Toyota instance without passing the fuel value for the default value to be accepted
const camry = new Toyota(1000);

console.log(camry);
camry.drive(400);
camry.drive(280);
camry.refuel(70);
camry.refuel(35);
console.log(camry);
camry.refuel(40);
console.log(camry);
camry.refuel();
console.log(camry);