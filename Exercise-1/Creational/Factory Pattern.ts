// Factory Pattern: Vehicle Factory

// Product Interface
interface Vehicle {
    drive(): void;
}

// Concrete Products
class Car implements Vehicle {
    drive(): void {
        console.log('Driving a car.');
    }
}

class Bike implements Vehicle {
    drive(): void {
        console.log('Riding a bike.');
    }
}

// Factory
class VehicleFactory {
    static createVehicle(type: string): Vehicle | null {
        switch (type) {
            case 'car':
                return new Car();
            case 'bike':
                return new Bike();
            default:
                console.log('Error: Unknown vehicle type.');
                return null;
        }
    }
}

// Client Code
const car = VehicleFactory.createVehicle('car');
car?.drive(); // Output: Driving a car.

const bike = VehicleFactory.createVehicle('bike');
bike?.drive(); // Output: Riding a bike.
