import { Palette } from "./Palette";

export class PaletteUtil {

    private static palette: Palette;
    private static palettes: Palette [] = [
        { // Green palette
            top: '#0D5D56',
            mid: '#4E6151',
            bot: '#5E8C61',
        },
        { // Red-yellow palette
            top: '#F3C178',
            mid: '#A23E48',
            bot: '#F96F5D'
        },
        { // Blue-gray palette
            top: '#313E50',
            mid: '#3A435E',
            bot: '#3C6997',
        }
    ];

    static getPalette(): Palette {
        if(!this.palette) {
            this.palette = this.palettes[Math.floor(Math.random() * this.palettes.length)]
        }
        return this.palette;
    }

}