const githubUrl = 'https://github.com/sachncs/fleetpilot';

function Arrow(): React.ReactElement {
  return <span aria-hidden="true">↗</span>;
}

function ProductMap(): React.ReactElement {
  return (
    <div className="fp-map" aria-label="Illustrative FleetPilot route map">
      <div className="fp-map-grid" aria-hidden="true" />
      <svg viewBox="0 0 720 430" role="img" aria-label="A depot connected to three delivery stops">
        <path className="fp-road fp-road-a" d="M-40 330C82 288 134 250 221 275s157 88 251 45 139-142 298-99" />
        <path className="fp-road fp-road-b" d="M92-20c19 86 59 147 130 207s102 133 105 263" />
        <path className="fp-road fp-road-c" d="M442-20c-18 84-6 153 35 207s88 115 113 263" />
        <path className="fp-route-shadow" d="M154 314C211 236 296 237 348 178S470 91 559 148s8 151-73 182-199 38-332-16Z" />
        <path className="fp-route" d="M154 314C211 236 296 237 348 178S470 91 559 148s8 151-73 182-199 38-332-16Z" />
        <circle className="fp-node" cx="348" cy="178" r="13" />
        <circle className="fp-node" cx="559" cy="148" r="13" />
        <circle className="fp-node" cx="486" cy="330" r="13" />
        <rect className="fp-depot" x="137" y="297" width="34" height="34" rx="4" />
        <text x="154" y="320" textAnchor="middle">D</text>
        <text x="348" y="183" textAnchor="middle">1</text>
        <text x="559" y="153" textAnchor="middle">2</text>
        <text x="486" y="335" textAnchor="middle">3</text>
      </svg>
      <div className="fp-map-status"><span /> Live planning canvas</div>
      <div className="fp-route-card">
        <div><span className="fp-vehicle-mark">01</span><strong>North route</strong></div>
        <dl><div><dt>Stops</dt><dd>12</dd></div><div><dt>Distance</dt><dd>41.9 km</dd></div><div><dt>Load</dt><dd>68%</dd></div></dl>
      </div>
    </div>
  );
}

export function FleetPilotProduct(): React.ReactElement {
  return (
    <div className="fleet-product">
      <div className="fp-product-nav">
        <a className="fp-lockup" href="/fleetpilot" aria-label="FleetPilot product page"><span>F</span> FleetPilot</a>
        <div><a href="#workflow">Workflow</a><a href="#capabilities">Capabilities</a><a href="/fleetpilot/docs">Docs</a><a href={githubUrl}>Source <Arrow /></a></div>
      </div>

      <section className="fp-hero">
        <div className="fp-hero-copy">
          <p className="fp-kicker"><span /> Open-source route intelligence</p>
          <h1>See the whole fleet.<br />Plan the right routes.</h1>
          <p className="fp-lead">FleetPilot turns depots, vehicles, and delivery demand into one clear operating picture—then builds routes your team can inspect before dispatch.</p>
          <div className="fp-actions"><a className="fp-primary" href="/fleetpilot/docs#get-started">Run FleetPilot <Arrow /></a><a className="fp-secondary" href="/fleetpilot/docs">Read the docs</a></div>
          <p className="fp-proof">No login · Local-first data · Self-hosted</p>
        </div>
        <ProductMap />
      </section>

      <section className="fp-statement" aria-label="Product promise">
        <p className="fp-kicker">Built for the dispatch decision</p>
        <h2>From a scattered delivery list to a route plan everyone can understand.</h2>
        <div><p>Planning should not begin in a spreadsheet and end in a black box. FleetPilot keeps the fleet, demand, route geometry, capacity, time, cost, and emissions visible in one workspace.</p><p>Every result stays inspectable: compare the plan, review each stop, play the route forward, and export it for the systems your drivers already use.</p></div>
      </section>

      <section className="fp-workflow" id="workflow">
        <div className="fp-section-head"><p className="fp-kicker">One operational flow</p><h2>Organize. Optimize. Dispatch.</h2></div>
        <ol>
          <li><span>01</span><div><h3>Model today’s fleet</h3><p>Add depots, active vehicles, capacities, costs, and regions. Your operating constraints stay close to the map.</p></div></li>
          <li><span>02</span><div><h3>Shape delivery demand</h3><p>Bring in stops, quantities, service windows, and processing time. Select exactly what needs to move today.</p></div></li>
          <li><span>03</span><div><h3>Build the route plan</h3><p>Use ALNS and BRKGA optimization to search for a feasible plan across vehicles, depots, and delivery constraints.</p></div></li>
          <li><span>04</span><div><h3>Review before dispatch</h3><p>Inspect the route on the map, replay vehicle movement, compare KPIs, and export GeoJSON, KML, or CSV.</p></div></li>
        </ol>
      </section>

      <section className="fp-capabilities" id="capabilities">
        <div className="fp-section-head"><p className="fp-kicker">Operational clarity</p><h2>The controls a planner actually needs.</h2></div>
        <div className="fp-cap-grid">
          <article className="fp-feature fp-feature-wide"><span>MAP</span><h3>Fleet and route visualization</h3><p>See depots, delivery stops, route order, distance, and vehicle load on a restrained vector map designed for decision-making.</p><div className="fp-mini-route"><i /><i /><i /><i /></div></article>
          <article className="fp-feature"><span>PLAN</span><h3>Constraint-aware optimization</h3><p>Balance time windows, capacity, cost, multi-depot structure, and route feasibility with configurable search depth.</p></article>
          <article className="fp-feature"><span>PLAY</span><h3>Route playback</h3><p>Move through the plan over time to understand vehicle position, stop sequence, completion time, and route shape.</p></article>
          <article className="fp-feature"><span>OWN</span><h3>Local-first by design</h3><p>Run the product on your infrastructure. No account wall, no mandatory cloud, and no hidden operational data dependency.</p></article>
        </div>
      </section>

      <section className="fp-architecture">
        <div><p className="fp-kicker">Built in the open</p><h2>Serious route intelligence, without the enterprise ceremony.</h2></div>
        <div className="fp-architecture-copy"><p>FleetPilot is a TypeScript application with a production web console, SQLite persistence, background optimization workers, WebSocket progress, and a container-ready runtime.</p><div className="fp-tech"><span>ALNS</span><span>BRKGA</span><span>MapLibre</span><span>Next.js</span><span>SQLite</span><span>Docker</span></div><a href="/fleetpilot/docs#architecture">Read the standalone architecture guide <Arrow /></a></div>
      </section>

      <section className="fp-final">
        <p className="fp-kicker">Plan with the full picture</p><h2>Turn today’s delivery demand into a route you can trust.</h2>
        <div className="fp-actions"><a className="fp-primary" href="/fleetpilot/docs#get-started">Get started <Arrow /></a><a className="fp-secondary" href="/fleetpilot/docs">Open documentation</a></div>
      </section>
    </div>
  );
}
