// Library CSS entry point. Consumers import this once at their app root:
//   import 'atlas-ui/styles.css'
// Kept as a .ts shim (not a raw .css rollup input) so Vite's lib build can
// extract it into a single, non-code-split stylesheet asset.
import './styles/globals.css';
