import { useState } from 'react'
import DashboardShell from '../../components/layout/DashboardShell'
import Modal from '../../components/common/Modal'
import { ownerNav } from './ownerNav'
import { useApp } from '../../context/AppContext'
import { getProperty } from '../../data/mockData'

const statusStyles = {
  available: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  occupied: 'border-rose-200 bg-rose-50 text-rose-800',
  reserved: 'border-amber-200 bg-amber-50 text-amber-800',
}

const dot = {
  available: 'bg-emerald-500',
  occupied: 'bg-rose-500',
  reserved: 'bg-amber-400',
}

export default function OwnerRooms() {
  const { roomInventory, updateBedStatus, currentOwnerId, properties } = useApp()
  const myIds = new Set(properties.filter((p) => p.ownerId === currentOwnerId).map((p) => p.id))
  const blocks = roomInventory.filter((b) => myIds.has(b.propertyId) || b.propertyId === 'p1')
  const [selected, setSelected] = useState(null)

  return (
    <DashboardShell title="Room Inventory" items={ownerNav}>
      <div className="mb-6 flex flex-wrap gap-4 text-xs font-medium">
        {['available', 'occupied', 'reserved'].map((s) => (
          <span key={s} className="inline-flex items-center gap-2 text-muted">
            <span className={`h-2 w-2 rounded-full ${dot[s]}`} />
            <span className="capitalize">{s === 'reserved' ? 'Temporarily reserved' : s}</span>
          </span>
        ))}
      </div>

      <div className="space-y-8">
        {blocks.map((block) => {
          const prop = getProperty(block.propertyId)
          return (
            <section key={block.propertyId} className="rounded-2xl border border-border bg-card p-5 md:p-6">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
                <div>
                  <h3 className="font-heading text-xl font-bold">{prop?.name}</h3>
                  <p className="text-sm text-muted">{prop?.locality} · Bed occupancy visualizer</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {block.rooms.map((room) => (
                  <div key={room.no} className="rounded-2xl border border-border bg-bg p-4">
                    <p className="mb-3 font-heading text-sm font-bold tracking-wide">Room {room.no}</p>
                    <div className="grid grid-cols-3 gap-2">
                      {room.beds.map((bed) => (
                        <button
                          key={bed.id}
                          type="button"
                          onClick={() => setSelected({ propertyId: block.propertyId, property: prop?.name, roomNo: room.no, bed })}
                          className={`rounded-xl border px-2 py-4 text-center transition hover:opacity-90 ${statusStyles[bed.status]}`}
                        >
                          <p className="text-xs font-bold">Bed {bed.id}</p>
                          <p className="mt-1 text-[10px] capitalize opacity-80">{bed.status}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        })}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Bed details">
        {selected && (
          <div className="space-y-3">
            {[
              ['Property', selected.property],
              ['Room', selected.roomNo],
              ['Bed', selected.bed.id],
              ['Status', selected.bed.status],
              ['Occupant', selected.bed.student || '—'],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between rounded-xl bg-bg px-3 py-2.5 text-sm">
                <span className="text-muted">{label}</span>
                <span className="font-semibold capitalize">{value}</span>
              </div>
            ))}
            <div className="flex flex-wrap gap-2 pt-2">
              {['available', 'occupied', 'reserved'].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    updateBedStatus(selected.propertyId, selected.roomNo, selected.bed.id, s)
                    setSelected(null)
                  }}
                  className={`rounded-xl border px-3 py-2 text-xs font-bold capitalize ${statusStyles[s]}`}
                >
                  Mark {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </DashboardShell>
  )
}
