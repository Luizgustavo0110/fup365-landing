/*
 * ============================================================
 * HERO DASHBOARD — DADOS
 * ============================================================
 *
 * Centraliza os dados exibidos no mockup para manter conteúdo,
 * apresentação e regras responsivas desacoplados.
 */

export const heroDashboardData = {
  title: 'Visão geral dos pedidos',
  period: 'Período: 01/07/2026 a 10/07/2026',

  metrics: [
    {
      label: 'Pedidos monitorados',
      value: '1.248',
      tone: 'neutral',
    },
    {
      label: 'Aguardando fornecedor',
      value: '86',
      tone: 'neutral',
    },
    {
      label: 'Com risco de atraso',
      value: '34',
      tone: 'danger',
    },
    {
      label: 'Pedidos atualizados',
      value: '92%',
      tone: 'success',
    },
  ],

  statuses: [
    {
      label: 'Confirmados',
      value: 68,
      tone: 'success',
    },
    {
      label: 'Pendentes',
      value: 24,
      tone: 'warning',
    },
    {
      label: 'Atrasados',
      value: 6,
      tone: 'danger',
    },
    {
      label: 'Cancelados',
      value: 2,
      tone: 'neutral',
    },
  ],

  occurrences: [
    {
      label: 'Pedido #450123 — Atraso previsto',
      tone: 'danger',
    },
    {
      label: 'Pedido #450456 — Prorrogação solicitada',
      tone: 'warning',
    },
    {
      label: 'Pedido #450789 — NF emitida',
      tone: 'success',
    },
  ],

  footerMetrics: [
    {
      label: 'Lead time médio',
      value: '12,4 dias',
    },
    {
      label: 'Fornecedores ativos',
      value: '356',
    },
    {
      label: 'Atualizações/mês',
      value: '8.245',
    },
    {
      label: 'Pedidos simultâneos',
      value: '1.512',
    },
  ],
} as const;
