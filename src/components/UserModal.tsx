'use client';

import { User } from '@/types';

interface UserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export function UserModal({ user, isOpen, onClose }: UserModalProps) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">User Details</h2>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center mb-6">
            <img
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-20 h-20 rounded-full mr-4"
            />
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-muted-foreground">@{user.username}</p>
              <p className="text-sm text-muted-foreground">{user.role}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-3">Personal Information</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Age:</span>
                  <span className="text-sm text-foreground">{user.age}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Gender:</span>
                  <span className="text-sm text-foreground capitalize">{user.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Birth Date:</span>
                  <span className="text-sm text-foreground">{new Date(user.birthDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Email:</span>
                  <span className="text-sm text-foreground">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Phone:</span>
                  <span className="text-sm text-foreground">{user.phone}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-3">Address</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Street:</span>
                  <span className="text-sm text-foreground">{user.address.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">City:</span>
                  <span className="text-sm text-foreground">{user.address.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">State:</span>
                  <span className="text-sm text-foreground">{user.address.state}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Postal Code:</span>
                  <span className="text-sm text-foreground">{user.address.postalCode}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-3">Company</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Name:</span>
                  <span className="text-sm text-foreground">{user.company.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Department:</span>
                  <span className="text-sm text-foreground">{user.company.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Title:</span>
                  <span className="text-sm text-foreground">{user.company.title}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-3">Company Address</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Street:</span>
                  <span className="text-sm text-foreground">{user.company.address.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">City:</span>
                  <span className="text-sm text-foreground">{user.company.address.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">State:</span>
                  <span className="text-sm text-foreground">{user.company.address.state}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Postal Code:</span>
                  <span className="text-sm text-foreground">{user.company.address.postalCode}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
