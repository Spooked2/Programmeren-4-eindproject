import { ImageSource, Sound, Resource, Loader } from 'excalibur'

const Resources = {
    Fish: new ImageSource('images/fish.png'),
    Knight: new ImageSource('images/knight_left.png'),
    Gun: new ImageSource('images/777_magnum.png'),
    Bullet: new ImageSource('images/bullet.png'),
    Background: new ImageSource('images/background.jpg')
}
const ResourceLoader = new Loader([
    Resources.Fish,
    Resources.Knight,
    Resources.Gun,
    Resources.Bullet,
    Resources.Background
])

export { Resources, ResourceLoader }