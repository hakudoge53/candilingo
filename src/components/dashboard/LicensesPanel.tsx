
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusIcon, UserPlusIcon } from 'lucide-react';
import { useLicenses } from '@/hooks/organization/licenses/useLicenses';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { OrganizationLicense } from '@/hooks/organization/types';

interface LicensesPanelProps {
  organizationId: string;
}

const LicensesPanel: React.FC<LicensesPanelProps> = ({ organizationId }) => {
  const { licenses, isLoading, error, fetchLicenses, addLicenses } = useLicenses();
  const [isAddLicenseDialogOpen, setIsAddLicenseDialogOpen] = useState(false);
  const [licenseQuantity, setLicenseQuantity] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load licenses when component mounts
  useEffect(() => {
    if (organizationId) {
      fetchLicenses(organizationId);
    }
  }, [organizationId]);

  // Calculate totals across all license types
  const getTotalUsedLicenses = () => {
    return licenses.reduce((sum, license) => sum + license.used_licenses, 0);
  };

  const getTotalLicenses = () => {
    return licenses.reduce((sum, license) => sum + license.total_licenses, 0);
  };

  const getLicenseUtilizationPercentage = () => {
    const total = getTotalLicenses();
    return total > 0 ? (getTotalUsedLicenses() / total) * 100 : 0;
  };

  const handleAddLicenses = async () => {
    setIsSubmitting(true);
    const result = await addLicenses(organizationId, licenseQuantity);
    setIsSubmitting(false);
    
    if (result) {
      setLicenseQuantity(5);
      setIsAddLicenseDialogOpen(false);
    }
  };

  const formatLicenseType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Licenses</CardTitle>
          <CardDescription>Manage your organization's licenses</CardDescription>
        </div>
        <Button onClick={() => setIsAddLicenseDialogOpen(true)} size="sm">
          <PlusIcon className="mr-2 h-4 w-4" /> Add Licenses
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : licenses.length === 0 ? (
          <div className="text-center py-8">
            <UserPlusIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No licenses</h3>
            <p className="mt-1 text-sm text-gray-500">
              Add licenses to invite members to your organization.
            </p>
            <div className="mt-6">
              <Button onClick={() => setIsAddLicenseDialogOpen(true)}>
                <PlusIcon className="mr-2 h-4 w-4" /> Add Licenses
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">License Utilization</span>
                <span className="text-sm text-gray-500">
                  {getTotalUsedLicenses()} / {getTotalLicenses()} used
                </span>
              </div>
              <Progress value={getLicenseUtilizationPercentage()} className="h-2" />
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold">License Details</h3>
              
              {licenses.map((license) => (
                <div 
                  key={license.id} 
                  className="border rounded-lg p-4 shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{formatLicenseType(license.license_type)} Licenses</h4>
                      <p className="text-sm text-gray-500">
                        {license.used_licenses} of {license.total_licenses} used
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsAddLicenseDialogOpen(true)}
                    >
                      Add More
                    </Button>
                  </div>
                  
                  <div className="mt-2">
                    <Progress 
                      value={(license.used_licenses / license.total_licenses) * 100} 
                      className="h-2" 
                    />
                  </div>
                </div>
              ))}
              
              <p className="text-sm text-gray-500 mt-4">
                Need more licenses? Add them now to invite more members to your organization.
              </p>
            </div>
          </div>
        )}

        {/* Add License Dialog */}
        <Dialog open={isAddLicenseDialogOpen} onOpenChange={setIsAddLicenseDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add More Licenses</DialogTitle>
              <DialogDescription>
                Additional licenses allow you to invite more members to your organization.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="quantity">Number of Licenses</Label>
                <Input 
                  id="quantity" 
                  type="number" 
                  min="1"
                  value={licenseQuantity} 
                  onChange={(e) => setLicenseQuantity(parseInt(e.target.value) || 1)} 
                />
              </div>
              
              <div className="bg-muted p-3 rounded-md text-sm">
                <p>Adding {licenseQuantity} standard licenses to your organization.</p>
                <p className="mt-2 font-medium">Total: ${licenseQuantity * 10}/month</p>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => {
                  setLicenseQuantity(5);
                  setIsAddLicenseDialogOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleAddLicenses} 
                disabled={isSubmitting || licenseQuantity < 1}
              >
                {isSubmitting ? "Processing..." : "Add Licenses"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default LicensesPanel;
