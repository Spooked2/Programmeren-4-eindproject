import { ImageSource, Sound, Resource, Loader } from 'excalibur'

const Resources = {
    Fish: new ImageSource('images/fish.png'),
    Knight: new ImageSource('images/knight.png'),
    Gun: new ImageSource('images/777_magnum.png'),
    Bullet: new ImageSource('images/bullet.png'),
    Background: new ImageSource('images/background_3.jpg'),
    Crosshair: new ImageSource('images/crosshair.png'),
    Exp: new ImageSource('images/expOrb.png')
}
const ResourceLoader = new Loader([
    Resources.Fish,
    Resources.Knight,
    Resources.Gun,
    Resources.Bullet,
    Resources.Background,
    Resources.Crosshair,
    Resources.Exp
])

export { Resources, ResourceLoader }