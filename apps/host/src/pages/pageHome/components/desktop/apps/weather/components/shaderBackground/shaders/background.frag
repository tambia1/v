precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec3 u_base0;
uniform vec3 u_base1;
uniform vec3 u_accent;
uniform vec3 u_blob;

float hash(vec2 p) {
	p = fract(p * vec2(123.34, 456.21));
	p += dot(p, p + 45.32);
	return fract(p.x * p.y);
}

float noise(vec2 p) {
	vec2 i = floor(p);
	vec2 f = fract(p);
	vec2 u = f * f * (3.0 - 2.0 * f);
	float a = hash(i);
	float b = hash(i + vec2(1.0, 0.0));
	float c = hash(i + vec2(0.0, 1.0));
	float d = hash(i + vec2(1.0, 1.0));
	return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
	float value = 0.0;
	float amplitude = 0.5;
	for (int i = 0; i < 5; i++) {
		value += amplitude * noise(p);
		p = p * 2.02 + vec2(1.7, 3.1);
		amplitude *= 0.5;
	}
	return value;
}

void main() {
	vec2 uv = gl_FragCoord.xy / u_resolution;
	uv.x *= u_resolution.x / u_resolution.y;
	float t = u_time;

	// two passes of domain warping give the slow smoky motion
	vec2 q = vec2(fbm(uv + vec2(0.0, t)), fbm(uv + vec2(5.2, 1.3) - t * 0.7));
	vec2 r = vec2(fbm(uv + 2.0 * q + vec2(1.7, 9.2) + t * 0.5), fbm(uv + 2.0 * q + vec2(8.3, 2.8) - t * 0.3));
	float f = fbm(uv + 3.0 * r);

	vec3 color = mix(u_base0, u_base1, f);
	color = mix(color, u_accent, clamp(f * f * 2.0, 0.0, 1.0));

	float blob = smoothstep(0.35, 0.8, fbm(uv * 1.3 + q + t * 0.4));
	color = mix(color, u_blob, blob * 0.55);

	gl_FragColor = vec4(pow(color, vec3(0.9)), 1.0);
}
