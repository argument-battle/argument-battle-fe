const USER_TYPES = {
    DEFENDER: 'defender',
    ATTACKER: 'attacker',
    SPECTATOR: 'spectator'
};
const DIRECTION = {
    RIGHT: 'right',
    LEFT: 'left'
};
const oppositeDirectionMap = {
    [DIRECTION.RIGHT]: DIRECTION.LEFT,
    [DIRECTION.LEFT]: DIRECTION.RIGHT
};
export { USER_TYPES, DIRECTION, oppositeDirectionMap };
