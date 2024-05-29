import { ImageSource, Sound, Resource, Loader } from 'excalibur'

const Resources = {
    Fish: new ImageSource('images/fish.png'),
    Knight: new ImageSource('images/knight.png'),
    Gun: new ImageSource('images/777_magnum.png'),
    Bullet: new ImageSource('images/bullet.png'),
    Background: new ImageSource('images/background_3.jpg'),
    Crosshair: new ImageSource('images/crosshair.png'),
    Exp: new ImageSource('images/expOrb.png'),
    Heart: new ImageSource('images/heart.png'),
    BrokenHeart: new ImageSource('images/heart_broken.png'),
    LevelUpBackground: new ImageSource('images/level_up_background.png')
}
const ResourceLoader = new Loader([
    Resources.Fish,
    Resources.Knight,
    Resources.Gun,
    Resources.Bullet,
    Resources.Background,
    Resources.Crosshair,
    Resources.Exp,
    Resources.Heart,
    Resources.BrokenHeart,
    Resources.LevelUpBackground
])

export { Resources, ResourceLoader }