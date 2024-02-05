import { PalInfo } from "./pal-info";

export class PalData {

    public pals: PalInfo[] = [];
    public palsById: Map<string, PalInfo> = new Map();

    private unknownPal = new PalInfo("5000", "Unknown");

    public addPal(palId: string, palName: string) {
        const newPal: PalInfo = new PalInfo(palId, palName);
        this.pals.push(newPal);
        this.palsById.set(palId, newPal);
    }

    public getPalByIndex(index: number): PalInfo {
        if (index >=0 && index < this.pals.length) {
            return this.pals[index];
        }
        return this.unknownPal;
    }

    public getPalById(id: string): PalInfo {
        var result = this.palsById.get(id);
        if (result) {
            return result;
        }
        return this.unknownPal;
    }

    public loadOwnedSet() {
        let temp = localStorage.getItem('owned') || '';
        let tempValues = temp.split(',');
        for (let value of tempValues) {
            this.getPalById(value).owned = true;
        }
    }
    
    public saveOwnedSet() {
        let owned = new Array<string>();

        for (let pal of this.pals) {
            if (pal.owned === true) {
            owned.push(pal.palId);
            }
        }
        var result = owned.length > 0 ? owned.join(',') : '';
        localStorage.setItem('owned', result);
    }

}
