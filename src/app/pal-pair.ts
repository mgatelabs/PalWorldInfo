import { PalInfo } from "./pal-info";

export class PalPair {
    constructor(public a: PalInfo, public b: PalInfo) {

    }

    hashCode(): string {
        // You can choose any logic to generate a unique hash code for your object
        return `${this.a.palId}-${this.b.palId}`;
    }

    // Implement equals method
    equals(other: PalPair): boolean {
        // You should define the logic to compare the equality of two objects
        return this.a.palId === other.a.palId && this.b.palId === other.b.palId;
    }
}
