<?php
/**
* Pardna groups
*
*/
namespace App\Controllers;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
class GroupsController
{
    protected $groupsService;
    public function __construct($service)
    {
        $this->groupsService = $service;
    }
    public function getAll()
    {
        return new JsonResponse($this->groupsService->getAll());
    }

    public function save(Request $request)
    {
        $note = $this->getDataFromRequest($request);
        return new JsonResponse(array("id" => $this->groupsService->save($note)));
    }

    public function update($id, Request $request)
    {
        $note = $this->getDataFromRequest($request);
        $this->groupsService->update($id, $group);
        return new JsonResponse($note);
    }
    public function delete($id)
    {
        return new JsonResponse($this->notesService->delete($id));
    }
    public function getDataFromRequest(Request $request)
    {
        return $note = array(
            "note" => $request->request->get("note")
        );
    }
}
