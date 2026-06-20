import React, { useEffect, useRef, useState } from 'react';

const GITHUB_USERNAME = 'Piyush2005-code';
const API_URL = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`;

const MONTH_LABELS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAY_LABELS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

function groupByWeek(cells) {
  const weeks = [];
  let week = new Array(7).fill(null);
  cells.forEach(cell => {
    const dow = new Date(cell.date + 'T00:00:00').getDay();
    week[dow] = cell;
    if (dow === 6) { weeks.push(week); week = new Array(7).fill(null); }
  });
  if (week.some(Boolean)) weeks.push(week);
  return weeks;
}

export default function GithubChart() {
  const [cells, setCells]       = useState([]);
  const [weeks, setWeeks]       = useState([]);
  const [total, setTotal]       = useState(0);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(false);
  const [tooltip, setTooltip]   = useState(null);
  const [animated, setAnimated] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    fetch(API_URL)
      .then(r => r.json())
      .then(data => {
        const contributions = data.contributions || [];
        setCells(contributions);
        setWeeks(groupByWeek(contributions));
        setTotal(data.total?.lastYear ?? contributions.reduce((s, c) => s + c.count, 0));
        setLoading(false);
        setTimeout(() => setAnimated(true), 80);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  const streak = (() => {
    let max = 0, cur = 0;
    [...cells].reverse().forEach(c => {
      if (c.count > 0) { cur++; max = Math.max(max, cur); } else cur = 0;
    });
    return max;
  })();

  // Month label positions
  const monthPositions = [];
  if (weeks.length) {
    let lastMonth = -1;
    weeks.forEach((week, wi) => {
      const firstDay = week.find(Boolean);
      if (firstDay) {
        const mo = new Date(firstDay.date + 'T00:00:00').getMonth();
        if (mo !== lastMonth) { monthPositions.push({ month: mo, weekIdx: wi }); lastMonth = mo; }
      }
    });
  }

  const CELL = 13, GAP = 3, STEP = CELL + GAP;

  if (loading) return (
    <div className="gh-chart-loading">
      <span className="gh-chart-pulse"></span>
      <span>Fetching contribution data...</span>
    </div>
  );

  if (error) return (
    <div className="gh-chart-error">
      <span>⚠ Failed to load contribution data.</span>
    </div>
  );

  return (
    <div className="gh-chart-wrapper">
      {/* Stats bar */}
      <div className="gh-stats-bar">
        <div className="gh-stat">
          <span className="gh-stat-val">{total}</span>
          <span className="gh-stat-label">contributions this year</span>
        </div>
        <div className="gh-stat-sep" />
        <div className="gh-stat">
          <span className="gh-stat-val accent-green">{streak}</span>
          <span className="gh-stat-label">longest streak</span>
        </div>
        <div className="gh-stat-sep" />
        <div className="gh-stat">
          <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer" className="gh-profile-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/></svg>
            @{GITHUB_USERNAME}
          </a>
        </div>
      </div>

      {/* Chart scroll wrapper */}
      <div className="gh-scroll-outer" ref={containerRef}>
        <div className="gh-chart-inner">
          {/* Month labels */}
          <div className="gh-month-row" style={{ paddingLeft: 32 }}>
            {monthPositions.map(({ month, weekIdx }) => (
              <span key={`${month}-${weekIdx}`} className="gh-month-label" style={{ left: weekIdx * STEP }}>
                {MONTH_LABELS[month]}
              </span>
            ))}
          </div>

          {/* Day labels + grid */}
          <div className="gh-grid-row">
            <div className="gh-day-labels">
              {DAY_LABELS.map((d, i) => (
                <span key={d} className="gh-day-label" style={{ height: CELL, lineHeight: `${CELL}px`, marginBottom: GAP }}>
                  {i % 2 === 1 ? d : ''}
                </span>
              ))}
            </div>

            <div
              className="gh-grid"
              style={{
                gridTemplateColumns: `repeat(${weeks.length}, ${CELL}px)`,
                gridTemplateRows: `repeat(7, ${CELL}px)`,
                gap: GAP
              }}
            >
              {weeks.map((week, wi) =>
                week.map((cell, di) => {
                  const count = cell ? cell.count : 0;
                  const level = cell ? cell.level : 0;
                  const date  = cell ? cell.date  : null;
                  return (
                    <div
                      key={`${wi}-${di}`}
                      className={`gh-cell level-${level} ${animated ? 'gh-cell-in' : ''}`}
                      style={{ '--delay': `${(wi * 7 + di) * 1.2}ms` }}
                      onMouseEnter={e => {
                        if (!date) return;
                        const r  = e.currentTarget.getBoundingClientRect();
                        const pr = containerRef.current.getBoundingClientRect();
                        setTooltip({ x: r.left - pr.left + r.width / 2, y: r.top - pr.top - 8, date, count });
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    />
                  );
                })
              )}
            </div>
          </div>

          {/* Legend */}
          <div className="gh-legend">
            <span className="gh-legend-label">Less</span>
            {[0,1,2,3,4].map(l => <div key={l} className={`gh-legend-cell level-${l}`} />)}
            <span className="gh-legend-label">More</span>
          </div>

          {/* Tooltip */}
          {tooltip && (
            <div className="gh-tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
              <strong>{tooltip.count === 0 ? 'No' : tooltip.count} contribution{tooltip.count !== 1 ? 's' : ''}</strong>
              <span>{new Date(tooltip.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
