from rest_framework.permissions import IsAuthenticatedOrReadOnly


class IsOwnerOrReadOnly(IsAuthenticatedOrReadOnly): 
    def has_object_permission(self, request, view, obj):
        return view.request.user == obj.owner