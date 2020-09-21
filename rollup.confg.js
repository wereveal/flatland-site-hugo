import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import globby from 'globby';

const files = () => globby.sync('scripts/*.js').reduce((acc, val) => {
  const regexp = /scripts\/(.*)\.js/g;
  const [, key] = regexp.exec(val);
  acc.push({ name: key, val });
  return acc;
}, []);

module.exports = files().map((f) => ({
  input: f.val,
  output: {
    dir: 'static/',
    format: 'iife',
    name: f.name,
  },
  plugins: [
    resolve(),
    commonjs(),
    terser(),
  ],
}));
