import {ImageSource, Sound, Resource, Loader, SpriteSheet, range, Animation} from 'excalibur'

export function animate(image, columns, rangeEnd, duration) {
    const sheet = SpriteSheet.fromImageSource({image: image, grid: {rows: 1, columns: columns, spriteHeight: 128, spriteWidth: 128}});
    return Animation.fromSpriteSheet(sheet, range(0, rangeEnd), duration);
}


const Resources = {
    Fish: new ImageSource('images/fish.png'),
    Knight: new ImageSource('images/knight.png'),
    KnightIdle: new ImageSource('images/knight_idle_sheet.png'),
    KnightWalk: new ImageSource('images/knight_walk_sheet.png'),
    AntWalk: new ImageSource('images/ant_sheet.png'),
    CaterpillarWalk: new ImageSource('images/caterpillar_sheet.png'),
    LouseWalk: new ImageSource('images/louse_sheet.png'),
    Gun: new ImageSource('images/777_magnum.png'),
    Bullet: new ImageSource('images/bullet.png'),
    Background: new ImageSource('images/background_3.jpg'),
    Exp: new ImageSource('images/expOrb.png'),
    Heart: new ImageSource('images/heart.png'),
    BrokenHeart: new ImageSource('images/heart_broken.png'),
    LevelUpBackground: new ImageSource('images/level_up_background.png'),
    Water: new ImageSource('images/holy_water.png'),
    Scroll: new ImageSource('images/prayer_scroll.png'),
    Book: new ImageSource('images/blessed_book.png'),
    Chest: new ImageSource('images/chest.png'),
    Cookie: new ImageSource('images/cookie.png'),
    Selector: new ImageSource('images/selector.png'),
}
const ResourceLoader = new Loader([
    Resources.Fish,
    Resources.KnightIdle,
    Resources.KnightWalk,
    Resources.AntWalk,
    Resources.CaterpillarWalk,
    Resources.LouseWalk,
    Resources.Gun,
    Resources.Bullet,
    Resources.Background,
    Resources.Exp,
    Resources.Heart,
    Resources.BrokenHeart,
    Resources.LevelUpBackground,
    Resources.Selector,
    Resources.Water,
    Resources.Scroll,
    Resources.Book,
    Resources.Chest,
    Resources.Cookie,
])

export { Resources, ResourceLoader }