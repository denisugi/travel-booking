import { Badge, badgeVariants } from '../ui/Badge';
import { BookingStatus, PaymentStatus } from '@/types';

interface BookingStatusBadgeProps {
  status: BookingStatus | PaymentStatus;
  type?: 'booking' | 'payment';
}

const statusConfig: Record<string, { label: string; variant: string }> = {
  // Booking statuses
  pending: { label: 'Pending', variant: 'warning' },
  confirmed: { label: 'Confirmed', variant: 'success' },
  cancelled: { label: 'Cancelled', variant: 'destructive' },
  completed: { label: 'Completed', variant: 'default' },
  // Payment statuses
  paid: { label: 'Paid', variant: 'success' },
  refunded: { label: 'Refunded', variant: 'secondary' },
  failed: { label: 'Failed', variant: 'destructive' },
};

export const BookingStatusBadge = ({ status, type = 'booking' }: BookingStatusBadgeProps) => {
  const config = statusConfig[status] || { label: status, variant: 'secondary' };

  return (
    <Badge variant={config.variant as any}>
      {config.label}
    </Badge>
  );
};
