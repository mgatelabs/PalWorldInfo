import { PalPair } from "./pal-pair";

export class PalInfo {
    
    public index: number;
    public offset: number;
    public owned: boolean = false;

    // My 
    public parents: Set<PalPair> = new Set<PalPair>(); 
    public children: Map<string, string> = new Map(); 

    constructor(public palId: string, public palName: string) {
        const r = this.parseValue(palId);
        this.index = r.index;
        this.offset = r.offset;
    }

    private parseValue(value: string): { index: number, offset: number } {
        const match = value.match(/^(\d+)(B?)$/);
        if (match) {
            const index = parseInt(match[1], 10);
            const offset = match[2] === 'B' ? 1 : 0;
    
            return { index, offset };
        }
        const v:number = -1;
        return { index: v, offset: v };
    }

    public addChildPair(otherParent: PalInfo, child: PalInfo) {
        this.children.set(otherParent.palId, child.palId);
    }

    public addParentPair(a: PalInfo, b: PalInfo) {
        
        let swap = false;
        if (a.index == b.index) {
            if (a.offset == b.offset) {

            } else if (a.offset > b.offset) {
                swap = true;
            }
        }
        else if (a.index < b.offset) {

        } else if (a.index > b.offset) {
            swap = true;
        }
        if (swap) {
            let c = a;
            a = b;
            b = c;
        }
        this.parents.add(new PalPair(a, b));
    }
}
