import React from 'react';
import { useCMS } from '../../../cms/cmsContext';
import { TextInput, TextAreaField, ToggleField, SectionCard } from '../../../components/admin/FormField';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

export function HeaderFooterEditor() {
  const { content, updateSection } = useCMS();
  const { header, footer, bottomInvite } = content;

  const updateHeader = (data: Partial<typeof header>) => {
    updateSection('header', data);
  };

  const updateFooter = (data: Partial<typeof footer>) => {
    updateSection('footer', data);
  };

  const updateBottomInvite = (data: Partial<typeof bottomInvite>) => {
    updateSection('bottomInvite', data);
  };

  const handleNavItemChange = (index: number, key: string, value: any) => {
    const newItems = [...header.navItems];
    newItems[index] = { ...newItems[index], [key]: value };
    updateHeader({ navItems: newItems });
  };

  const handleAddNavItem = () => {
    const newItems = [
      ...header.navItems,
      {
        id: `custom-${Date.now()}`,
        label: 'New Link',
        href: '/#',
        enabled: true,
      },
    ];
    updateHeader({ navItems: newItems });
  };

  const handleDeleteNavItem = (index: number) => {
    const newItems = header.navItems.filter((_, i) => i !== index);
    updateHeader({ navItems: newItems });
  };

  const moveNavItem = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= header.navItems.length) return;
    const newItems = [...header.navItems];
    const [moved] = newItems.splice(index, 1);
    newItems.splice(targetIndex, 0, moved);
    updateHeader({ navItems: newItems });
  };

  return (
    <div className="space-y-6">
      {/* Header Branding */}
      <SectionCard title="Header Branding & Identity" subtitle="Configure the main logo, site name, and header banner">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="Brand Name"
            value={header.brandName}
            onChange={(e) => updateHeader({ brandName: e.target.value })}
            placeholder="Queen Prayer Walking"
          />
          <TextInput
            label="Brand Tagline / Subtitle"
            value={header.brandTagline}
            onChange={(e) => updateHeader({ brandTagline: e.target.value })}
            placeholder="Community · Faith in motion"
          />
        </div>

        <ToggleField
          label="Show Flower Icon in Brand Logo"
          description="Display the floral community emblem beside the brand name"
          checked={header.showBrandIcon}
          onChange={(checked) => updateHeader({ showBrandIcon: checked })}
        />
      </SectionCard>

      {/* Header CTA Button */}
      <SectionCard title="Header Call-to-Action Button" subtitle="The highlighted button in the top right corner of the navigation bar">
        <ToggleField
          label="Enable Header CTA Button"
          description="Display the prominent button in the top navigation"
          checked={header.ctaButton.enabled}
          onChange={(checked) =>
            updateHeader({ ctaButton: { ...header.ctaButton, enabled: checked } })
          }
        />
        {header.ctaButton.enabled && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <TextInput
              label="Button Text"
              value={header.ctaButton.label}
              onChange={(e) =>
                updateHeader({ ctaButton: { ...header.ctaButton, label: e.target.value } })
              }
              placeholder="Come as you are"
            />
            <TextInput
              label="Destination Link"
              value={header.ctaButton.href}
              onChange={(e) =>
                updateHeader({ ctaButton: { ...header.ctaButton, href: e.target.value } })
              }
              placeholder="/join"
            />
          </div>
        )}
      </SectionCard>

      {/* Navigation Links */}
      <SectionCard
        title="Navigation Menu Items"
        subtitle="Manage, reorder, or enable/disable links in the top header and mobile menus"
      >
        <div className="space-y-2.5">
          {header.navItems.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center gap-2 p-2.5 bg-purple-50/50 border border-purple-100 rounded-xl"
            >
              <div className="flex flex-col gap-0.5">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => moveNavItem(index, 'up')}
                  className="p-1 text-purple-400 hover:text-purple-700 disabled:opacity-30 cursor-pointer"
                  title="Move Up"
                >
                  <ArrowUp size={12} />
                </button>
                <button
                  type="button"
                  disabled={index === header.navItems.length - 1}
                  onClick={() => moveNavItem(index, 'down')}
                  className="p-1 text-purple-400 hover:text-purple-700 disabled:opacity-30 cursor-pointer"
                  title="Move Down"
                >
                  <ArrowDown size={12} />
                </button>
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => handleNavItemChange(index, 'label', e.target.value)}
                  placeholder="Label"
                  className="px-2.5 py-1 text-xs bg-white border border-purple-200 rounded-lg text-purple-950 font-medium"
                />
                <input
                  type="text"
                  value={item.href}
                  onChange={(e) => handleNavItemChange(index, 'href', e.target.value)}
                  placeholder="URL / Path"
                  className="px-2.5 py-1 text-xs bg-white border border-purple-200 rounded-lg text-purple-950 font-mono"
                />
              </div>

              <button
                type="button"
                onClick={() => handleNavItemChange(index, 'enabled', !item.enabled)}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition cursor-pointer ${
                  item.enabled
                    ? 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {item.enabled ? 'Visible' : 'Hidden'}
              </button>

              <button
                type="button"
                onClick={() => handleDeleteNavItem(index)}
                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition cursor-pointer"
                title="Delete Link"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddNavItem}
            className="w-full py-2 border-2 border-dashed border-purple-200 hover:border-purple-400 text-purple-700 hover:text-purple-900 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <Plus size={14} /> Add Navigation Link
          </button>
        </div>
      </SectionCard>

      {/* Bottom Invite Banner (Shown across all pages) */}
      <SectionCard
        title="Bottom Invitation Banner"
        subtitle="The inspiring invitation banner displayed above the footer on all pages"
      >
        <ToggleField
          label="Enable Bottom Invitation Banner"
          description="Display the callout block on all public pages"
          checked={bottomInvite.enabled}
          onChange={(checked) => updateBottomInvite({ enabled: checked })}
        />

        {bottomInvite.enabled && (
          <div className="space-y-3 pt-2">
            <TextInput
              label="Eyebrow Tag"
              value={bottomInvite.eyebrow}
              onChange={(e) => updateBottomInvite({ eyebrow: e.target.value })}
              placeholder="The path is better together"
            />
            <TextInput
              label="Main Heading"
              value={bottomInvite.headingMain}
              onChange={(e) => updateBottomInvite({ headingMain: e.target.value })}
              placeholder="There is a little more light when we walk side by side."
            />
            <TextInput
              label="Word to Italicize/Emphasize"
              value={bottomInvite.headingEmphasized}
              onChange={(e) => updateBottomInvite({ headingEmphasized: e.target.value })}
              placeholder="light"
              description="This word or phrase inside the heading will be rendered in elegant italics"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                label="CTA Button Text"
                value={bottomInvite.ctaText}
                onChange={(e) => updateBottomInvite({ ctaText: e.target.value })}
                placeholder="Take a first step"
              />
              <TextInput
                label="CTA Button Link"
                value={bottomInvite.ctaHref}
                onChange={(e) => updateBottomInvite({ ctaHref: e.target.value })}
                placeholder="/join"
              />
            </div>
          </div>
        )}
      </SectionCard>

      {/* Footer Settings */}
      <SectionCard title="Footer & Social Links" subtitle="Customize the site closing, copyright, and social links">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="Footer Brand Name"
            value={footer.brandName}
            onChange={(e) => updateFooter({ brandName: e.target.value })}
            placeholder="Queen Prayer Walking"
          />
          <TextInput
            label="Footer Tagline"
            value={footer.brandTagline}
            onChange={(e) => updateFooter({ brandTagline: e.target.value })}
            placeholder="Community · Faith in motion"
          />
        </div>

        <TextInput
          label="Copyright & Bottom Note"
          value={footer.copyrightText}
          onChange={(e) => updateFooter({ copyrightText: e.target.value })}
          placeholder="FAITH IN MOTION · WALK GENTLY"
        />

        <div className="space-y-3 pt-2 border-t border-purple-50">
          <ToggleField
            label="Show Facebook Link"
            description="Display the community Facebook page link in the footer"
            checked={footer.showFacebook}
            onChange={(checked) => updateFooter({ showFacebook: checked })}
          />

          {footer.showFacebook && (
            <TextInput
              label="Facebook Community URL"
              value={footer.facebookUrl}
              onChange={(e) => updateFooter({ facebookUrl: e.target.value })}
              placeholder="https://www.facebook.com/share/..."
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              label="Instagram URL (Optional)"
              value={footer.instagramUrl || ''}
              onChange={(e) => updateFooter({ instagramUrl: e.target.value })}
              placeholder="https://instagram.com/..."
            />
            <TextInput
              label="Contact Email (Optional)"
              value={footer.emailContact || ''}
              onChange={(e) => updateFooter({ emailContact: e.target.value })}
              placeholder="hello@queenprayerwalk.org"
            />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

