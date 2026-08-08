import { jsxs as t, jsx as r } from "react/jsx-runtime";
import { useState as u, useEffect as A, useMemo as I } from "react";
import { router as f } from "@inertiajs/react";
const L = ({ table: g, className: d = "" }) => {
  const { columns: l, bulkActions: c, data: m, pagination: n, state: s } = g, [h, k] = u(s.search || ""), [o, i] = u([]), [y, v] = u("normal"), [x] = u(() => {
    const e = {};
    return l.forEach((a) => {
      e[a.name] = !0;
    }), e;
  }), [N] = u(s.filters || {});
  A(() => {
    const e = setTimeout(() => {
      h !== s.search && b({ search: h, page: 1 });
    }, 200);
    return () => clearTimeout(e);
  }, [h]);
  const b = (e) => {
    f.get(
      window.location.pathname,
      {
        search: s.search,
        sort: s.sort,
        direction: s.direction,
        filters: N,
        per_page: s.per_page,
        ...e
      },
      { preserveState: !0, preserveScroll: !0 }
    );
  }, w = (e) => {
    const p = s.sort === e && s.direction === "asc" ? "desc" : "asc";
    b({ sort: e, direction: p });
  }, S = (e) => {
    i(e ? m.map((a) => a._id) : []);
  }, C = (e, a) => {
    i(a ? (p) => [...p, e] : (p) => p.filter((P) => P !== e));
  }, _ = (e) => {
    o.length !== 0 && (e.confirm && !window.confirm(e.confirm) || f.post(
      "/datatable/bulk-action",
      { action: e.name, ids: o },
      {
        preserveState: !0,
        preserveScroll: !0,
        onSuccess: () => i([])
      }
    ));
  }, $ = I(
    () => l.filter((e) => x[e.name]).length + 1,
    [l, x]
  ), j = () => {
    switch (y) {
      case "compact":
        return "py-1.5 px-3 text-xs";
      case "comfortable":
        return "py-4 px-6 text-sm";
      default:
        return "py-3 px-4 text-sm";
    }
  };
  return /* @__PURE__ */ t("div", { className: `bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden space-y-4 p-4 ${d}`, children: [
    /* @__PURE__ */ t("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
      /* @__PURE__ */ t("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ r(
          "input",
          {
            type: "text",
            value: h,
            onChange: (e) => k(e.target.value),
            placeholder: "Search table records... (Press '/' to focus)",
            className: "w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          }
        ),
        /* @__PURE__ */ r("svg", { className: "w-4 h-4 text-gray-400 absolute left-3 top-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ r("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ r("div", { className: "inline-flex rounded-lg border border-gray-200 dark:border-gray-800 p-0.5 bg-gray-50 dark:bg-gray-800/40", children: ["compact", "normal", "comfortable"].map((e) => /* @__PURE__ */ r(
          "button",
          {
            onClick: () => v(e),
            className: `px-2.5 py-1 text-xs font-medium rounded-md capitalize transition-colors ${y === e ? "bg-white dark:bg-gray-700 shadow-xs text-gray-900 dark:text-gray-100" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`,
            children: e
          },
          e
        )) }),
        /* @__PURE__ */ r(
          "select",
          {
            value: s.per_page,
            onChange: (e) => b({ per_page: Number(e.target.value), page: 1 }),
            className: "px-3 py-1.5 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg font-medium",
            children: [10, 15, 25, 50, 100].map((e) => /* @__PURE__ */ t("option", { value: e, children: [
              e,
              " per page"
            ] }, e))
          }
        )
      ] })
    ] }),
    o.length > 0 && /* @__PURE__ */ t("div", { className: "flex items-center justify-between bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 px-4 py-2.5 rounded-lg animate-fade-in", children: [
      /* @__PURE__ */ t("span", { className: "text-xs font-semibold text-blue-900 dark:text-blue-200", children: [
        o.length,
        " item(s) selected"
      ] }),
      /* @__PURE__ */ t("div", { className: "flex items-center space-x-2", children: [
        c.map((e) => /* @__PURE__ */ r(
          "button",
          {
            onClick: () => _(e),
            className: `px-3 py-1 text-xs font-semibold rounded-md transition-colors ${e.danger ? "bg-red-600 hover:bg-red-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`,
            children: e.label
          },
          e.name
        )),
        /* @__PURE__ */ r(
          "button",
          {
            onClick: () => i([]),
            className: "text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 ml-2",
            children: "Clear"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800", children: /* @__PURE__ */ t("table", { className: "w-full text-left border-collapse", children: [
      /* @__PURE__ */ r("thead", { className: "bg-gray-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-800 text-xs font-semibold text-gray-500 uppercase tracking-wider", children: /* @__PURE__ */ t("tr", { children: [
        /* @__PURE__ */ r("th", { className: "p-3 w-10 text-center", children: /* @__PURE__ */ r(
          "input",
          {
            type: "checkbox",
            checked: m.length > 0 && o.length === m.length,
            onChange: (e) => S(e.target.checked),
            className: "rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500"
          }
        ) }),
        l.filter((e) => x[e.name]).map((e) => /* @__PURE__ */ r(
          "th",
          {
            onClick: () => e.sortable && w(e.name),
            className: `px-4 py-3 ${e.sortable ? "cursor-pointer select-none hover:text-gray-700 dark:hover:text-gray-300" : ""}`,
            children: /* @__PURE__ */ t("div", { className: "flex items-center space-x-1", children: [
              /* @__PURE__ */ r("span", { children: e.label }),
              e.sortable && s.sort === e.name && /* @__PURE__ */ r("span", { children: s.direction === "asc" ? "▲" : "▼" })
            ] })
          },
          e.name
        ))
      ] }) }),
      /* @__PURE__ */ r("tbody", { className: "divide-y divide-gray-200 dark:divide-gray-800 text-gray-800 dark:text-gray-200", children: m.length === 0 ? /* @__PURE__ */ r("tr", { children: /* @__PURE__ */ r("td", { colSpan: $, className: "py-8 text-center text-sm text-gray-500", children: "No matching records found." }) }) : m.map((e) => /* @__PURE__ */ t(
        "tr",
        {
          className: `hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors ${o.includes(e._id) ? "bg-blue-50/50 dark:bg-blue-950/20" : ""}`,
          children: [
            /* @__PURE__ */ r("td", { className: "p-3 text-center", children: /* @__PURE__ */ r(
              "input",
              {
                type: "checkbox",
                checked: o.includes(e._id),
                onChange: (a) => C(e._id, a.target.checked),
                className: "rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500"
              }
            ) }),
            l.filter((a) => x[a.name]).map((a) => /* @__PURE__ */ r("td", { className: j(), children: T(a, e[a.name]) }, a.name))
          ]
        },
        e._id
      )) })
    ] }) }),
    /* @__PURE__ */ t("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 pt-2", children: [
      /* @__PURE__ */ t("div", { children: [
        "Showing ",
        n.from ?? 0,
        " to ",
        n.to ?? 0,
        " of ",
        n.total,
        " entries"
      ] }),
      /* @__PURE__ */ t("div", { className: "flex items-center space-x-1", children: [
        /* @__PURE__ */ r(
          "button",
          {
            disabled: n.current_page === 1,
            onClick: () => b({ page: n.current_page - 1 }),
            className: "px-3 py-1.5 border rounded-md disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium",
            children: "Previous"
          }
        ),
        /* @__PURE__ */ t("span", { className: "px-3 font-semibold", children: [
          "Page ",
          n.current_page,
          " of ",
          n.last_page
        ] }),
        /* @__PURE__ */ r(
          "button",
          {
            disabled: n.current_page === n.last_page,
            onClick: () => b({ page: n.current_page + 1 }),
            className: "px-3 py-1.5 border rounded-md disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium",
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
};
function T(g, d) {
  var l;
  if (d == null) return /* @__PURE__ */ r("span", { className: "text-gray-400", children: "-" });
  if (g.type === "badge") {
    const c = ((l = g.colors) == null ? void 0 : l[d]) || "gray";
    return /* @__PURE__ */ r("span", { className: `inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider bg-${c}-100 text-${c}-800 dark:bg-${c}-950 dark:text-${c}-300`, children: d });
  }
  return g.type === "boolean" ? d ? /* @__PURE__ */ r("span", { className: "text-emerald-600 font-bold", children: "✓" }) : /* @__PURE__ */ r("span", { className: "text-red-500 font-bold", children: "✕" }) : String(d);
}
export {
  L as InertiaTable,
  L as default
};
