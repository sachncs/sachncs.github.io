import { FleetPilotFooter } from './FleetPilot';

const repoUrl = 'https://github.com/sachncs/fleetpilot';

const sections = [
  ['overview', 'Overview'],
  ['get-started', 'Get started'],
  ['docker', 'Run with Docker'],
  ['workflow', 'Product workflow'],
  ['architecture', 'Architecture'],
  ['configuration', 'Configuration'],
  ['api', 'REST API'],
  ['development', 'Development'],
  ['production', 'Production checklist'],
] as const;

function Code({ children }: { children: string }): React.ReactElement {
  return <pre className="fp-code" tabIndex={0}><code>{children}</code></pre>;
}

export function FleetPilotDocs(): React.ReactElement {
  return (
    <div className="fleet-docs">
      <header className="fp-docs-header">
        <a className="fp-lockup" href="/fleetpilot"><span>F</span> FleetPilot</a>
        <nav aria-label="FleetPilot documentation"><a href="/fleetpilot">Product</a><a aria-current="page" href="/fleetpilot/docs">Docs</a><a href={repoUrl}>GitHub ↗</a></nav>
      </header>
      <div className="fp-docs-layout">
        <aside>
          <p>Documentation</p>
          <nav aria-label="On this page">{sections.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
          <div><span>Current release</span><strong>v2.0</strong><small>Node.js 26+</small></div>
        </aside>

        <article className="fp-docs-content">
          <section id="overview" className="fp-docs-intro">
            <p className="fp-kicker">Developer documentation</p>
            <h1>Build, run, and extend FleetPilot.</h1>
            <p>FleetPilot combines a visual dispatch workspace with a TypeScript optimization engine. Run the complete product locally or in a container, integrate through the REST API, or use the solver package directly from Node.js.</p>
            <div className="fp-doc-badges"><span>Open console</span><span>Local SQLite</span><span>WebSocket progress</span><span>ISC licensed</span></div>
          </section>

          <section id="get-started">
            <p className="fp-doc-index">01 / Get started</p><h2>Start the complete product locally</h2>
            <p>Clone the source, install the workspace dependencies, and launch the custom development server. The first run opens a short terminal setup for the port, solver limits, and local data directory.</p>
            <Code>{`git clone https://github.com/sachncs/fleetpilot.git\ncd fleetpilot\nnpm ci\nnpm run dev:frontend\n\n# Open http://localhost:3000`}</Code>
            <div className="fp-doc-callout"><strong>No login required.</strong><p>The browser console opens directly. API keys are only for external clients calling protected REST endpoints.</p></div>
            <h3>What the first run creates</h3>
            <ul><li><code>data/fleetpilot.json</code> — local server and solver settings.</li><li><code>data/fleetpilot.db</code> — SQLite registry, scenarios, jobs, solutions, and audit history.</li><li>A default API key printed once in the terminal for external integrations.</li></ul>
          </section>

          <section id="docker">
            <p className="fp-doc-index">02 / Docker</p><h2>Run the production container</h2>
            <p>The image includes the web console, APIs, background solver worker, MapLibre assets, and native SQLite runtime. Persist <code>/app/data</code> outside the container.</p>
            <Code>{`docker build -t fleetpilot .\n\ndocker run --rm \\\n  --name fleetpilot \\\n  -p 3000:3000 \\\n  -v fleetpilot-data:/app/data \\\n  fleetpilot\n\n# Open http://localhost:3000`}</Code>
            <p>For repository development, <code>docker compose up --build</code> mounts the local <code>./data</code> directory for persistence.</p>
          </section>

          <section id="workflow">
            <p className="fp-doc-index">03 / Product workflow</p><h2>From registry to dispatch</h2>
            <ol className="fp-doc-steps"><li><span>1</span><div><strong>Register resources</strong><p>Add dispatch depots and active vehicles with capacity, region, cost, and emissions data.</p></div></li><li><span>2</span><div><strong>Add demand</strong><p>Create or import delivery stops with quantity, service time, priority, time window, and coordinates.</p></div></li><li><span>3</span><div><strong>Create a plan</strong><p>Select orders, a depot, and available vehicles. FleetPilot snapshots them into an immutable optimization scenario.</p></div></li><li><span>4</span><div><strong>Optimize and review</strong><p>Choose a search preset, follow live progress, inspect route geometry and KPIs, then replay the route.</p></div></li><li><span>5</span><div><strong>Export</strong><p>Download GeoJSON, KML, or CSV for downstream GIS, navigation, and spreadsheet workflows.</p></div></li></ol>
          </section>

          <section id="architecture">
            <p className="fp-doc-index">04 / Architecture</p><h2>One product, clear runtime boundaries</h2>
            <div className="fp-doc-architecture"><div><span>01</span><strong>Next.js console</strong><p>Product UI, REST routes, and server-rendered product surfaces.</p></div><div><span>02</span><strong>SQLite registry</strong><p>Fleet, orders, scenarios, jobs, solutions, keys, and audit events.</p></div><div><span>03</span><strong>Solver worker</strong><p>Runs ALNS and BRKGA outside the request path with cancellation support.</p></div><div><span>04</span><strong>Progress stream</strong><p>WebSocket events plus persisted job-state recovery for fast completions.</p></div></div>
            <p>The core solver is independently packaged as <code>fleetpilot</code>. The product server converts registry data into the solver problem schema, queues work, persists results, and exposes those results to review and export surfaces.</p>
          </section>

          <section id="configuration">
            <p className="fp-doc-index">05 / Configuration</p><h2>Runtime configuration</h2>
            <div className="fp-doc-table" role="table" aria-label="FleetPilot environment variables"><div role="row"><strong role="columnheader">Variable</strong><strong role="columnheader">Purpose</strong><strong role="columnheader">Container default</strong></div><div role="row"><code>PORT</code><span>HTTP and WebSocket port</span><span>3000</span></div><div role="row"><code>DATABASE_URL</code><span>SQLite database URL</span><span>file:/app/data/fleetpilot.db</span></div><div role="row"><code>FLEETPILOT_DATA_DIR</code><span>Config and persistent data directory</span><span>/app/data</span></div><div role="row"><code>MAX_CONCURRENT_SOLVES</code><span>Concurrent background solve limit</span><span>Saved config</span></div><div role="row"><code>FLEETPILOT_WORKER_PATH</code><span>Bundled worker entrypoint override</span><span>/app/worker.mjs</span></div></div>
            <p>Solver time and generation limits are created by the first-run setup and stored in <code>fleetpilot.json</code>. The console reads those limits before submitting work.</p>
          </section>

          <section id="api">
            <p className="fp-doc-index">06 / REST API</p><h2>Integrate external systems</h2>
            <p>External requests use a bearer API key. The product console uses its local public-console marker; integrations should create and retain a dedicated key from Settings.</p>
            <Code>{`curl http://localhost:3000/api/system \\\n  -H "Authorization: Bearer $FLEETPILOT_API_KEY"`}</Code>
            <div className="fp-endpoints"><div><code>GET /api/depots</code><span>List dispatch locations</span></div><div><code>GET /api/fleet</code><span>List vehicles and availability</span></div><div><code>GET /api/orders</code><span>Read delivery demand</span></div><div><code>POST /api/scenarios/from-registry</code><span>Create an optimization scenario</span></div><div><code>POST /api/jobs</code><span>Queue a solver run</span></div><div><code>GET /api/jobs/:id</code><span>Read persisted job status</span></div><div><code>GET /api/solutions/:id</code><span>Read an optimized plan</span></div><div><code>GET /api/solutions/:id/export</code><span>Export geojson, kml, or csv</span></div></div>
          </section>

          <section id="development">
            <p className="fp-doc-index">07 / Development</p><h2>Contribute with confidence</h2>
            <Code>{`# Full solver and package verification\nnpm run verify\n\n# Web console checks\nnpm run lint -w @fleetpilot/web\nnpm run typecheck -w @fleetpilot/web\nnpm run build -w @fleetpilot/web\n\n# Production image smoke test\nnpm run docker:smoke`}</Code>
            <p>The repository uses TypeScript, Rollup, Mocha, c8 coverage gates, ESLint, Prettier, Next.js, and a multi-stage Docker build. Keep changes focused and preserve deterministic seeds in solver tests.</p>
          </section>

          <section id="production">
            <p className="fp-doc-index">08 / Production</p><h2>Production checklist</h2>
            <ul className="fp-checklist"><li>Persist and back up <code>/app/data</code>.</li><li>Terminate TLS at the platform or reverse proxy and preserve WebSocket upgrades.</li><li>Keep the product behind the network boundary appropriate for your fleet data.</li><li>Create separate API keys for each external integration and rotate them independently.</li><li>Set solver concurrency and time limits for the available CPU and memory.</li><li>Monitor container health, disk growth, failed jobs, and optimization duration.</li><li>Run the shipped CI verification and container smoke test before promotion.</li></ul>
            <div className="fp-doc-next"><div><p className="fp-kicker">Ready to build?</p><h2>Start with a local route.</h2></div><a href="#get-started">Return to quickstart ↑</a><a href={repoUrl}>Browse the source ↗</a></div>
          </section>
        </article>
      </div>
      <FleetPilotFooter />
    </div>
  );
}
