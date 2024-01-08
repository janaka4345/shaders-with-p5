float NAME(vec2 position, float radius){
    return step(radius, length(position - vec2(0.5)));
}