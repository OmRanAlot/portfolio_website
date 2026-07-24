const CHESS_HEX_BLOCK = `e4 e5 Nf3 Nc6
Bb5 a6 Ba4 Nf6
O-O Be7 Re1 b5
9c2e 1a3f 0xFF
Qxd5 exd5 c4 c6
1101 0110 1001
Nd2 O-O Nf1 Nd7
d4 exd4 cxd4
`;

const MATH_BLOCK = `∑ ∫ ∂ ∇ λ
0x7f 0x2a
π θ φ ψ Ω
1.618 2.71
√2 e^iπ
0b1010
∀x ∃y ¬p
∮ dz f(z)
`;

const BLOCK_REPEATS = 18;

export const LEFT_STREAM = CHESS_HEX_BLOCK.repeat(BLOCK_REPEATS);
export const RIGHT_STREAM = MATH_BLOCK.repeat(BLOCK_REPEATS);

export const RAIL_GLYPHS = '01▓▒░∑∫λπθ$#*+=e4f3';
